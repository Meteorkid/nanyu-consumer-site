import type { Metadata } from "next";
import { ContentPageBody } from "./content-page-body";

export const metadata: Metadata = {
  title: "内容中心",
  description: "搭配教程、用户故事、选购知识三条内容线；每篇都绑定相关商品，种草到下单一步到位。",
};

export default function ContentPage() {
  return <ContentPageBody />;
}
