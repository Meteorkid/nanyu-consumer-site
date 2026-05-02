# 消费者入口图片清单（首批）

## 1. 已内置占位图（可直接替换）

### 商品图（`public/images/products`）
- `bangle-main.svg`
- `bangle-detail.svg`
- `bangle-wear.svg`
- `pendant-main.svg`
- `pendant-detail.svg`
- `pendant-pack.svg`
- `ring-main.svg`
- `ring-detail.svg`
- `ring-wear.svg`

### 内容封面（`public/images/content`）
- `style-cover.svg`
- `story-cover.svg`
- `guide-cover.svg`

## 2. 真实素材替换要求

- 商品主图：建议 `1:1`，不少于 `1200x1200`
- 详情图：建议 `4:5`，不少于 `1080x1350`
- 内容封面：建议 `16:9`，不少于 `1280x720`
- 单图大小：`200KB-500KB`（WebP 优先，保留 JPEG 备份）

## 3. 每个 SKU 最低图片标准

- 主图 1 张（白底）
- 细节图 2 张（纹理/工艺）
- 佩戴图 2 张（真人上身）
- 尺寸对照图 1 张（尺规参照）
- 包装图 1 张（礼盒与配件）

## 4. 替换方式

- 路径保持不变，直接同名替换文件即可
- 如需新增 SKU，在 `src/lib/site-data.ts` 添加商品并补齐 `gallery` 图片数组
