<script setup lang="ts">
import CartIcon from '@/components/CartIcon.vue';
import { useCartStore } from '@/stores/cart';

const cart = useCartStore();

cart.loadFromStorage();
</script>

<template>
  <div class="min-h-screen bg-white text-gray-800">
    <header class="sticky top-0 z-50 bg-white shadow py-3">
      <div class="max-w-screen-xl mx-auto px-4 flex justify-between items-center">
        <router-link to="/" class="text-xl font-bold" aria-label="Open main page">
          Vue Shop Demo!
        </router-link>
        <CartIcon />
      </div>
    </header>

    <main class="max-w-screen-xl mx-auto px-4 py-6">
      <router-view />
    </main>
  </div>
</template>
