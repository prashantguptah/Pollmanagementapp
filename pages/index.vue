
  <template>
  <div class="home-page">
    <div class="welcome-section text-center py-12 bg-indigo-600 text-white">
      <h1 class="text-4xl font-bold mb-4">Welcome to the Poll Management App</h1>
      <p class="text-xl mb-8">Create, vote, and manage polls easily. Whether you're an admin or a user, you'll find it simple to interact with polls.</p>
      <router-link to="/polls" class="bg-white text-indigo-600 px-6 py-2 rounded-md text-lg hover:bg-indigo-100">
        View Polls
      </router-link>
    </div>

    <div class="features-section py-12">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-semibold text-center mb-6">Features</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="feature-card p-6 bg-white rounded-lg shadow-md">
            <h3 class="text-xl font-semibold mb-4">Create Polls</h3>
            <p class="text-gray-700">Admins can create polls with multiple options and view the results in real-time.</p>
          </div>
          <div class="feature-card p-6 bg-white rounded-lg shadow-md">
            <h3 class="text-xl font-semibold mb-4">Vote on Polls</h3>
            <p class="text-gray-700">Users can vote on available polls and change their vote if they wish.</p>
          </div>
          <div class="feature-card p-6 bg-white rounded-lg shadow-md">
            <h3 class="text-xl font-semibold mb-4">Admin Management</h3>
            <p class="text-gray-700">Admins can manage polls, including editing, deleting, and adding options.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="how-it-works-section bg-gray-100 py-12">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-3xl font-semibold mb-6">How It Works</h2>
        <p class="text-lg mb-8">Learn how to create and participate in polls with ease.</p>
        <div class="steps grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="step-card p-6 bg-white rounded-lg shadow-md">
            <h3 class="text-xl font-semibold mb-4">Step 1: Sign In</h3>
            <p class="text-gray-700">Sign in with your credentials to access your account and start interacting with polls.</p>
          </div>
          <div class="step-card p-6 bg-white rounded-lg shadow-md">
            <h3 class="text-xl font-semibold mb-4">Step 2: Create or Vote</h3>
            <p class="text-gray-700">Admins can create polls, and users can vote on existing polls.</p>
          </div>
          <div class="step-card p-6 bg-white rounded-lg shadow-md">
            <h3 class="text-xl font-semibold mb-4">Step 3: Manage Polls</h3>
            <p class="text-gray-700">Admins can view, edit, and delete polls, while users can track results and vote again if needed.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="cta-section text-center py-12 bg-indigo-600 text-white">
      <h2 class="text-3xl font-semibold mb-4">Ready to Get Started?</h2>
      <p class="text-lg mb-8">Sign in now to create or participate in polls.</p>
      <router-link to="/login" class="bg-white text-indigo-600 px-6 py-2 rounded-md text-lg hover:bg-indigo-100">
        Sign In
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
</script>

<style scoped>
.home-page {
  font-family: 'Arial', sans-serif;
}

.feature-card,
.step-card {
  transition: transform 0.3s ease-in-out;
}

.feature-card:hover,
.step-card:hover {
  transform: translateY(-10px);
}

.bg-indigo-600 {
  background-color: #4f46e5;
}

.bg-indigo-100 {
  background-color: #e0e7ff;
}

.container {
  max-width: 1200px;
}
</style>

   
