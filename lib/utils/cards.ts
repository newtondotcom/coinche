export const delay = (delayMs: number): Promise<void> => {
    return new Promise((res) => {
        setTimeout(res, delayMs);
    });
};
