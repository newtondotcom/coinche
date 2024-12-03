export default defineNuxtRouteMiddleware((to, _) => {
    const storeAbout = useAboutStore();
    const allowedPaths = ['/', '/login', '/404', '/regles'];
    console.log('to', to.path);
    if (!allowedPaths.includes(to.path) && !storeAbout.authentificated) {
        if (to.path !== '/404') {
            return navigateTo('/404');
        }
    }
});
