/**
 * 从仓库根目录「种草视频」同步前 3 个 mp4 到 public，并用 ffmpeg 截取约 1s 处帧作为封面。
 * 运行：在 consumer-site 目录执行 `node scripts/sync-grass-videos.mjs`
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ffmpegPath from "ffmpeg-static";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const consumerSiteRoot = path.join(__dirname, "..");
const repoRoot = path.join(consumerSiteRoot, "..");
const grassDir = path.join(repoRoot, "种草视频");
const outVideoDir = path.join(consumerSiteRoot, "public", "videos", "grass");
const outCoverDir = path.join(consumerSiteRoot, "public", "images", "content", "grass");

const ARTICLE_SLUGS = ["style-guide-1", "story-guide-1", "buying-guide-1"];

function main() {
  if (!ffmpegPath) {
    console.error("未找到 ffmpeg-static 提供的二进制文件。");
    process.exit(1);
  }
  if (!fs.existsSync(grassDir)) {
    console.error(`找不到种草视频目录：${grassDir}`);
    process.exit(1);
  }

  const allMp4 = fs
    .readdirSync(grassDir)
    .filter((f) => f.toLowerCase().endsWith(".mp4"))
    .sort();
  if (allMp4.length < ARTICLE_SLUGS.length) {
    console.error(`种草视频内 mp4 不足 ${ARTICLE_SLUGS.length} 个（当前 ${allMp4.length} 个）。`);
    process.exit(1);
  }

  /** 优先使用「slug.mp4」，否则按字母序依次取用剩余文件 */
  const used = new Set();
  const pickSrc = (slug) => {
    const exact = `${slug}.mp4`;
    if (allMp4.includes(exact)) {
      used.add(exact);
      return exact;
    }
    const next = allMp4.find((f) => !used.has(f));
    if (!next) throw new Error("mp4 列表耗尽");
    used.add(next);
    return next;
  };

  fs.mkdirSync(outVideoDir, { recursive: true });
  fs.mkdirSync(outCoverDir, { recursive: true });

  for (const slug of ARTICLE_SLUGS) {
    const mp4Name = pickSrc(slug);
    const src = path.join(grassDir, mp4Name);
    const destMp4 = path.join(outVideoDir, `${slug}.mp4`);
    const destJpg = path.join(outCoverDir, `${slug}.jpg`);

    fs.copyFileSync(src, destMp4);
    console.log(`已复制视频 ${mp4Name} → public/videos/grass/${slug}.mp4`);

    const r = spawnSync(
      ffmpegPath,
      ["-y", "-ss", "00:00:01", "-i", src, "-frames:v", "1", "-q:v", "2", "-update", "1", destJpg],
      { stdio: "inherit" },
    );
    if (r.status !== 0) {
      console.error(`截取封面失败：${slug}`);
      process.exit(1);
    }
    console.log(`已生成封面 public/images/content/grass/${slug}.jpg`);
  }

  console.log("完成。请确认 src/lib/site-data.ts 中三篇文章的 cover / grassVideoSrc 与上述路径一致。");
}

main();
