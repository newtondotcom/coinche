// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: { enabled: false },
    modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', '@pinia/nuxt', '@nuxt/eslint'],
    shadcn: {
        prefix: '',
        componentDir: './components/ui',
    },
    tailwindcss: {
        cssPath: ['~/assets/css/tailwind.css', { injectPosition: 'first' }],
        configPath: 'tailwind.config',
        exposeConfig: {
            level: 2,
        },
        viewer: false,
    },
    ssr: false,
    runtimeConfig: {
        CHURROS_CLIENT_ID: process.env.CHURROS_CLIENT_ID,
        CHURROS_CLIENT_SECRET: process.env.CHURROS_CLIENT_SECRET,
        SESSION_PASSWORD: process.env.SESSION_PASSWORD,
        public: {
            SUPABASE_URL: process.env.SUPABASE_URL,
            SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
            NODE_ENV: process.env.NODE_ENV,
        },
    },
    app: {
        head: {
            title: 'Coinche.n7',
            meta: [
                { charset: 'utf-8' },
                {
                    hid: 'description',
                    name: 'description',
                    content: 'Le meilleur site de coinche en ligne',
                },
            ],
            link: [{ rel: 'icon', type: 'image/png', href: '/carro.png' }],
        },
    },
});
