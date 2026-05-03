import { getRequestConfig } from "next-intl/server";

const defaultLocale = "zh";

export default getRequestConfig(async () => {
  return {
    locale: defaultLocale,
    messages: (await import(`../../messages/${defaultLocale}.json`)).default,
  };
});
