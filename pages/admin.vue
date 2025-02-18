<template>
  <div class="admin-dashboard">
    <h2 class="text-3xl font-semibold mb-4">Admin Dashboard</h2>

    <!-- Show Create Poll Button only if user is admin -->
    <div v-if="isAdmin">
      <button
        @click="showPollForm = !showPollForm"
        class="mb-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        Create Poll
      </button>

      <!-- Poll creation form -->
      <div
        v-if="showPollForm"
        class="poll-form p-6 bg-white rounded-lg shadow-md mb-6"
      >
        <h3 class="text-xl font-semibold mb-4">Create a Poll</h3>
        <input
          v-model="pollTitle"
          placeholder="Poll Title"
          class="mb-4 p-2 w-full border border-gray-300 rounded-md"
        />

        <div
          v-for="(option, index) in pollOptions"
          :key="index"
          class="flex mb-2"
        >
          <input
            v-model="pollOptions[index]"
            placeholder="Option"
            class="p-2 w-full border border-gray-300 rounded-md mr-2"
          />
          <button @click="removeOption(index)" class="text-red-500">X</button>
        </div>

        <button
          @click="addOption"
          class="mb-4 text-white bg-green-600 px-4 py-2 rounded-md hover:bg-green-700"
        >
          Add Option
        </button>

        <button
          @click="handleCreatePoll"
          class="text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Save Poll
        </button>
      </div>

      <!-- Poll List -->
      <ul class="poll-list mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 w-[800px]">
    <li
      v-for="poll in polls"
      :key="poll.id"
      class="flex flex-col p-6 border border-gray-200 rounded-lg shadow-lg bg-white hover:shadow-xl transition-all duration-300"
    >
      <h3 class="text-xl font-semibold text-center mb-4">{{ poll.title }}</h3>

      <!-- Display poll options -->
      <ul class="space-y-2 text-gray-700">
        <li v-for="(option, index) in poll.options" :key="index" class="text-sm">
          - {{ option }}
        </li>
      </ul>

      <!-- Edit and Delete Buttons -->
      <div class="mt-4 flex justify-between">
        <button
          @click="editPoll(poll)"
          class="text-yellow-500 hover:underline text-sm"
        >
          Edit
        </button>
        <button
          @click="deletePollHandler(poll.id)"
          class="text-red-500 hover:underline text-sm"
        >
          Delete Poll
        </button>
      </div>
    </li>
  </ul>
    </div>

    <!-- If not admin -->
    <div v-else>
      <p>You are not an admin.</p>
    </div>
  </div>
</template>

<script setup>


import { ref } from "vue";
import { usePolls } from "~/composables/usePolls";
import { useAuthStore } from "~/store";


const { createPoll, getPolls, deletePoll } = usePolls();
const authStore = useAuthStore();

// Poll data
const pollTitle = ref("");
const pollOptions = ref([""]);
const showPollForm = ref(false);

const polls = ref([]);
const isAdmin = computed(() => authStore.user?.email === "test@test.com");

definePageMeta({
  middleware: "auth", 
});

const addOption = () => pollOptions.value.push("");
const removeOption = (index) => pollOptions.value.splice(index, 1);

const handleCreatePoll = async () => {
  const pollData = { title: pollTitle.value, options: pollOptions.value };
  await createPoll(pollData);
  pollTitle.value = "";
  pollOptions.value = [""];
  await fetchPolls(); // ✅ Refresh list after poll creation
};

const fetchPolls = async () => {
  const fetchedPolls = await getPolls(); // ✅ Use `await`
  polls.value = fetchedPolls; // ✅ Ensure polls update properly
};

const deletePollHandler = async (id) => {
  await deletePoll(id);
  await fetchPolls(); // ✅ Refresh list after deletion
};

// On mount or when the form is toggled, fetch the polls
onMounted(fetchPolls);
</script>

<style scoped>
.admin-dashboard {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.poll-form input {
  margin-bottom: 10px;
}

.poll-list li {
  display: flex;
  justify-content: space-between;
}

button {
  cursor: pointer;
}
</style>
