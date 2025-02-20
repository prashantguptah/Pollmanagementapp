


  import { useAuthStore } from "~/store";
  export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore(); 
  
    if (!authStore.isAdmin) {
        return navigateTo('/login'); 
      }
  

  
  });
  
  
  