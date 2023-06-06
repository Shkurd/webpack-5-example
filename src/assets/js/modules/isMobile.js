export const isMobileDevice = (() => {
    return (
      typeof window.orientation !== 'undefined' ||
      (navigator.userAgent.indexOf('IEMobile') !== -1 ||
        /android|ip(hone|od|ad)/i.test(navigator.userAgent))
    );
  })();  