<script setup lang="ts">
import type { EcwidProduct } from '@/types/ecwid';
import { useCartStore } from '@/stores/cart';
import { useAddToCartAnimation } from '@/composables/useAddToCartAnimation';
import { ref } from 'vue';

const props = withDefaults(defineProps<{ products?: EcwidProduct[] }>(), {
  products: () => [],
});

const cart = useCartStore();
const runAddToCartAnimation = useAddToCartAnimation();

const imgRefs = ref<Record<number, unknown>>({});

const addToCart = (product: EcwidProduct) => {
  const imgRef = imgRefs.value[product.id];

  if (imgRef instanceof HTMLImageElement) {
    runAddToCartAnimation(imgRef);
  }

  cart.add(product);
};
</script>

<template>
  <div v-if="props.products.length">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4" role="grid">
      <div
        v-for="product in props.products"
        :key="product.id"
        class="p-2 rounded hover:shadow-lg flex flex-col gap-2"
        data-test="product"
        role="gridcell"
        itemscope
        itemtype="https://schema.org/Product"
      >
        <router-link
          :to="`/product/${product.id}`"
          class="w-full aspect-[2/3] bg-white rounded overflow-hidden"
          data-test="product-image-link"
        >
          <img
            :ref="(el) => (imgRefs[product.id] = el)"
            :src="product.hdThumbnailUrl"
            :alt="`${product.name} thumbnail`"
            class="w-full h-full object-contain"
            itemprop="image"
          />
        </router-link>

        <router-link
          :to="`/product/${product.id}`"
          class="font-semibold"
          data-test="product-name-link"
          itemprop="name"
        >
          {{ product.name }}
        </router-link>

        <div
          class="text-gray-500 mt-auto"
          data-test="product-price"
          itemprop="offers"
          itemscope
          itemtype="https://schema.org/Offer"
        >
          <meta itemprop="priceCurrency" content="EUR" />
          <meta itemprop="price" :content="product.price.toString()" />
          {{ product.defaultDisplayedPriceFormatted }}
        </div>

        <button
          class="w-full bg-blue-400 hover:bg-blue-500 text-white text-sm font-medium py-2 px-4 cursor-pointer rounded transition"
          data-test="add-to-cart"
          @click.prevent="() => addToCart(product)"
        >
          Add to cart
        </button>
      </div>
    </div>
  </div>
</template>
