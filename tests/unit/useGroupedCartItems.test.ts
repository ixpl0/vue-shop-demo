import { ref } from 'vue';
import { describe, it, expect } from 'vitest';
import { useGroupedCartItems } from '@/composables/useGroupedCartItems';
import type { EcwidProduct } from '@/types/ecwid';

const createProduct = (id: number): EcwidProduct => {
  const name = `Product ${id}`;

  return {
    id,
    name,
    description: 'description',
    price: 42,
    defaultDisplayedPriceFormatted: '€ 42.00',
    imageUrl: 'imageUrl',
    hdThumbnailUrl: 'hdThumbnailUrl',
    originalImageUrl: 'originalImageUrl',
  };
};

describe('useGroupedCartItems', () => {
  it('returns empty array if no items', () => {
    const items = ref<EcwidProduct[]>([]);
    const grouped = useGroupedCartItems(items);

    expect(grouped.value).toEqual([]);
  });

  it('returns 1 item with quantity 1', () => {
    const items = ref([createProduct(1)]);
    const grouped = useGroupedCartItems(items);

    expect(grouped.value).toHaveLength(1);
    expect(grouped.value[0].quantity).toBe(1);
  });

  it('groups duplicate items correctly', () => {
    const product = createProduct(2);
    const items = ref([product, product, product]);
    const grouped = useGroupedCartItems(items);

    expect(grouped.value).toHaveLength(1);
    expect(grouped.value[0].quantity).toBe(3);
  });

  it('groups different items separately', () => {
    const items = ref([
      createProduct(1),
      createProduct(2),
      createProduct(1),
      createProduct(2),
      createProduct(3),
      createProduct(1),
      createProduct(1),
    ]);

    const grouped = useGroupedCartItems(items);
    const quantities = grouped.value.map((el) => el.quantity);

    expect(grouped.value).toHaveLength(3);
    expect(quantities).toEqual([4, 2, 1]);
  });
});
