<template>
  <div class="admin-dashboard">
    <h2 class="text-3xl font-semibold mb-4">Admin Dashboard</h2>

    <div>
      <!-- Create Poll Button -->
      <UButton @click="showPollForm = true" color="blue" size="lg">
        Create Poll
      </UButton>
      <div
        v-if="loading"
        class="flex justify-center items-center min-h-[200px]"
      >
        <USkeleton class="w-16 h-1 bg-blue-500 animate-spin origin-center" />
      </div>

      <!-- Poll Creation Modal -->
      <UModal v-model="showPollForm">
        <UCard class="w-full">
          <template #header>
            <h3 class="text-xl font-semibold">Create a Poll</h3>
          </template>

          <UInput
            v-model="pollTitle"
            placeholder="Poll Title"
            size="lg"
            class="mb-4"
          />

          <div
            v-for="(option, index) in pollOptions"
            :key="index"
            class="flex mb-2"
          >
            <UInput
              v-model="pollOptions[index]"
              placeholder="Option"
              size="lg"
              class="mr-2"
              @focus="addOptionIfNeeded(index)"
             
            />
            <UButton variant="link" color="red" @click="removeOption(index)"
              >X</UButton
            >
          </div>

          <UButton @click="addOption" color="green" block class="mb-4">
            Add Option
          </UButton>

          <div class="flex justify-between"> 
            <UButton @click="handleCreatePoll" color="blue">Save Poll</UButton>
            <UButton @click="closeModal" color="gray">Cancel</UButton>
          </div>
        </UCard>
      </UModal>

      <!-- Edit Poll Modal -->
      <UModal v-model="showEditForm">
        <UCard class="w-full">
          <template #header>
            <h3 class="text-xl font-semibold">Edit Poll</h3>
          </template>

          <UInput
            v-model="editPollData.title"
            placeholder="Poll Title"
            size="lg"
            class="mb-4"
          />

          <div
            v-for="(option, index) in editPollData.options"
            :key="index"
            class="flex mb-2"
          >
            <UInput
              v-model="editPollData.options[index]"
              placeholder="Option"
              size="lg"
              class="mr-2"
            />
            <UButton variant="link" color="red" @click="removeEditOption(index)"
              >X</UButton
            >
          </div>

          <UButton @click="addEditOption" color="green" block class="mb-4">
            Add Option
          </UButton>

          <div class="flex justify-between">
            <UButton @click="handleUpdatePoll" color="blue"
              >Save Changes</UButton
            >
            <UButton @click="closeEditModal" color="gray">Cancel</UButton>
          </div>
        </UCard>
      </UModal>

      <!-- Poll List -->
      <UContainer>
        <div
          class="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-5"
        >
          <UCard v-for="poll in polls" :key="poll.id" >
            <template #header>
              <h3 class="text-xl font-semibold !text-center">
                {{ poll.title }}
              </h3>
            </template>

            <ul class="space-y-2 text-muted">
              <li
                v-for="(option, index) in poll.options"
                :key="index"
                class="text-sm flex justify-between"
              >
                <span> - {{ option }}</span>
                <span class="text-xs font-bold"
                  >{{ poll.votes?.[option] || 0 }} votes</span
                >
              </li>
            </ul>

            <template #footer>
              <div class="flex justify-between items-center">
                <UButton
                  @click="editPoll(poll)"
                  size="sm"
                  color="blue"
                  :ui="{
                    base: 'bg-indigo-600 text-white px-4 py-2 rounded-md border border-indigo-700 hover:bg-indigo-700 hover:text-black',
                  }"
                >
                  Edit
                </UButton>

                <UButton
                  @click="deletePollHandler(poll.id)"
                  size="sm"
                  color="red"
                  :ui="{
                    base: 'bg-red-600 text-white px-4 py-2 rounded-md border border-red-700 hover:bg-red-700 hover:text-black',
                  }"
                >
                  Delete Poll
                </UButton>
              </div>
            </template>
          </UCard>
        </div>
      </UContainer>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { usePolls } from "~/composables/usePolls";
import { useAuthStore } from "~/store";

const { createPoll, getPolls, deletePoll, updatePoll } = usePolls();
const authStore = useAuthStore();

const pollTitle = ref("");
const pollOptions = ref([""]);
const showPollForm = ref(false);

const polls = ref([]);
const isAdmin = computed(() => authStore.user?.email === "test@test.com");
const loading = ref(true);

definePageMeta({
  middleware: "adminm",
});

const addOption = () =>{
  if (pollOptions.value.length < 4 ) {
    return pollOptions.value.push("");
  }
}
const removeOption = (index) => pollOptions.value.splice(index, 1);
const addOptionIfNeeded = (index) => {
  if (pollOptions.value.length < 4 && index === pollOptions.value.length - 1) {
    pollOptions.value.push("");
  }
};

const handleCreatePoll = async () => {
  // Remove empty options
  const filteredOptions = pollOptions.value.filter(option => option.trim() !== "");

  // Ensure at least two valid options
  if (!pollTitle.value.trim()) {
    alert("Poll title cannot be empty.");
    return;
  }
  if (filteredOptions.length < 2) {
    alert("Poll must have at least two options.");
    return;
  }

  const pollData = { title: pollTitle.value, options: filteredOptions };
  await createPoll(pollData);

  // Reset form
  pollTitle.value = "";
  pollOptions.value = [""];

  await fetchPolls();
};


const fetchPolls = async () => {
  const fetchedPolls = await getPolls();
  polls.value = fetchedPolls;
  loading.value = false;
};

const deletePollHandler = async (id) => {
  await deletePoll(id);
  await fetchPolls();
};
const closeModal = () => {
  showPollForm.value = false;
};

// for edit modal
const showEditForm = ref(false);
const editPollData = ref({ id: "", title: "", options: [] });

//  Open Edit Modal
const editPoll = (poll) => {
  editPollData.value = { ...poll };
  showEditForm.value = true;
};

// Handle Updating Poll
const handleUpdatePoll = async () => {
  await updatePoll(editPollData.value.id, {
    title: editPollData.value.title,
    options: editPollData.value.options,
  });
  showEditForm.value = false;
  await fetchPolls();
};

//  Close Edit Modal
const closeEditModal = () => {
  showEditForm.value = false;
};

//  Add & Remove Edit Options
const addEditOption = () => editPollData.value.options.push("");

const removeEditOption = (index) => editPollData.value.options.splice(index, 1);

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
