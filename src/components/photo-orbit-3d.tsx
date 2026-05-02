"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

type PhotoOrbit3DProps = {
  src: string;
  alt: string;
  /** 外层可视区域高度类，默认与旧 3D 卡一致 */
  frameClassName?: string;
};

/**
 * 无 GLB 时的「3D 沟通」降级：主图在暗底上随指针/触控做轻微透视摆动，
 * 避免占位几何体被误认为页面故障。
 */
export function PhotoOrbit3D({ src, alt, frameClassName }: PhotoOrbit3DProps) {
  const root = useRef<HTMLDivElement>(null);
  const [deg, setDeg] = useState({ x: 0, y: 0 });

  const frame = frameClassName?.trim() ? frameClassName : "h-[280px] w-full";

  const applyFromClient = useCallback((clientX: number, clientY: number) => {
    const el = root.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = (clientX - rect.left) / rect.width - 0.5;
    const ny = (clientY - rect.top) / rect.height - 0.5;
    const maxX = 14;
    const maxY = 10;
    setDeg({ x: Math.max(-maxX, Math.min(maxX, nx * maxX * 2.2)), y: Math.max(-maxY, Math.min(maxY, -ny * maxY * 2)) });
  }, []);

  return (
    <div
      ref={root}
      className={`relative select-none overflow-hidden rounded-xl bg-gradient-to-b from-zinc-900 via-zinc-950 to-black ${frame}`}
      style={{ perspective: "1100px" }}
      onPointerLeave={() => setDeg({ x: 0, y: 0 })}
      onPointerMove={(e) => applyFromClient(e.clientX, e.clientY)}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 38%, rgba(251,191,36,0.12), transparent 55%), radial-gradient(ellipse 90% 80% at 50% 100%, rgba(0,0,0,0.65), transparent 45%)",
        }}
      />
      <div className="relative flex h-full w-full items-center justify-center p-6 [transform-style:preserve-3d]">
        <div
          className="relative h-52 w-52 transition-transform duration-100 ease-out will-change-transform sm:h-60 sm:w-60"
          style={{
            transform: `rotateX(${deg.y}deg) rotateY(${deg.x}deg) translateZ(0)`,
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="280px"
            className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.55)]"
            priority={false}
          />
        </div>
      </div>
      <p className="pointer-events-none absolute bottom-2 left-0 right-0 text-center text-[11px] text-zinc-500">
        光影预览 · 移动指针或手指即可摆动视角；上传 GLB 后可切换为 model-viewer
      </p>
    </div>
  );
}
