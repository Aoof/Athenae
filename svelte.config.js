import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-cloudflare';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    compilerOptions: {
        // Force runes mode for the project, except for libraries. Can be removed in svelte 6.
        runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
    },
    kit: {
        adapter: adapter({
            routes: {
                include: ['/*'],
                exclude: ['<all>'],
            },
        })
    },
    preprocess: [mdsvex({ extensions: ['.svx', '.md'] })],
    extensions: ['.svelte', '.svx', '.md'],
    alias: {
        $lib: './src/lib',
        $components: './src/components',
        $stores: './src/lib/stores',
        $utils: './src/lib/utils',
        $i18n: './src/lib/i18n',
    }
};

export default config;
