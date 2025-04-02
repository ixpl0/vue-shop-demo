<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import DOMPurify from 'dompurify';
import { getProductById } from '@/services/ecwid-api';
import { useCartStore } from '@/stores/cart';
import { useAddToCartAnimation } from '@/composables/useAddToCartAnimation';
import type { EcwidProduct } from '@/types/ecwid';
import LoadingOverlay from '@/components/LoadingOverlay.vue';

const route = useRoute();
const cart = useCartStore();
const runAddToCartAnimation = useAddToCartAnimation();

const product = ref<EcwidProduct | null>(null);
const imgRef = ref<HTMLImageElement | null>(null);
const isLoading = ref(false);
const error = ref<string>('');

const safeDescriptionHtml = computed<string>(() =>
  DOMPurify.sanitize(product.value?.description || ''),
);

const loadProduct = async () => {
  isLoading.value = true;
  error.value = '';

  try {
    const id = Number(route.params.id);
    product.value = await getProductById(id);
  } catch (e) {
    error.value = e instanceof Error ? e.message : String(e);
  } finally {
    isLoading.value = false;
  }
};

onMounted(loadProduct);

const addToCart = () => {
  if (!product.value) {
    return;
  }

  if (imgRef.value) {
    runAddToCartAnimation(imgRef.value);
  }

  cart.add(product.value);
};
</script>

<template>
  <div class="p-4 max-w-4xl mx-auto">
    <LoadingOverlay v-if="isLoading" />

    <div v-if="error" class="text-red-500 text-center">{{ error }}</div>

    <div
      v-else-if="product"
      class="grid md:grid-cols-2 gap-8 items-start"
      itemscope
      itemtype="https://schema.org/Product"
    >
      <a
        :href="product.originalImageUrl"
        target="_blank"
        rel="noopener noreferrer"
        itemprop="image"
      >
        <img
          ref="imgRef"
          :src="product.imageUrl"
          :alt="product.name"
          class="w-full rounded bg-white object-contain aspect-[2/3]"
        />
      </a>

      <div>
        <h1 class="text-2xl font-bold mb-4" itemprop="name">{{ product.name }}</h1>

        <div
          class="prose text-gray-600 mb-6 max-w-none"
          itemprop="description"
          v-html="safeDescriptionHtml"
        />

        <div
          class="text-2xl font-semibold mb-6"
          itemprop="offers"
          itemscope
          itemtype="https://schema.org/Offer"
        >
          <meta itemprop="priceCurrency" content="EUR" />
          <meta itemprop="price" :content="product.price.toString()" />
          <link itemprop="availability" href="https://schema.org/InStock" />
          {{ product.defaultDisplayedPriceFormatted }}
        </div>

        <button
          class="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-6 rounded transition cursor-pointer"
          data-test="add-to-cart"
          @click="addToCart"
        >
          Add to cart
        </button>
      </div>
    </div>
  </div>
</template>
