export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-zinc-800 bg-zinc-950 text-zinc-50">
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-10 md:grid-cols-3">
        <div>
          <h3 className="font-semibold">玉汝于成</h3>
          <p className="mt-2 text-sm text-zinc-300">做年轻人买得起的好玉，连接中国文化与全球消费者。</p>
        </div>
        <div>
          <h3 className="font-semibold">消费者服务</h3>
          <ul className="mt-2 space-y-1 text-sm text-zinc-300">
            <li>7天无理由退货</li>
            <li>15天质量问题换货</li>
            <li>跨境物流时效透明</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">联系方式</h3>
          <ul className="mt-2 space-y-1 text-sm text-zinc-300">
            <li>邮箱：service@yurucheng.com</li>
            <li>微信：YRC-Global</li>
            <li>工作时间：09:00-21:00</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
