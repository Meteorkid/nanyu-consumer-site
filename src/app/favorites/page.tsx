import type { Metadata } from "next";
import { FavoritesClient } from "./favorites-client";

export const metadata: Metadata = {
  title: "我的收藏",
  description: "在玉汝于成收藏喜欢的玉饰商品（本地存储，仅在当前浏览器可见）。",
};

export default function FavoritesPage() {
  return <FavoritesClient />;
}
