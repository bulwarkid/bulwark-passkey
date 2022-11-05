export const DEBUG = true;

(() => {
    const globalWindow = window as unknown as { debugExports: any };

    globalWindow.debugExports = {};
})();
