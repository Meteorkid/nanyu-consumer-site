"use client";

import Link, { LinkProps } from "next/link";
import { trackEvent } from "@/lib/tracking";

type TrackLinkProps = LinkProps & {
  children: React.ReactNode;
  className?: string;
  eventName: string;
  eventPayload?: Record<string, string | number>;
};

export function TrackLink({
  children,
  className,
  eventName,
  eventPayload,
  ...rest
}: TrackLinkProps) {
  return (
    <Link
      {...rest}
      className={className}
      onClick={() => trackEvent(eventName, eventPayload)}
    >
      {children}
    </Link>
  );
}
