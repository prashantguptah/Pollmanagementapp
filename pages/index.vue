<template>
  <div>
    <!-- Welcome Section -->
    <UContainer class="text-center py-12 bg-blue-500 text-white">
      <h1 class="text-4xl font-bold mb-4">Welcome to the Poll Management App</h1>
      <p class="text-xl mb-8">Create, vote, and manage polls easily. Whether you're an admin or a user, you'll find it simple to interact with polls.</p>
    </UContainer>

    <!-- Features Section -->
    <UContainer class="py-12">
      <h2 class="text-3xl font-semibold text-center mb-6">Features</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <UCard v-for="feature in features" :key="feature.title" class="p-6">
          <template #header>
            <h3 class="text-xl font-semibold">{{ feature?.title }}</h3>
          </template>
          <p class="text-gray-700">{{ feature.description }}</p>
        </UCard>
      </div>
    </UContainer>

    <!-- How It Works Section -->
    <UContainer class="bg-gray-100 py-12 text-center">
      <h2 class="text-3xl font-semibold mb-6">How It Works</h2>
      <p class="text-lg mb-8">Learn how to create and participate in polls with ease.</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <UCard v-for="step in steps" :key="step.title" class="p-6">
          <template #header>
            <h3 class="text-xl font-semibold">{{ step.title }}</h3>
          </template>
          <p class="text-gray-700">{{ step.description }}</p>
        </UCard>
      </div>
    </UContainer>

    <!-- Call to Action -->
    <UContainer class="text-center py-12 bg-blue-500 text-white">
      <h2 class="text-3xl font-semibold mb-4">Ready to Get Started?</h2>
      <p class="text-lg mb-8">Walk around to create or participate in polls.</p>
    </UContainer>
  </div>
</template>

<script setup>
import { ref } from "vue";

const features = ref([
  { title: "Create Polls", description: "Admins can create polls with multiple options and view results in real-time." },
  { title: "Vote on Polls", description: "Users can vote on available polls and change their vote if they wish." },
  { title: "Admin Management", description: "Admins can manage polls, including editing, deleting, and adding options." }
]);

const steps = ref([
  { title: "Step 1: Sign In", description: "Sign in with your credentials to access your account and start interacting with polls." },
  { title: "Step 2: Create or Vote", description: "Admins can create polls, and users can vote on existing polls." },
  { title: "Step 3: Manage Polls", description: "Admins can view, edit, and delete polls, while users can track results and vote again if needed." }
]);
</script>
