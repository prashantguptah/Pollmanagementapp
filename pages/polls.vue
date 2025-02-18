<template>
  <ul class="poll-list mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
    <li
      v-for="poll in polls"
      :key="poll.id"
      class="flex flex-col  justify-between p-6 border border-gray-200 rounded-lg shadow-lg bg-white hover:shadow-xl transition-all duration-300"
    >




      <h3 class="text-xl font-semibold text-center mb-4">{{ poll.title }}</h3>

      <!-- Display poll options -->
      <ul class="space-y-2 text-gray-700">
        <li v-for="(option, index) in poll.options" :key="index" class="text-sm">
          - {{ option }} 
        </li>
      </ul>

      <!-- Button to vote -->
      <button class="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all">
        Vote Now
      </button>
    </li>
  </ul>
</template>

<script setup>
import { usePolls } from "~/composables/usePolls";

const { getPolls } = usePolls();
const polls = ref([]);

const fetchPolls = async () => {
  const fetchedPolls = await getPolls(); // ✅ Use `await`
  polls.value = fetchedPolls; // ✅ Ensure polls update properly
};
onMounted(fetchPolls);
</script>
