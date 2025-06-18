import { isDevEnv } from '~/lib/utils/miscs';

export default defineNuxtRouteMiddleware((to, _) => {
    const storeAbout = useAboutStore();
    const allowedPaths = ['/', '/login', '/404', '/regles', '/api/alive'];
    const config = useRuntimeConfig();
    const devEnv = isDevEnv(config);
    if (!devEnv && !allowedPaths.includes(to.path) && !storeAbout.authentificated) {
        return navigateTo('/404');
    }
});
