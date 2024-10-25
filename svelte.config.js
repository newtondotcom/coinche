//import adapter from '@sveltejs/adapter-node';
import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    alias: {
        '@/*': './path/to/lib/*',
    },
    kit: {
        adapter: adapter({ runtime: 'edge' }),
    },
};

export default config;
