import { redirect } from '@sveltejs/kit';
import { isLocale } from '$lib/stores/locale';
import type { LayoutServerLoad } from './$types';

export const load : LayoutServerLoad = ({ params }) => {
    if (!isLocale(params.locale)) {
        throw redirect(302, '/en');
    }

    return {
        locale: params.locale
    };
};
