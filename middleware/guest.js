import { useAuthStore } from "~/store";
export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore(); 

  

  if (authStore.value && to.path === '/login') {
    console.log("this is guest middleware")
    return navigateTo('/');
 
  }

});


