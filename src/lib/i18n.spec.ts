import { describe, it, expect, vi, beforeEach } from 'vitest';
import { localizeMessage } from './i18n';
import { get } from 'svelte/store';

vi.mock('$app/environment', () => ({
    browser: true,
}));

vi.mock('$lib/stores/locale', () => ({
    locale: { set: vi.fn() }
}));

const { userStore, userPreferences } = await import('./stores/user.ts');

beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
});

describe('localizeMessage', () => {
    it('localizes a message', async () => {
        await userStore.initialize();
        expect(get(userPreferences)).toBe({ language: 'en' });
        expect(localizeMessage('test')).toBe("This is a test message");
        userStore.setLanguage('fr');
        expect(get(userPreferences)).toBe({ language: 'fr' });
        expect(localizeMessage('test')).toBe("Cette phrase est en français");
    });
});
