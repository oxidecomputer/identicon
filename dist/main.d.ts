import md5 from 'md5';
declare const randomHash: () => string;
declare const generateIdenticon: (hash: string) => string;
export { generateIdenticon, randomHash, md5 };
