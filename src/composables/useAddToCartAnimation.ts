import { CART_ICON_SELECTOR } from '@/constants.ts';

export const useAddToCartAnimation = () => {
  return (imgEl: HTMLImageElement) => {
    const cartIcon = document.querySelector(`[${CART_ICON_SELECTOR}]`);

    if (!imgEl || !cartIcon) {
      return;
    }

    const imageClone = imgEl.cloneNode(true);
    const rect = imgEl.getBoundingClientRect();
    const targetRect = cartIcon.getBoundingClientRect();

    if (!(imageClone instanceof HTMLImageElement)) {
      return;
    }

    Object.assign(imageClone.style, {
      position: 'fixed',
      left: `${rect.left}px`,
      top: `${rect.top}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      transition: 'all 0.5s ease-in-out',
      zIndex: 1000,
      pointerEvents: 'none',
    });

    document.body.appendChild(imageClone);

    requestAnimationFrame(() => {
      Object.assign(imageClone.style, {
        left: `${targetRect.left}px`,
        top: `${targetRect.top}px`,
        width: '20px',
        height: '20px',
        opacity: '0',
      });
    });

    setTimeout(() => {
      document.body.removeChild(imageClone);
    }, 500);
  };
};
