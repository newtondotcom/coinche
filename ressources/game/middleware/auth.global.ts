import { isDevEnv } from '~/lib/utils/miscs';

export default defineNuxtRouteMiddleware((to, _) => {
    const storeAbout = useAboutStore();
    const allowedPaths = ['/', '/login', '/404', '/regles', '/api/alive'];
    const config = useRuntimeConfig();
    const devEnv = isDevEnv(config);
    console.log('path out', to.path);
    if ((!allowedPaths.includes(to.path) && !storeAbout.authentificated) || !devEnv) {
        if (to.path !== '/404') {
            return navigateTo('/404');
        }
    }
});
