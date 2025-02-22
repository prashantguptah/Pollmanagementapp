<template>
    <UModal v-model="showEditForm">
      <UCard class="w-full">
        <template #header>
          <h3 class="text-xl font-semibold">Edit Poll</h3>
        </template>
  
        <UInput v-model="editPollData.title" placeholder="Poll Title" size="lg" class="mb-4" />
  
        <div v-for="(option, index) in editPollData.options" :key="index" class="flex mb-2">
          <UInput
            v-model="editPollData.options[index]"
            placeholder="Option"
            size="lg"
            class="mr-2 poll-option-input w-[90%]"
          />
          <UButton variant="link" color="red" @click="removeEditOption(index)">
            <UIcon name="i-heroicons-trash" class="w-6 h-6 text-red-500" />
          </UButton>
        </div>
  
        <UButton @click="addEditOption" color="green" block class="mb-4">
          Add Option
        </UButton>
  
        <div class="flex justify-between">
          <UButton @click="handleUpdatePoll" color="blue" :loading="isSaving">
            Save Changes
          </UButton>
          <UButton @click="closeEditModal" color="gray">Cancel</UButton>
        </div>
      </UCard>
    </UModal>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits, nextTick } from "vue";
  
  const props = defineProps(["poll"]);
  const emit = defineEmits(["pollUpdated"]);
  
  const showEditForm = ref(false);
  const isSaving = ref(false);
  const editPollData = ref({ id: "", title: "", options: [] });
  
  const removeEditOption = (index) => editPollData.value.options.splice(index, 1);
  const addEditOption = async () => {
    editPollData.value.options.push("");
    await nextTick();
  };
  
  const handleUpdatePoll = async () => {
    const filteredOptions = editPollData.value.options
      .map((option) => option.trim())
      .filter((option) => option !== "");
  
    if (!editPollData.value.title.trim() || filteredOptions.length < 2) {
      alert("Title and at least two options are required!");
      return;
    }
  
    isSaving.value = true;
    emit("pollUpdated", editPollData.value);
    isSaving.value = false;
    showEditForm.value = false;
  };
  
  const closeEditModal = () => (showEditForm.value = false);
  </script>
  