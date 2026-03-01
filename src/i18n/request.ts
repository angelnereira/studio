import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';

export default getRequestConfig(async () => {
    // Provide a static locale, fetch it from the user, or use the locale from the request headers
    const reqHeaders = await headers();
    const localeHeader = reqHeaders.get('x-next-intl-locale') || 'es';

    return {
        locale: localeHeader,
        messages: (await import(`../../messages/${localeHeader}.json`)).default
    };
});
