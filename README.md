# 玉汝于成消费者入口（MVP）

面向消费者的品牌官网，围绕“去购买 + 看内容”两大入口搭建，当前版本支持图片化商品展示、内容种草、3D展示占位、售后保障与基础埋点。

## 技术栈

- Next.js 16 + TypeScript
- Tailwind CSS v4
- App Router
- `dataLayer` 事件上报（可接 GA4）

## 快速开始

```bash
npm install
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)。

## 页面路由

- `/` 首页
- `/shop` 去购买
- `/content` 看内容
- `/showcase-3d` 3D展示（免摄像头权限）
- `/support` 售后保障
- `/brand` 关于品牌
- `/product/[slug]` 商品详情页

## 关键目录

- `src/app` 页面与路由
- `src/components` 通用组件
- `src/lib/site-data.ts` 商品/内容/FAQ静态数据
- `public/images` 图片素材目录
- `docs` 图片、文案、技术、上线清单

## 埋点说明

当前使用 `src/lib/tracking.ts` 发送事件到 `window.dataLayer`。  
如需启用 GA4，请在环境变量中配置：

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## 运营交付文档

- `docs/assets-manifest.md`
- `docs/content-pack.md`
- `docs/tech-stack.md`
- `docs/launch-checklist.md`
