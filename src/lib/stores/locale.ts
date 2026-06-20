import { locale as i18nLocale } from 'svelte-i18n';

export const locales = ['en', 'fr'] as const;

export type Locale = (typeof locales)[number];

export function isLocale(value : string) : value is Locale {
    return locales.includes(value as Locale);
}

export const locale = i18nLocale;
