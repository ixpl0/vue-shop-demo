<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { getAllCategories, getAllProducts, getProductsByCategory } from '@/services/ecwid-api';
import CategoryList from '@/components/CategoryList.vue';
import ProductList from '@/components/ProductList.vue';
import { useCategoryQuery } from '@/composables/useCategoryQuery';
import type { EcwidCategory, EcwidProduct } from '@/types/ecwid';
import LoadingOverlay from '@/components/LoadingOverlay.vue';

const { categoryId } = useCategoryQuery();

const categories = ref<EcwidCategory[]>([]);
const products = ref<EcwidProduct[]>([]);
const isLoading = ref(false);
const error = ref<string>('');

const loadCategoriesAndProducts = async () => {
  isLoading.value = true;
  error.value = '';

  try {
    const [allCategories, allProducts] = await Promise.all([
      getAllCategories(),
      categoryId.value ? getProductsByCategory(categoryId.value) : getAllProducts(),
    ]);

    categories.value = allCategories;
    products.value = allProducts;
  } catch (e: unknown) {
    error.value = e instanceof Error ? e.message : String(e);
  } finally {
    isLoading.value = false;
  }
};

onMounted(loadCategoriesAndProducts);
watch(categoryId, loadCategoriesAndProducts);
</script>

<template>
  <div>
    <div v-if="error" class="mt-4 text-red-500">{{ error }}</div>

    <template v-else>
      <CategoryList :categories="categories" />
      <ProductList :products="products" />
    </template>

    <LoadingOverlay v-if="isLoading" />
  </div>
</template>
