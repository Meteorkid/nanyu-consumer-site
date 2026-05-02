#!/bin/bash

# 南玉网站图片优化脚本
# 功能：压缩 JPG/PNG 图片，生成 WebP 格式，优化加载性能

set -e

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 配置
IMAGE_DIR="public/images"
QUALITY_JPG=85
QUALITY_WEBP=80
MAX_WIDTH=1920
MAX_HEIGHT=1080

echo -e "${GREEN}🖼️  南玉网站图片优化脚本${NC}"
echo "=================================="

# 检查依赖工具
check_tool() {
    if ! command -v "$1" &> /dev/null; then
        echo -e "${RED}❌ $1 未安装，请先安装：brew install $1${NC}"
        exit 1
    fi
}

echo -e "${YELLOW}📋 检查依赖工具...${NC}"
check_tool "jpegoptim"
check_tool "optipng"
check_tool "cwebp"
check_tool "sips"  # macOS 自带

# 统计信息
total_files=0
optimized_files=0
saved_bytes=0

# 优化 JPG 文件
optimize_jpg() {
    local file="$1"
    local original_size=$(stat -f%z "$file")

    # 压缩 JPG
    jpegoptim --max="$QUALITY_JPG" --strip-all --quiet "$file"

    # 生成 WebP
    local webp_file="${file%.jpg}.webp"
    cwebp -q "$QUALITY_WEBP" "$file" -o "$webp_file" 2>/dev/null || true

    local new_size=$(stat -f%z "$file")
    local webp_size=$(stat -f%z "$webp_file" 2>/dev/null || echo 0)
    local saved=$((original_size - new_size))
    saved_bytes=$((saved_bytes + saved))
    optimized_files=$((optimized_files + 1))

    echo -e "  ✅ $file: $(format_bytes $original_size) → $(format_bytes $new_size) (节省 $(format_bytes $saved))"
    if [ "$webp_size" -gt 0 ]; then
        echo -e "     📱 WebP: $(format_bytes $webp_size)"
    fi
}

# 优化 PNG 文件
optimize_png() {
    local file="$1"
    local original_size=$(stat -f%z "$file")

    # 压缩 PNG
    optipng -quiet -o2 "$file"

    # 生成 WebP
    local webp_file="${file%.png}.webp"
    cwebp -q "$QUALITY_WEBP" "$file" -o "$webp_file" 2>/dev/null || true

    local new_size=$(stat -f%z "$file")
    local webp_size=$(stat -f%z "$webp_file" 2>/dev/null || echo 0)
    local saved=$((original_size - new_size))
    saved_bytes=$((saved_bytes + saved))
    optimized_files=$((optimized_files + 1))

    echo -e "  ✅ $file: $(format_bytes $original_size) → $(format_bytes $new_size) (节省 $(format_bytes $saved))"
    if [ "$webp_size" -gt 0 ]; then
        echo -e "     📱 WebP: $(format_bytes $webp_size)"
    fi
}

# 格式化字节数
format_bytes() {
    local bytes=$1
    if [ "$bytes" -ge 1048576 ]; then
        echo "$(echo "scale=2; $bytes / 1048576" | bc)MB"
    elif [ "$bytes" -ge 1024 ]; then
        echo "$(echo "scale=2; $bytes / 1024" | bc)KB"
    else
        echo "${bytes}B"
    fi
}

# 处理所有图片
echo -e "${YELLOW}🔍 扫描图片文件...${NC}"

# 处理 JPG 文件
find "$IMAGE_DIR" -type f \( -name "*.jpg" -o -name "*.jpeg" \) | while read file; do
    total_files=$((total_files + 1))
    optimize_jpg "$file"
done

# 处理 PNG 文件
find "$IMAGE_DIR" -type f -name "*.png" | while read file; do
    total_files=$((total_files + 1))
    optimize_png "$file"
done

echo ""
echo -e "${GREEN}✅ 图片优化完成！${NC}"
echo -e "📊 统计信息："
echo -e "   - 处理文件数：$optimized_files"
echo -e "   - 节省空间：$(format_bytes $saved_bytes)"
echo ""
echo -e "${YELLOW}💡 建议：${NC}"
echo -e "   1. 在代码中使用 <picture> 标签支持 WebP 格式"
echo -e "   2. 配置 CDN 缓存策略"
echo -e "   3. 考虑使用 Next.js Image 组件进行懒加载"
