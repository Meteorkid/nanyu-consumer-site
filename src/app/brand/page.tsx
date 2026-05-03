import type { Metadata } from "next";
import { BrandPageBody } from "./brand-page-body";

export const metadata: Metadata = {
  title: "关于品牌",
  description:
    "玉汝于成以「做年轻人买得起的好玉」为核心理念，用现代设计与跨境电商方式传递中国玉文化。",
};

export default function BrandPage() {
  return <BrandPageBody />;
}
