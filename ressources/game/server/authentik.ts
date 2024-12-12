import { Authentik } from 'arctic';

const domain = 'auth.inpt.fr';
const config = useRuntimeConfig();

const redirectUrl =
    config.NODE_ENV == 'production' ? 'https://coinche-game.vercel.app/' : 'http://localhost:3000/';

const authentik = new Authentik(
    domain,
    config.CHURROS_CLIENT_ID,
    config.CHURROS_CLIENT_SECRET,
    redirectUrl + 'login',
);

export default authentik;
