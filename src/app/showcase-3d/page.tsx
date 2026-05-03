import type { Metadata } from "next";
import { ShowcasePageBody } from "./showcase-page-body";

export const metadata: Metadata = {
  title: "3D 展示",
  description: "基于单张实物照片重建浮雕 GLB，通过 @google/model-viewer 在浏览器中旋转查看。",
};

export default function Showcase3DPage() {
  return <ShowcasePageBody />;
}
