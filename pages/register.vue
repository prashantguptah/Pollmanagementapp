<template>
   <div class="flex justify-center items-center min-h-screen bg-gray-50">
    <UCard class="w-full max-w-md p-6">
      <h1 class="text-2xl font-semibold text-center text-primary mb-6">Signup</h1>
      
      <UInput 
        v-model="email" 
        type="email" 
        placeholder="Email" 
        size="lg"
        class="mb-4"
      />
      
      <UInput 
        v-model="password" 
        type="password" 
        placeholder="Password" 
        size="lg"
        class="mb-6"
      />

      <UButton 
        @click="handleSignup" 
        color="primary" 
        size="lg" 
        block
      >
        Signup
      </UButton>

      <p class="text-center text-gray-600 mt-4">
        Already have an account? 
        <NuxtLink to="/login" class="text-primary font-medium hover:underline">
          Login
        </NuxtLink>
      </p>
    </UCard>
  </div>
  </template>

<script setup>
import { ref } from "vue";
import { useAuth } from "~/composables/useAuth";
const router = useRouter();

const email = ref("");
const password = ref("");
const { register } = useAuth();

const handleSignup = async () => {
  try {
    await register(email.value, password.value);
    alert("Account Created! Now login.");
      router.push("/login");
  } catch (error) {
    alert(error.message);
  }
};
</script>



<style scoped>
.auth-container {
  width: 300px;
  margin: auto;
  text-align: center;
}
</style>