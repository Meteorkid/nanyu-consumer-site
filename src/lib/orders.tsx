"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CartItem } from "@/lib/cart";

export type OrderStatus = "pending" | "paid" | "shipped" | "delivered" | "cancelled";

export interface OrderAddress {
  name: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  userId?: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  paymentMethod: string;
  address: OrderAddress;
  createdAt: string;
  updatedAt: string;
}

const ORDERS_STORAGE_KEY = "nanyu-orders";

function generateOrderId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `NY${timestamp}${random}`;
}

function getStoredOrders(): Order[] {
  try {
    const data = localStorage.getItem(ORDERS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveOrders(orders: Order[]) {
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
}

interface OrdersContextType {
  orders: Order[];
  createOrder: (data: CreateOrderData) => Order;
  getOrder: (id: string) => Order | undefined;
  cancelOrder: (id: string) => void;
}

export interface CreateOrderData {
  items: CartItem[];
  total: number;
  paymentMethod: string;
  address: OrderAddress;
  userId?: string;
}

const OrdersContext = createContext<OrdersContextType | null>(null);

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setOrders(getStoredOrders());
    setMounted(true);
  }, []);

  const createOrder = (data: CreateOrderData): Order => {
    const now = new Date().toISOString();
    const order: Order = {
      id: generateOrderId(),
      userId: data.userId,
      items: data.items,
      total: data.total,
      status: "pending",
      paymentMethod: data.paymentMethod,
      address: data.address,
      createdAt: now,
      updatedAt: now,
    };

    const updated = [order, ...orders];
    setOrders(updated);
    saveOrders(updated);
    return order;
  };

  const getOrder = (id: string): Order | undefined => {
    return orders.find((o) => o.id === id);
  };

  const cancelOrder = (id: string) => {
    const updated = orders.map((o) =>
      o.id === id ? { ...o, status: "cancelled" as OrderStatus, updatedAt: new Date().toISOString() } : o
    );
    setOrders(updated);
    saveOrders(updated);
  };

  return (
    <OrdersContext.Provider value={{ orders, createOrder, getOrder, cancelOrder }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrdersProvider");
  }
  return context;
}

export const statusLabels: Record<OrderStatus, string> = {
  pending: "待付款",
  paid: "已付款",
  shipped: "已发货",
  delivered: "已送达",
  cancelled: "已取消",
};

export const statusColors: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  paid: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-zinc-100 text-zinc-600",
};
