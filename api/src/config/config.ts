export const otpLength: string = '4';
export const otpExpiry: string = '120';

export const jwtExpiry = '12h';

export const getTokenExpiry = (): number => {
    return Date.now() + 12 * 60 * 60 * 1000;
};
