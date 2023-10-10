import { Product } from '@/scripts/interfaces';
import { createStore } from 'vuex';

export default createStore({
  state: {
    products: [] as Product[],
  },
  getters: {
    getProducts(state) {
      return state.products;
    },
    getMaxProductId(state) {
      return state.products.reduce((value: number, item: Product) => {
        return Math.max(value, +item.id);
      }, 0);
    },
  },
  mutations: {
    addProduct(state, product) {
      state.products.unshift(product);
    },
    deleteProduct(state, productId) {
      const index = state.products.findIndex((item) => item.id === productId);
      if (index < 0) return;
      state.products.splice(index, 1);
    },
    updateProduct(state, product) {
      const index = state.products.findIndex((item) => item.id === product.id);
      if (index < 0) return;
      state.products.splice(index, 1, product);
    },
  },
  actions: {},
  modules: {},
});
