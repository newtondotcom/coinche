import { Authentik } from 'arctic';

const domain = 'auth.inpt.fr';
const config = useRuntimeConfig();

const authentik = new Authentik(
    domain,
    config.public.CHURROS_CLIENT_ID,
    config.public.CHURROS_CLIENT_SECRET,
    'http://localhost:3000/login',
);

export default authentik;
