<template>
  <div class="flex justify-center items-center min-h-screen bg-indigo-600">
    <div class="p-8 bg-white rounded-lg shadow-lg w-full max-w-sm">
      <h1 class="text-2xl font-semibold text-center text-indigo-700 mb-6">
        Login
      </h1>

      <UInput v-model="email" type="email" placeholder="Email" class="mb-4" />

      <UInput
        v-model="password"
        type="password"
        placeholder="Password"
        class="mb-6"
      />

      <UButton @click="handleLogin" color="primary" class="w-full mb-4">
        Login
      </UButton>

      <p class="text-center text-gray-600">
        Don't have an account?
        <NuxtLink to="/register" class="text-indigo-600 hover:underline">
          Sign up
        </NuxtLink>
      </p>
    </div>
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


// definePageMeta({
//   middleware: async (to, from) => {
//     const authStore = useAuthStore();

//     console.log("[Login Page] Running middleware...");

//     await authStore.initAuth();

//     console.log("[Login Page] User State:", authStore.user ? authStore.user.uid : "No user");

//     if (authStore.user !== null) {
//       console.log("Hello ...")
//       return navigateTo("/");
//     }
//   },
// });
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
    alert("Login successful");
    navigateTo("/");
  } catch (error) {
    alert(error.message);
  }
};
</script>
