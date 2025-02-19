
import { defineStore } from 'pinia';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '~/plugins/firebase';
import { navigateTo } from '#app';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthInitialized: false
  }),

  actions: {
    setUser(user) {
      if (user) {
        this.user = {
          email: user.email,
          uid: user.uid,
        };
      } else {
        this.user = null;
      }
      console.log( "User updated:",this.user)
    },

    async logout(){
      await signOut(auth)
      this.setUser(null)
      alert("Your are Logged out")
      navigateTo("/")
    },

    async initAuth() {
      if (this.isAuthInitialized) return;

      return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
          this.setUser(user);
          this.isAuthInitialized = true;
          console.log("Auth state updated:", user ? user.uid : "No user"); // Debugging log
          resolve(user);
        });
      });
    },
   
  },

  getters: {
    // user: (state) => state.user,
    isAuthenticated: (state) => state.user !== null, 
    userId: (state) => state.user?.uid,
    
  },
  
});
