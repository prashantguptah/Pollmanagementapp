<template>
     <div class="flex justify-center items-center min-h-screen bg-gray-50">
    <div class="p-8 bg-black rounded-lg shadow-md w-full max-w-sm">
      <h1 class="text-2xl font-semibold text-center text-indigo-600 mb-6">Login</h1>
      
      <UInput 
        v-model="email" 
        type="email" 
        placeholder="Email" 
        class="mb-4"
      />
      
      <UInput 
        v-model="password" 
        type="password" 
        placeholder="Password" 
        class="mb-6"
      />
     
      
      <UButton 
        @click="handleLogin" 
        color="primary" 
        class="w-full mb-4"
      >
        Login
      </UButton>

      <p class="text-center text-gray-600">
        Don't have an account? 
        <NuxtLink to="/register" class="text-indigo-600 hover:underline">Sign up</NuxtLink>
      </p>
    </div>
  </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useAuth } from '~/composables/useAuth';
  
  const email = ref('');
  const password = ref('');
  const { login } = useAuth();
  
  const handleLogin = async () => {
    try {
      await login(email.value, password.value);
      alert('Login successful');
    } catch (error) {
      alert(error.message);
    }
  };
  </script>
  