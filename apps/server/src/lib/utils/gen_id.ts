import { customAlphabet } from 'nanoid';

const genIdCuid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 25);

export default genIdCuid; 