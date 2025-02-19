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
 console.log("logout")
  await authStore.logout();


};


const isAuthenticated = computed(() => authStore.isAuthenticated);
const isAdmin = computed(() => authStore.user?.email === "test@test.com");
</script>
<template>
  <UContainer class="py-4 flex justify-center" >
    <div class="flex space-x-10 justify-center">
      
      <router-link to="/" class="text-lg text-gray-700 hover:text-blue-500 transition-all">
        Home
      </router-link>

  
      <router-link v-if="!isAuthenticated" to="/login" class="text-lg text-gray-700 hover:text-blue-500 transition-all">
        Login
      </router-link>

      <router-link v-if="!isAuthenticated" to="/register" class="text-lg text-gray-700 hover:text-blue-500 transition-all">
        Register
      </router-link>

    
      <button  v-if="isAuthenticated" @click="handleSignOut"  class="text-lg text-gray-700 hover:text-blue-500 transition-all">
        Sign out
      </button>

      
      <router-link v-if="!isAdmin" to="/polls" class="text-lg text-gray-700 hover:text-blue-500 transition-all">
        Polls
      </router-link>

      <router-link v-if="isAdmin" to="/admin" class="text-lg text-gray-700 hover:text-blue-500 transition-all">
        Polls
      </router-link>
    </div>
  </UContainer>
</template>



