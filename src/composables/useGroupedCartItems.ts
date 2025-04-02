import { computed, type Ref } from 'vue';
import type { EcwidProduct } from '@/types/ecwid';

export type CartItem = {
  product: EcwidProduct;
  quantity: number;
};

export const useGroupedCartItems = (items: Ref<EcwidProduct[]>) => {
  return computed<CartItem[]>(() => {
    const groups = items.value.reduce<Record<number, CartItem>>((acc, el) => {
      const existingGroup = acc[el.id];
      const product = existingGroup?.product ?? el;
      const quantity = (existingGroup?.quantity ?? 0) + 1;

      return { ...acc, [el.id]: { product, quantity } };
    }, {});

    return Object.values(groups);
  });
};
