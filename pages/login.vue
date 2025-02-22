<template>
  <div class="flex justify-center items-center min-h-screen bg-blue-500">
    <UContainer class="p-8 bg-white rounded-lg shadow-lg w-full max-w-sm">
      <h1 class="text-2xl font-semibold text-center text-blue-500 mb-6">
        Login
      </h1>

      <UFormGroup label="Enter email"  name="email" required>
        <UInput
          v-model="email"
          type="email"
          placeholder="Email"
          size="lg"
          class="mb-4 mt-2"
          
        />
      </UFormGroup>

      <UFormGroup label="Enter password" name="password" required>
        <UInput
          v-model="password"
          type="password"
          placeholder="Password"
          size="lg"
          class="mb-6 mt-2"
          
        />
      </UFormGroup>
      <UButton @click="handleLogin" color="blue" block class="mb-4">
        Login
      </UButton>

      <p class="text-center text-muted">
        Don't have an account?
        <NuxtLink to="/register" class="text-blue-500 hover:underline">
          Sign up
        </NuxtLink>
      </p>
    </UContainer>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuth } from "~/composables/useAuth";
import { useAuthStore } from "~/store";
import { navigateTo } from "#app";

const email = ref("");
const password = ref("");
const { login } = useAuth();
const authStore = useAuthStore();
const toast = useToast()

definePageMeta({
  middleware: "guest",
});

const handleLogin = async () => {
  try {
    const userCredential = await login(email.value, password.value);

    authStore.setUser({
      email: email.value,
      uid: userCredential.user.uid,
    });
    
    toast.add({ title: 'Login succesful!' })
    

    if (authStore.isAdmin) {
      navigateTo("/admin");
    } else {
      navigateTo("/polls");
    }
  } catch (error) {
    
    toast.add({ title: error.message })
  }
};
</script>
