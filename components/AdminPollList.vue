<template>
    <UContainer>
      <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-6">
        <UCard
          v-for="poll in polls"
          :key="poll.id"
          class="shadow-lg border border-gray-200"
        >
          <template #header>
            <h3 class="text-xl font-semibold text-center text-black">
              {{ poll.title }}
            </h3>
          </template>
  
          <ul class="space-y-2 text-gray-600">
            <li
              v-for="(option, index) in poll.options"
              :key="index"
              class="text-sm bg-gray-100 px-3 py-2 rounded-md"
            >
              <div class="flex justify-between items-center">
                <span>{{ option }}</span>
                <span class="text-xs font-bold text-blue-600">
                  {{ poll.votes?.[option] || 0 }} votes
                </span>
              </div>
  
              <UProgress
                :value="getVotePercentage(poll, option)"
                size="sm"
                color="blue"
                class="mt-2"
              />
            </li>
          </ul>
  
          <template #footer>
            <div class="flex justify-between items-center">
              <UButton
                @click="$emit('edit', poll)"
                size="sm"
                color="primary"
                class="bg-blue-500 text-white border border-blue-500 hover:bg-blue-700"
              >
                Edit
              </UButton>
  
              <UButton
                @click="$emit('delete', poll.id)"
                size="sm"
                color="red"
                class="bg-red-600 text-white border border-red-700 hover:bg-red-700"
              >
                Delete Poll
              </UButton>
            </div>
          </template>
        </UCard>
      </div>
    </UContainer>
  </template>
  
  <script setup>
  import { defineProps } from "vue";
  
  defineProps({
    polls: Array,
  });
  
  const getVotePercentage = (poll, option) => {
    const totalVotes = Object.values(poll.votes || {}).reduce(
      (sum, count) => sum + count,
      0
    );
    return totalVotes > 0 ? ((poll.votes?.[option] || 0) / totalVotes) * 100 : 0;
  };
  </script>
  