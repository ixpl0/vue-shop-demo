<script setup lang="ts">
import type { EcwidProduct } from '@/types/ecwid';
import { useCartStore } from '@/stores/cart';
import { RouterLink } from 'vue-router';

const props = defineProps<{
  product: EcwidProduct;
  quantity: number;
}>();

const cart = useCartStore();
</script>

<template>
  <div
    class="flex items-center gap-4 p-2 pr-6 rounded hover:shadow transition bg-white"
    itemscope
    itemtype="https://schema.org/Product"
  >
    <RouterLink :to="`/product/${props.product.id}`" itemprop="image">
      <img
        :src="props.product.hdThumbnailUrl"
        :alt="`${props.product.name} thumbnail`"
        class="w-16 h-24 object-contain bg-white rounded"
      />
    </RouterLink>

    <div class="flex-1">
      <RouterLink :to="`/product/${props.product.id}`" class="font-semibold" itemprop="name">
        {{ props.product.name }}
      </RouterLink>

      <div class="text-gray-600" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
        <meta itemprop="priceCurrency" content="EUR" />
        <meta itemprop="price" :content="props.product.price.toString()" />
        <link itemprop="availability" href="https://schema.org/InStock" />
        {{ props.product.defaultDisplayedPriceFormatted }}
      </div>
    </div>

    <div class="flex items-center gap-2">
      <button
        class="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center cursor-pointer"
        aria-label="Decrease quantity"
        @click="cart.removeOne(props.product.id)"
      >
        -
      </button>

      <span class="min-w-[2rem] text-center">{{ props.quantity }}</span>

      <button
        class="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center cursor-pointer"
        aria-label="Increase quantity"
        @click="cart.add(props.product)"
      >
        +
      </button>
    </div>

    <button
      class="ml-4 text-sm text-red-600 p-2 cursor-pointer"
      @click="cart.remove(props.product.id)"
    >
      Delete
    </button>
  </div>
</template>
