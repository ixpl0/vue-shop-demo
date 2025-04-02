<script setup lang="ts">
import { computed } from 'vue';
import type { EcwidCategory } from '@/types/ecwid';
import { useCategoryQuery } from '@/composables/useCategoryQuery';

const props = withDefaults(defineProps<{ categories: EcwidCategory[] }>(), {
  categories: () => [],
});

const { categoryId, setCategoryId } = useCategoryQuery();

const categoryItems = computed(() => [{ id: null, name: 'All products' }, ...props.categories]);
</script>

<template>
  <div
    v-if="categories.length"
    class="grid grid-cols-2 md:grid-cols-4 gap-8 gap-y-4 mb-8 px-2"
    role="menu"
  >
    <button
      v-for="category in categoryItems"
      :key="category.id ?? 'all'"
      :class="[
        'flex flex-col items-center p-3 rounded transition cursor-pointer text-center',
        category.id === categoryId
          ? 'bg-blue-100 hover:bg-blue-200 active:bg-blue-300'
          : 'bg-gray-100 hover:bg-gray-200 active:bg-gray-300',
      ]"
      role="menuitem"
      data-test="category-button"
      @click="() => setCategoryId(category.id)"
    >
      <span class="font-medium text-sm">{{ category.name }}</span>
    </button>
  </div>
</template>
