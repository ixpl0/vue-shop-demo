import { defineStore } from 'pinia';
import type { EcwidProduct } from '@/types/ecwid';

const STORAGE_KEY = 'cart';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as EcwidProduct[],
  }),

  getters: {
    count: (state) => state.items.length,
  },

  actions: {
    add(product: EcwidProduct) {
      this.items.push(product);
      this.saveToStorage();
    },

    remove(productId: number) {
      this.items = this.items.filter((p) => p.id !== productId);
      this.saveToStorage();
    },

    removeOne(productId: number) {
      const index = [...this.items].reverse().findIndex((p) => p.id === productId);

      if (index !== -1) {
        const actualIndex = this.items.length - 1 - index;
        this.items.splice(actualIndex, 1);
        this.saveToStorage();
      }
    },

    clear() {
      this.items = [];
      this.saveToStorage();
    },

    saveToStorage() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
    },

    loadFromStorage() {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        try {
          this.items = JSON.parse(raw);
        } catch {
          this.items = [];
        }
      }
    },
  },
});
