<template>
  

<h1 class="text-3xl font-bold text-center text-gray-800 dark:text-white my-6 border-b-4 border-blue-500 pb-2">
  Active Polls
</h1>
<div class="px-10">

  <ul
    class="poll-list mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
  >
    <li
      v-for="poll in polls"
      :key="poll.id"
      class="flex flex-col justify-between p-6 border border-gray-200 rounded-lg shadow-lg bg-white hover:shadow-xl transition-all duration-300"
    >
      <h3 class="text-xl font-semibold text-center mb-4">{{ poll.title }}</h3>

      <!-- Display poll options -->
      <!-- <ul class="space-y-2 text-gray-700">
        <li v-for="(option, index) in poll.options" :key="index" class="text-sm">
          - {{ option }}
        </li>
      </ul> -->
      <ul class="space-y-2 text-gray-700">
        <li
          v-for="(option, index) in poll.options"
          :key="index"
          class="text-sm flex justify-between items-center"
        >
          <!-- <span>- {{ option }}</span>

          <button
            v-if="!poll.votedUsers?.[userId]"
            @click="handleVote(poll.id, option)"
            class="py-1 px-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all text-xs"
          >
            Vote
          </button> -->

          <label class="flex items-center space-x-2">
            <input
              type="radio"
              :name="'poll-' + poll.id"
              :value="option"
              v-model="selectedOptions[poll.id]"
              :disabled="poll.votedUsers?.[userId] && !poll.isUpdating"
              class="form-radio h-4 w-4 text-blue-600"
            />
            <span>- {{ option }}</span>
          </label>
        </li>
      </ul>

      <!-- <div  class="flex justify-between">
      <button class="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all">
        Vote Now
      </button>
      <button :disabled="true" class="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all">
        Update Now
      </button>

     </div>
      -->

  
      <div class="flex justify-between mt-4">
        <button
          @click="submitVote(poll.id)"
          :disabled="
            !selectedOptions[poll.id] ||
            (poll.votedUsers?.[userId] && !poll.isUpdating)
          "
          class="py-2 px-4 text-white rounded-lg  transition-all"
        
          :class="{
            'bg-blue-500':
              !selectedOptions[poll.id] &&
              (poll.votedUsers?.[userId] || !poll.isUpdating), 
            'bg-slate-500 ':
              selectedOptions[poll.id] ||
              (!poll.votedUsers?.[userId] && poll.isUpdating),
          }"
        >
          Vote Now
        </button>

        <button
          @click="enableUpdate(poll.id)"
          :disabled="!poll.votedUsers?.[userId]"
          class="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
        >
          Update Now
        </button>
      </div>
    </li>
  </ul>
</div>
</template>

<script setup>
import { usePolls } from "~/composables/usePolls";
import { useAuthStore } from "~/store";
import { ref, onMounted } from "vue";

const { getPolls, voteOnPoll } = usePolls();
const authStore = useAuthStore();
const userId = authStore.user?.uid;
const polls = ref([]);
const selectedOptions = ref({}); 

definePageMeta({
  middleware: "auth",
});

// const fetchPolls = async () => {
//   const fetchedPolls = await getPolls(); // 
//   polls.value = fetchedPolls; // 
// };


const fetchPolls = async () => {
  const fetchedPolls = await getPolls();
  const userVotes = {}

  fetchedPolls.forEach((poll) => {
    if (poll.votedUsers?.[userId]) {
      userVotes[poll.id] = poll.votedUsers[userId];
    }
  });

  polls.value = fetchedPolls.map((poll) => ({
    ...poll,
    isUpdating: false,
  }));
  selectedOptions.value = userVotes; 
};

watch(() => authStore.user?.uid, async (newUserId) => {
  userId.value = newUserId;
  await fetchPolls(); 
});

const submitVote = async (pollId) => {
  if (!selectedOptions.value[pollId]) return;

  const selectedOption = selectedOptions.value[pollId];
  const result = await voteOnPoll(pollId, userId, selectedOption);

  if (result?.success || result?.alreadyVoted) {
    await fetchPolls();
  }
};


const enableUpdate = (pollId) => {
  polls.value = polls.value.map((poll) =>
    poll.id === pollId ? { ...poll, isUpdating: true } : poll
  );
};

// const handleVote = async (pollId, selectedOption) => {
//   const result = await voteOnPoll(pollId, userId, selectedOption);
//   if (result?.success || result?.alreadyVoted) {
//     await fetchPolls();
//   }
// };
onMounted(fetchPolls);
</script>
