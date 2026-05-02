import Link from "next/link";

export default function NotFound() {
  return (
    <div className="section-shell">
      <div className="mx-auto max-w-xl rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-medium uppercase tracking-wide text-amber-700">404</p>
        <h1 className="mt-2 text-2xl font-semibold text-zinc-950">找不到这个页面</h1>
        <p className="mt-3 text-sm text-zinc-600">
          你访问的内容可能已下架、改名或输入有误。可以从下面这些常用入口重新开始：
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link
            href="/shop"
            className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-800 hover:border-amber-400 hover:text-amber-700"
          >
            去购买
            <span className="mt-1 block text-xs text-zinc-500">按场景、价格带、寓意筛选商品</span>
          </Link>
          <Link
            href="/content"
            className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-800 hover:border-amber-400 hover:text-amber-700"
          >
            看内容
            <span className="mt-1 block text-xs text-zinc-500">搭配教程 / 用户故事 / 选购知识</span>
          </Link>
          <Link
            href="/showcase-3d"
            className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-800 hover:border-amber-400 hover:text-amber-700"
          >
            3D 展示
            <span className="mt-1 block text-xs text-zinc-500">浮雕 GLB 在线旋转预览</span>
          </Link>
          <Link
            href="/support"
            className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-800 hover:border-amber-400 hover:text-amber-700"
          >
            售后保障
            <span className="mt-1 block text-xs text-zinc-500">退换 / 物流 / 咨询表单</span>
          </Link>
        </div>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-full bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700"
        >
          回到首页
        </Link>
      </div>
    </div>
  );
}
