import authentik from '~/server/authentik';
import { ArcticFetchError, OAuth2RequestError } from 'arctic';

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const session = await useSession(event, {
        password: config.SESSION_PASSWORD,
    });
    const accessToken = session.data.accessToken;
    try {
        await authentik.revokeToken(accessToken);
        await session.update({
            accessToken: null,
            accessTokenExpiresAt: null,
            refreshToken: null,
        });
    } catch (e) {
        if (e instanceof OAuth2RequestError) {
            // Invalid authorization code, credentials, or redirect URI
            console.log(e.code);
        }
        if (e instanceof ArcticFetchError) {
            // Failed to call `fetch()`
            console.log(e);
        }
    }

    return {
        hello: 'world',
    };
});
