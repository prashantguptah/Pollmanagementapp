<template>
  <div class="flex justify-center items-center min-h-screen bg-indigo-600">
    <UCard class="w-full max-w-md p-6">
      <template #header>
        <h1 class="text-2xl font-semibold text-center text-primary">Signup</h1>
      </template>
      <UFormGroup label="Enter email" name="email" required>
        <UInput
          v-model="email"
          type="email"
          placeholder="Email"
          size="lg"
          class="mb-4"
        />
      </UFormGroup>
      <UFormGroup label="Enter email" name="email" required>
        <UInput
          v-model="password"
          type="password"
          placeholder="Password"
          size="lg"
          class="mb-6"
        />
      </UFormGroup>

      <UButton @click="handleSignup" color="primary" size="lg" block>
        Signup
      </UButton>

      <template #footer>
        <p class="text-center text-muted">
          Already have an account?
          <NuxtLink
            to="/login"
            class="text-primary font-medium hover:underline"
          >
            Login
          </NuxtLink>
        </p>
      </template>
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
