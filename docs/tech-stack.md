# 消费者入口技术方案（MVP）

## 当前落地

- 前端框架：Next.js 16（App Router）
- 语言：TypeScript
- 样式：Tailwind CSS v4
- 路由：按页面分路由（首页、购买、内容、3D、售后、品牌、商品详情）
- 数据：当前使用 `src/lib/site-data.ts` 作为静态数据源
- 埋点：`src/lib/tracking.ts` + `dataLayer` + 可选 GA4 脚本

## 目录结构约定

- 页面：`src/app/**/page.tsx`
- 组件：`src/components/*`
- 业务数据：`src/lib/site-data.ts`
- 图片素材：`public/images/**`
- 运营文档：`docs/*.md`

## 推荐下一步（接入真实业务）

- 商品与库存：对接 Shopify 或独立 CMS（Strapi/Directus）
- 下单支付：接入 Stripe / PayPal / 本地支付网关
- 国际化：接入 `next-intl`，逐页文案翻译
- 币种：CNY/USD 显示，结算按支付网关实时汇率
- 3D：`model-viewer` 首发，后续再加摄像头权限 AR

## 性能与监控

- 图片优化：WebP + `next/image`
- 核心指标：LCP、商品页到加购率、加购到支付率、内容到商品点击率
- 事件建议：
  - `click_home_cta`
  - `view_product_detail`
  - `open_3d_from_pdp`
  - `start_checkout`
  - `request_assistant`
