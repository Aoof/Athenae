import { init, locale, addMessages } from 'svelte-i18n';
import { get } from 'svelte/store';
import en from './locales/en';
import fr from './locales/fr';
import type { TUserData } from './types/user';

let hasInitializedI18n = false;
const STORAGE_KEY = 'userData';

type TSupportedLocale = 'en' | 'fr';

addMessages('en', en);
addMessages('fr', fr);

function isSupportedLocale(value: unknown): value is TSupportedLocale {
    return value === 'en' || value === 'fr';
}

function readLocaleFromStorage(): TSupportedLocale | null {
    if (typeof localStorage === 'undefined') {
        return null;
    }

    const rawUserData = localStorage.getItem(STORAGE_KEY);
    if (!rawUserData) {
        return null;
    }

    try {
        const parsed = JSON.parse(rawUserData) as unknown;
        if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
            return null;
        }

        const parsedObject = parsed as TUserData;
        const candidateLanguage = parsedObject.preferences?.language;
        return isSupportedLocale(candidateLanguage) ? candidateLanguage : null;
    } catch {
        return null;
    }
}

function readBrowserLocale(): TSupportedLocale {
    if (typeof navigator === 'undefined') {
        return 'en';
    }

    const browserLocale = navigator.language.split('-')[0];
    return browserLocale === 'fr' ? 'fr' : 'en';
}

function resolveInitialLocale(): TSupportedLocale {
    return readLocaleFromStorage() ?? readBrowserLocale();
}

function getActiveMessages() {
    const activeLocale = get(locale) ?? resolveInitialLocale();
    return activeLocale === 'fr' ? fr : en;
}

export function localizeMessage(messageKey: string, fallbackKey?: string): string {
    initI18n();

    if (!messageKey) {
        return fallbackKey ? localizeMessage(fallbackKey) : '';
    }

    const activeMessages = getActiveMessages();
    if (messageKey in activeMessages) {
        return activeMessages[messageKey as keyof typeof activeMessages];
    }

    if (fallbackKey) {
        if (fallbackKey in activeMessages) {
            return activeMessages[fallbackKey as keyof typeof activeMessages];
        }

        return fallbackKey;
    }
    return messageKey;
}

export function initI18n() {
    if (hasInitializedI18n) {
        return;
    }

    const initialLocale = resolveInitialLocale();

    init({
        fallbackLocale: initialLocale,
        handleMissingMessage: ({ id }) => id,
        initialLocale
    });

    hasInitializedI18n = true;
}

initI18n();
