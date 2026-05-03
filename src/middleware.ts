import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["zh", "en"],
  defaultLocale: "zh",
  localePrefix: "never",
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
