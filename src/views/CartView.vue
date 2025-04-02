<script setup lang="ts">
import { computed, ref } from 'vue';
import { useCartStore } from '@/stores/cart';
import CartItem from '@/components/CartItem.vue';
import { useGroupedCartItems } from '@/composables/useGroupedCartItems';

const cart = useCartStore();
const rawCartItems = computed(() => cart.items);
const groupedItems = useGroupedCartItems(rawCartItems);
const isOrderPlaced = ref(false);

const total = computed(() =>
  groupedItems.value.reduce((sum, { product, quantity }) => {
    return sum + product.price * quantity;
  }, 0),
);

const formatPrice = (amount: number) => {
  const [int, frac = '00'] = amount.toFixed(2).split('.');
  const formatted = `${int.replace(/\B(?=(\d{3})+(?!\d))/g, '.')},${frac}`;
  return `€ ${formatted}`;
};

const totalFormatted = computed(() => formatPrice(total.value));

const placeOrder = () => {
  cart.clear();
  isOrderPlaced.value = true;
};
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Your Cart</h1>

    <div v-if="isOrderPlaced" class="text-xl font-semibold text-center mt-6">
      Congratulations on your purchase!
    </div>

    <div v-else-if="cart.items.length === 0" class="text-gray-500">Your cart is empty.</div>

    <div v-else class="space-y-4" role="list" itemscope itemtype="https://schema.org/ItemList">
      <meta itemprop="name" content="Shopping Cart" />

      <CartItem
        v-for="{ product, quantity } in groupedItems"
        :key="product.id"
        :product="product"
        :quantity="quantity"
        role="listitem"
        itemprop="itemListElement"
        itemscope
        itemtype="https://schema.org/Product"
      />

      <div class="text-right text-lg font-medium">Total: {{ totalFormatted }}</div>

      <button
        class="mt-6 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded cursor-pointer"
        data-test="place-order"
        @click="placeOrder"
      >
        Place order
      </button>
    </div>
  </div>
</template>
