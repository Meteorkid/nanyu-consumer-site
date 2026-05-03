import type { Metadata } from "next";
import { SupportPageBody } from "./support-page-body";

export const metadata: Metadata = {
  title: "售后保障",
  description: "查看退换、物流、溯源、保养等常见问题；或直接通过咨询表单联系客服。",
};

export default function SupportPage() {
  return <SupportPageBody />;
}
