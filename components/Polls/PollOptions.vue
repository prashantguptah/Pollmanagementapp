<template>
    <div class="w-[300px] h-auto flex flex-col position: relative;">
      <h4 class="text-md font-semibold">Select an option:</h4>
      <div v-for="(count, option) in poll?.votes" :key="option" class="w-full mt-2">
        <button
          @click="emitVote(option)"
          :disabled="hasVoted"
          class="bg-white text-black mt-2 px-4 py-2 rounded border-2 border-solid disabled:bg-gray-400"
        >
          {{ option }} ({{ count }} votes)
        </button>
      </div>
      <p v-if="hasVoted" class="text-sm text-red-500">You have already voted.</p>
    </div>
  </template>
  
  <script setup>
  import { computed } from "vue";
  
  const props = defineProps({ poll: Object, userId: String });
  const emit = defineEmits(["vote"]);
  
  const hasVoted = computed(() => props.poll?.votedUsers?.includes(props.userId) || false);
  
  const emitVote = (option) => {
    if (!hasVoted.value) {
      emit("vote", option);
    }
  };
  </script>