import { useAuthStore } from "~/store";
export default defineNuxtRouteMiddleware(async () => {
    const authStore = useAuthStore();
  
    console.log("[Login Page] Running middleware...");
    await authStore.initAuth();
  
    console.log("[Login Page] User State:", authStore.user ? authStore.user.uid : "No user");
  
    if (authStore.user !== null) {
      console.log("Redirecting to home...");
      return navigateTo("/");
    }
  });
  