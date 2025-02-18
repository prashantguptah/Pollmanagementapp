
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
  }),

  actions: {
    setUser(user) {
      this.user = {
        email: user.email,
        uid: user.uid, 
      };
    },
  },

  getters: {
    // user: (state) => state.user,
    isAuthenticated: (state) => state.user !== null, 
    userId: (state) => state.user?.uid,
    
  },
});
