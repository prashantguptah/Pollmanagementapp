// store/index.js
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
  }),

  actions: {
    setUser(user) {
      this.user = user;
    },
  },

  getters: {
    user: (state) => state.user,
  },
});
