<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from "~/store";
import { useAuth } from '~/composables/useAuth';
const { logout } =
 useAuth();
 
const router = useRouter();

const authStore = useAuthStore();
const handleSignOut = async () => {
  alert("Signout")
  await logout(); // Perform logout logic
  authStore.setUser(null); // Make sure the auth store is updated
  router.push("/"); // Redirect to home or login page after logging out
};


const isAuthenticated = computed(() => authStore.isAuthenticated);
</script>
<template>
  <UContainer class="py-4 flex justify-center">
    <div class="flex space-x-10 justify-center">
      <!-- Home Link -->
      <router-link to="/" class="text-lg text-gray-700 hover:text-blue-500 transition-all">
        Home
      </router-link>

      <!-- Login Link -->
      <router-link v-if="!isAuthenticated" to="/login" class="text-lg text-gray-700 hover:text-blue-500 transition-all">
        Login
      </router-link>

      <!-- Register Link -->
      <router-link v-if="!isAuthenticated" to="/register" class="text-lg text-gray-700 hover:text-blue-500 transition-all">
        Register
      </router-link>

      <!-- Sign out -->
      <router-link  v-if="isAuthenticated" @click="handleSignOut" to="/" class="text-lg text-gray-700 hover:text-blue-500 transition-all">
        Sign out
      </router-link>

      <!-- Polls Link -->
      <router-link to="/polls" class="text-lg text-gray-700 hover:text-blue-500 transition-all">
        Polls
      </router-link>

      <!-- Admin Link -->
      <router-link to="/admin" class="text-lg text-gray-700 hover:text-blue-500 transition-all">
        Admin
      </router-link>
    </div>
  </UContainer>
</template>



