import { useAuthStore } from "~/store";
export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore(); 

  if (!authStore.user) {
    return navigateTo('/login'); // Redirect to login if user is not authenticated
  }

 
 
  

});


