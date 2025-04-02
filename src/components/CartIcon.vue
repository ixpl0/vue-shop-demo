<script setup lang="ts">
import { useCartStore } from '@/stores/cart';
import { CART_ICON_SELECTOR } from '@/constants.ts';

const cart = useCartStore();
</script>

<template>
  <router-link
    to="/cart"
    class="relative inline-flex items-center justify-center text-2xl w-10 h-10 text-gray-600 hover:text-blue-600"
    :[CART_ICON_SELECTOR]="true"
    aria-label="Open shopping cart"
  >
    🛒
    <span
      v-if="cart.count > 0"
      class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
      data-test="cart-count"
    >
      {{ cart.count }}
    </span>
  </router-link>
</template>
