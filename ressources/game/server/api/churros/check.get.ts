import authentik from '~/server/authentik';
import { decodeIdToken } from 'arctic';

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const session = await useSession(event, {
        password: config.SESSION_PASSWORD,
    });
    const query = getQuery(event);
    const code = query.code as string;
    const codeVerifier = session.data.codeVerifier;
    // récupération du token
    try {
        const tokens = await authentik.validateAuthorizationCode(code, codeVerifier);
        const accessToken = tokens.accessToken();
        const accessTokenExpiresAt = tokens.accessTokenExpiresAt();
        const idToken = tokens.idToken();
        const claims = decodeIdToken(idToken);
        console.log(claims);
        await session.clear();
        await session.update({
            accessToken,
            accessTokenExpiresAt,
        });
    } catch (e) {
        console.log(e);
        setResponseStatus(event, 404, 'ok');
    }
    setResponseStatus(event, 200, 'ok');
});
