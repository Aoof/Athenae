import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ request }) => {
    const acceptLang = request.headers.get('accept-language') ?? '';
    const prefersFrench = acceptLang.toLowerCase().includes('fr');
    throw redirect(302, prefersFrench ? '/fr' : '/en');
};
