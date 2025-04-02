import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

type CategoryId = number | null;

export const useCategoryQuery = () => {
  const route = useRoute();
  const router = useRouter();

  const categoryId = computed<CategoryId>(() => {
    const id = route.query.category;
    return id ? Number(id) : null;
  });

  const setCategoryId = (id: CategoryId) => {
    router.push({ query: id ? { category: id } : {} });
  };

  return {
    categoryId,
    setCategoryId,
  };
};
