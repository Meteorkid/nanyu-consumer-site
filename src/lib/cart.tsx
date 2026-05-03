"use client";

import { createContext, useContext, useReducer, useEffect, ReactNode } from "react";
import { Product } from "@/lib/site-data";

// 购物车项类型
export interface CartItem {
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

// 购物车状态
export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

// 购物车动作类型
type CartAction =
  | { type: "ADD_ITEM"; payload: { product: Product; quantity?: number } }
  | { type: "REMOVE_ITEM"; payload: { slug: string } }
  | { type: "UPDATE_QUANTITY"; payload: { slug: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: { items: CartItem[] } };

// 计算购物车总数和总金额
function calculateCartTotals(items: CartItem[]): { total: number; itemCount: number } {
  return items.reduce(
    (acc, item) => ({
      total: acc.total + item.price * item.quantity,
      itemCount: acc.itemCount + item.quantity,
    }),
    { total: 0, itemCount: 0 }
  );
}

// 购物车 reducer
function cartReducer(state: CartState, action: CartAction): CartState {
  let newItems: CartItem[];

  switch (action.type) {
    case "ADD_ITEM": {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.items.find((item) => item.slug === product.slug);

      if (existingItem) {
        newItems = state.items.map((item) =>
          item.slug === product.slug
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [
          ...state.items,
          {
            slug: product.slug,
            name: product.name,
            price: product.priceCny,
            image: product.image,
            quantity,
          },
        ];
      }
      break;
    }

    case "REMOVE_ITEM": {
      newItems = state.items.filter((item) => item.slug !== action.payload.slug);
      break;
    }

    case "UPDATE_QUANTITY": {
      const { slug, quantity } = action.payload;
      if (quantity <= 0) {
        newItems = state.items.filter((item) => item.slug !== slug);
      } else {
        newItems = state.items.map((item) =>
          item.slug === slug ? { ...item, quantity } : item
        );
      }
      break;
    }

    case "CLEAR_CART": {
      newItems = [];
      break;
    }

    case "LOAD_CART": {
      newItems = action.payload.items;
      break;
    }

    default:
      return state;
  }

  const { total, itemCount } = calculateCartTotals(newItems);
  return { items: newItems, total, itemCount };
}

// 创建 Context
const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

// localStorage key
const CART_STORAGE_KEY = "nanyu-cart";

// 购物车 Provider 组件
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0,
  });

  // 从 localStorage 加载购物车
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const items = JSON.parse(savedCart) as CartItem[];
        dispatch({ type: "LOAD_CART", payload: { items } });
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error);
    }
  }, []);

  // 保存购物车到 localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  }, [state.items]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

// 使用购物车的 Hook
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

// 购物车操作函数
export function useCartActions() {
  const { dispatch } = useCart();

  const addItem = (product: Product, quantity = 1) => {
    dispatch({ type: "ADD_ITEM", payload: { product, quantity } });
  };

  const removeItem = (slug: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { slug } });
  };

  const updateQuantity = (slug: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { slug, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return { addItem, removeItem, updateQuantity, clearCart };
}
