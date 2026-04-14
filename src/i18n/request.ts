import { getRequestConfig } from 'next-intl/server';
import { routing } from '../lib/routing';

export default getRequestConfig(async ({ requestLocale }) => {
    // `requestLocale` is provided by next-intl v4 via `setRequestLocale()`
    // called in each layout/page. Fall back to the default locale if absent.
    let locale = await requestLocale;

    if (!locale || !(routing.locales as readonly string[]).includes(locale)) {
        locale = routing.defaultLocale;
    }

    return {
        locale,
        messages: (await import(`../../messages/${locale}.json`)).default,
    };
});
