export default defineNuxtRouteMiddleware((to, _) => {
    const storeAbout = useAboutStore();
    const allowedPaths = ['/', '/login', '/404', '/regles', '/api/alive'];
    const config = useRuntimeConfig();
    const devEnv = config.public.NODE_ENV !== 'production';
    if ((!allowedPaths.includes(to.path) && !storeAbout.authentificated) || !devEnv) {
        if (to.path !== '/404') {
            return navigateTo('/404');
        }
    }
});
