import { ArcticFetchError, OAuth2RequestError } from 'arctic';

const urlUserInfos = 'https://auth.inpt.fr/application/o/userinfo/';
export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const session = await useSession(event, {
        password: config.public.SESSION_PASSWORD,
    });
    const accessToken = session.data.accessToken;
    if (!accessToken) {
        console.log('no access token');
    }
    try {
        // check user info with accessToken
        const data = await $fetch(urlUserInfos, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return {
            data,
        };
    } catch (e) {
        console.log(e);
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
