<template>
  <UContainer>
    <h1
      class="text-4xl font-extrabold text-center my-6 border-b-4 border-blue-500 pb-3"
    >
      Active Polls
    </h1>
 <div
        v-if="loading"
        class="flex justify-center items-center min-h-[200px]"
      >
        <USkeleton class="w-16 h-1 bg-blue-500 animate-spin origin-center" />
      </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <UCard
        v-for="poll in polls"
        :key="poll.id"
        class="flex flex-col justify-between shadow-lg rounded-xl border border-gray-200 bg-white hover:scale-105 transition-transform"
      >
        <template #header>
          <h3 class="text-lg font-semibold text-center text-black">
            {{ poll.title }}
          </h3>
        </template>

        <template #default>
          <ul class="space-y-3 p-2">
            <li
              v-for="(option, index) in poll.options"
              :key="index"
              class="flex gap-3 items-center"
            >
              <URadio
                :name="'poll-' + poll.id"
                :value="option"
                v-model="selectedOptions[poll.id]"
                :disabled="poll.votedUsers?.[userId] && !poll.isUpdating"
                color="blue"
                class="hover:scale-110 transition-transform"
              />
              <span class="text-gray-700">{{ option }}</span>
            </li>
          </ul>
        </template>

        <template #footer>
          <div class="flex justify-between p-2">
            <UButton
              @click="submitVote(poll.id)"
              :disabled="!selectedOptions[poll.id] || (poll.votedUsers?.[userId] && !poll.isUpdating)"
              :color="selectedOptions[poll.id] ? 'blue' : 'gray'"
              class="px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
              :loading="isSaving[poll.id] || false" 
            >
              Vote Now
            </UButton>

            <UButton
              @click="enableUpdate(poll.id)"
              :disabled="!poll.votedUsers?.[userId]"
              color="green"
              class="px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              Update Vote
            </UButton>
          </div>
        </template>
      </UCard>
    </div>
  </UContainer>
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
const loading = ref(true);
const isSaving = ref({});

definePageMeta({
  middleware: "auth",
});

// const fetchPolls = async () => {
//   const fetchedPolls = await getPolls(); //
//   polls.value = fetchedPolls; //
// };

const fetchPolls = async () => {
  const fetchedPolls = await getPolls();
  const userVotes = {};

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
  loading.value = false;
};

watch(
  () => authStore.user?.uid,
  async (newUserId) => {
    userId.value = newUserId;
    await fetchPolls();
  }
);




const submitVote = async (pollId) => {
  if (!selectedOptions.value[pollId]) return;
  
  isSaving.value = { ...isSaving.value, [pollId]: true }; 

  const selectedOption = selectedOptions.value[pollId];
  const result = await voteOnPoll(pollId, userId, selectedOption);

  isSaving.value = { ...isSaving.value, [pollId]: false };

  isSaving.value = false;
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
