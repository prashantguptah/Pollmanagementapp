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
            class="mb-4 newinput"
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
              class="mr-2 poll-option-input w-80"
              :ref="(el) => (pollOptionInputs[index] = el)"
              @keydown.enter.prevent="addOptionIfRequire(index, false)"
            />
            <UButton variant="link" color="red" @click="removeOption(index)"
              >   <UIcon name="i-heroicons-trash" class="w-6 h-6 text-red-500" /></UButton
            >
          </div>

          <UButton @click="addOption" color="green" block class="mb-4">
            Add Option
          </UButton>

          <div class="flex justify-between">
            <UButton @click="handleCreatePoll" color="blue" :loading="isSaving">
              Save Poll</UButton>
            <UButton @click="closeModal" color="gray">Cancel</UButton>
          </div>
        </UCard>
      </UModal>

      <!-- Edit Poll Modal                -->
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
              class="mr-2 poll-option-input w-80"
              :ref="(el) => (pollOptionInputs[index] = el)"
              @keydown.enter.prevent="addOptionIfRequire(index, true)"
            />
            <UButton variant="link" color="red" @click="removeEditOption(index)"
              ><UIcon name="i-heroicons-trash" class="w-6 h-6 text-red-500" /></UButton
            >
          </div>

          <UButton @click="addEditOption" color="green" block class="mb-4">
            Add Option
          </UButton>

          <div class="flex justify-between">
            <UButton @click="handleUpdatePoll" color="blue"
            :loading="isSaving" >Save Changes</UButton
            >
            <UButton @click="closeEditModal" color="gray">Cancel</UButton>
          </div>
        </UCard>
      </UModal>

      <!-- Poll List -->
      <UContainer>
        <div
          class="grid sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto mt-5"
        >
          <UCard v-for="poll in polls" :key="poll.id">
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
import { nextTick } from "vue";

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




// create option and also manage focus
const addOption = async () => {
  pollOptions.value.push("");
  await nextTick();

  const inputs = document.querySelectorAll(".poll-option-input input");
  if (inputs.length > 0) {
    inputs[inputs.length - 1].focus();
  }
};

const removeOption = (index) => pollOptions.value.splice(index, 1);


// create and change option when click on enter
const pollOptionInputs = ref([]);
const addOptionIfRequire = async (index, isEdit = false) => {
  const optionsList = isEdit ? editPollData.value.options : pollOptions.value;
  const inputsList = pollOptionInputs.value;

  if (index === optionsList.length - 1) {
    optionsList.push("");
    await nextTick();

    const nextInput = inputsList[index + 1]?.$el?.querySelector("input");
    if (nextInput) {
      nextInput.focus();
    }
  }
};



// main handler for creating Polls

const isSaving = ref(false);

const handleCreatePoll = async () => {
  const filteredOptions = pollOptions.value.filter(
    (option) => option.trim() !== ""
  );

  if (!pollTitle.value.trim()) {
    alert("Poll title cannot be empty.");
    return;
  }
  if (filteredOptions.length < 2) {
    alert("Poll must have at least two options.");
    return;
  }

isSaving.value = true;
 

  try {
    const pollData = { title: pollTitle.value, options: filteredOptions };
    await createPoll(pollData);

    pollTitle.value = "";
    pollOptions.value = [""];
    await fetchPolls();
  } catch (error) {
    console.error("Error creating poll:", error);
  } finally {
    isSaving.value = false; 
  }
};


//  for fetching the poll/s
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

const originalPollData = ref({ id: "", title: "", options: [] });

// using JSON functions due to vue's reactivity, to make deep copy of data
const editPoll = (poll) => {
  originalPollData.value = JSON.parse(JSON.stringify(poll));
  editPollData.value = JSON.parse(JSON.stringify(poll));
  showEditForm.value = true;
};



// handling update button and also filtering blank option


const handleUpdatePoll = async () => {
  const filteredOptions = editPollData.value.options
    .map((option) => option.trim())
    .filter((option) => option !== "");

  if (!editPollData.value.title.trim()) {
    alert("Poll title cannot be empty!");
    return;
  }
  if (filteredOptions.length < 2) {
    alert("Poll must have at least two valid options!");
    return;
  }

  isSaving.value = true;
   try{
    await updatePoll(editPollData.value.id, {
    title: editPollData.value.title.trim(),
    options: filteredOptions,
  });
   }catch(error){
    console.log("Error creating poll:", error)
   }finally{
    isSaving.value = false
   }


  showEditForm.value = false;
  await fetchPolls();
};

//  Close Edit Modal
const closeEditModal = () => {
  editPollData.value = JSON.parse(JSON.stringify(originalPollData.value));
  showEditForm.value = false;
};



// adding edit Poll options and changing focus
const addEditOption = async () => {
  editPollData.value.options.push("");
  await nextTick();

  const nextInput =
    pollOptionInputs.value[
      editPollData.value.options.length - 1
    ]?.$el?.querySelector("input");
  if (nextInput) {
    nextInput.focus();
  }
};

const removeEditOption = (index) => editPollData.value.options.splice(index, 1);

onMounted(fetchPolls);
</script>

<style scoped>
.admin-dashboard {
  max-width: 900px;
  margin: 0 auto;
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
