<template>
  <transition name="fade">
    <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center bg-white/30">
      <div class="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

defineProps<{
  delay?: number;
}>();

const visible = ref(false);
let timer: ReturnType<typeof setTimeout>;

onMounted(() => {
  timer = setTimeout(() => {
    visible.value = true;
  }, 400);
});

onBeforeUnmount(() => {
  clearTimeout(timer);
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
