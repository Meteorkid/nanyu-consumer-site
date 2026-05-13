[![License: AGPL v3](https://img.shields.io/badge/license-AGPL%20v3-red)](./LICENSE)

# 玉汝于成消费者入口（MVP）

面向消费者的品牌官网，围绕"去购买 + 看内容"两大入口搭建，当前版本支持图片化商品展示、内容种草、3D 展示占位、售后保障与基础埋点。

## 功能

- **首页**：品牌故事入口、核心卖点展示、精选商品推荐
- **去购买**：商品列表与筛选，支持图片化展示
- **看内容**：内容种草文章，提升品牌认知
- **3D 展示**：免摄像头权限的 3D 商品展示（占位实现）
- **售后保障**：FAQ 与售后服务信息
- **关于品牌**：品牌故事与理念
- **商品详情**：`/product/[slug]` 动态路由
- **埋点上报**：`dataLayer` 事件上报，可对接 GA4

## 技术栈

| 层 | 技术 |
|---|---|
| 框架 | Next.js 16 + TypeScript |
| 样式 | Tailwind CSS v4 |
| 路由 | App Router |
| 埋点 | `window.dataLayer` 事件上报 |
| 包管理 | npm |

## 快速开始

```bash
# 克隆仓库
git clone https://github.com/Meteorkid/nanyu-consumer-site.git
cd nanyu-consumer-site

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

### 构建生产版本

```bash
npm run build
npm start
```

## 页面路由

| 路由 | 页面 |
|------|------|
| `/` | 首页 |
| `/shop` | 去购买 |
| `/content` | 看内容 |
| `/showcase-3d` | 3D 展示（免摄像头权限） |
| `/support` | 售后保障 |
| `/brand` | 关于品牌 |
| `/product/[slug]` | 商品详情页 |

## 项目结构

```
nanyu-consumer-site/
├── src/
│   ├── app/              # 页面与路由（App Router）
│   ├── components/       # 通用组件
│   └── lib/
│       ├── site-data.ts  # 商品/内容/FAQ 静态数据
│       └── tracking.ts   # 埋点工具函数
├── public/
│   └── images/           # 图片素材目录
├── docs/                 # 运营交付文档
├── package.json
└── tsconfig.json
```

## 埋点说明

当前使用 `src/lib/tracking.ts` 发送事件到 `window.dataLayer`。

如需启用 GA4，在环境变量中配置：

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## 运营交付文档

| 文档 | 说明 |
|------|------|
| `docs/assets-manifest.md` | 图片素材清单 |
| `docs/content-pack.md` | 内容文案包 |
| `docs/tech-stack.md` | 技术栈说明 |
| `docs/launch-checklist.md` | 上线检查清单 |

## License

[AGPL v3](LICENSE)
