"use client";

import { Suspense, lazy, ComponentType, ReactNode } from "react";

type LazyWrapperProps = {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
};

/**
 * 通用懒加载包装器
 * 用于包装重型组件，提供加载状态和错误边界
 */
export function LazyWrapper({
  children,
  fallback,
  className,
}: LazyWrapperProps) {
  const defaultFallback = (
    <div
      className={`flex items-center justify-center rounded-xl bg-zinc-100 p-8 ${className || ""}`}
    >
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-600 border-t-transparent" />
        <span className="text-sm text-zinc-500">加载中...</span>
      </div>
    </div>
  );

  return <Suspense fallback={fallback || defaultFallback}>{children}</Suspense>;
}

/**
 * 创建懒加载组件
 * @param importFn - 动态导入函数
 * @param fallback - 加载状态组件
 * @returns 懒加载组件
 */
export function createLazyComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  fallback?: ReactNode
) {
  const LazyComponent = lazy(importFn);

  return function LazyLoadedComponent(props: React.ComponentProps<T>) {
    return (
      <LazyWrapper fallback={fallback}>
        <LazyComponent {...props} />
      </LazyWrapper>
    );
  };
}

/**
 * 图片懒加载包装器
 * 使用 IntersectionObserver 实现视口内加载
 */
export function LazyImage({
  src,
  alt,
  className,
  width,
  height,
  ...props
}: {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  [key: string]: any;
}) {
  return (
    <LazyWrapper
      className={className}
      fallback={
        <div
          className={`animate-pulse bg-zinc-200 ${className || ""}`}
          style={{ width, height }}
        />
      }
    >
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        {...props}
      />
    </LazyWrapper>
  );
}

/**
 * 视频懒加载包装器
 * 使用 IntersectionObserver 实现视口内加载
 */
export function LazyVideo({
  src,
  poster,
  className,
  ...props
}: {
  src: string;
  poster?: string;
  className?: string;
  [key: string]: any;
}) {
  return (
    <LazyWrapper
      className={className}
      fallback={
        <div className={`flex items-center justify-center bg-zinc-900 ${className || ""}`}>
          <div className="flex flex-col items-center gap-2 text-white">
            <svg
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm">加载视频中...</span>
          </div>
        </div>
      }
    >
      <video
        src={src}
        poster={poster}
        className={className}
        preload="metadata"
        {...props}
      />
    </LazyWrapper>
  );
}
