export default defineEventHandler(async (event) => {
    const path = event.path;
    const query = getQuery(event);
    let user = query.id;
    try {
        if (user) {
            event.context.user_id = user;
        }
    } catch (error) {
        console.error('Route fetched : ' + event.path);
        console.error('Error in auth middleware:', error);
        await sendRedirect(event, '/auth/login', 302);
    }
});
