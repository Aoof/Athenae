import { browser } from '$app/environment';
import { writable, derived, get } from 'svelte/store';
import { locale } from './locale';

export interface UserPreferences {
    language: 'en' | 'fr';
}

type UserStoreStatus = 'idle' | 'initializing' | 'ready' | 'saving' | 'error';

interface UserStoreState {
    preferences: UserPreferences;
    status: UserStoreStatus;
    errorCode: string | null;
}

const STORAGE_KEY = 'userData';

export const DEFAULT_PREFERENCES: UserPreferences = {
    language: 'en'
};

function parseStoredLanguage(rawValue: string | null): 'en' | 'fr' | null {
	if (!rawValue) {
		return null;
	}

	try {
		const parsed = JSON.parse(rawValue) as unknown;
		if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
			return null;
		}

		const parsedObject = parsed as {
            preferences?: { language: unknown };
		};

		const language = parsedObject.preferences?.language;

		return language === 'fr' ? 'fr' : language === 'en' ? 'en' : null;
	} catch {
		return null;
	}
}

function resolvePersistedLanguage(): 'en' | 'fr' | null {
    if (!browser)
        return null

	const languageFromUser = parseStoredLanguage(localStorage.getItem(STORAGE_KEY));
	if (languageFromUser) {
		return languageFromUser;
	}

    return null;
}

function createUserStore() {
    const state = writable<UserStoreState>({
        preferences: DEFAULT_PREFERENCES,
        status: 'idle',
        errorCode: null,
    });

    const syncLocale = (preferences: UserPreferences) => {
        locale.set(preferences.language);
        if (browser) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(get(state)));
        }
    }

    const reconcileLocaleFromStorage = () => {
        if (!browser)
            return;

        const persistedLanguage = resolvePersistedLanguage();
        if (!persistedLanguage)
            return;

        const current = get(state);
        if (current.preferences.language === persistedLanguage)
            return;

        const nextPreferences = {...current.preferences, language: persistedLanguage};
        
        applyState({
            ...current,
            preferences: nextPreferences
        });
    }

    const applyState = (nextState: UserStoreState) => {
        state.set(nextState);
        syncLocale(nextState.preferences);
    }

    if (browser) {
        window.addEventListener('storage', (event: StorageEvent) => {
            if (event.key === STORAGE_KEY)
                reconcileLocaleFromStorage();
        });
    }

    const subscribe = state.subscribe;

    const initialize = async () => {
        const current = get(state);
        if (current.status === 'initializing') {
            reconcileLocaleFromStorage();
            return;
        }

        state.update((prev) => ({ ...prev, status: 'initializing', errorCode: null }));
        if (browser) {
            const storedData = localStorage.getItem(STORAGE_KEY);
            if (storedData) {
                try {
                    const storedLanguage = parseStoredLanguage(storedData);
                    if (storedLanguage) {
                        applyState({
                            status: 'ready',
                            errorCode: null,
                            preferences: { ...current.preferences, language: storedLanguage }
                        });
                    }

                    applyState({
                        status: 'ready',
                        errorCode: null,
                        preferences: { ...current.preferences, language: 'en' }
                    });

                    syncLocale(current.preferences);
                } catch (error) {
                    console.error('Error parsing stored user data:', error);
                    localStorage.removeItem(STORAGE_KEY);
                }
            }
        }
    }

    const setLanguage = (language: 'en' | 'fr') => {
        const current = get(state);
        applyState({
            ...current,
            preferences: {
                ...current.preferences,
                language: language
            }
        });
        syncLocale(current.preferences);
    }

    return {
        subscribe,
        initialize,
        setLanguage
    }
}

export const userStore = createUserStore();
export const userPreferences = derived(userStore, ($userStore) => $userStore.preferences);
export const userStatus = derived(userStore, ($userStore) => $userStore.status);
