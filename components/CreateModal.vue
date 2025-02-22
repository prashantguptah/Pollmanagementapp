<template>
    <UModal v-model="show">
      <UCard class="w-full">
        <template #header>
          <h3 class="text-xl font-semibold">Create a Poll</h3>
        </template>
  
        <UInput
          v-model="pollTitle"
          placeholder="Poll Title"
          size="lg"
          class="mb-4 newinput"
          :ui="{ base: 'h-[80px]  whitespace-pre-wrap' }"
        />
  
        <div v-for="(option, index) in pollOptions" :key="index" class="flex mb-2">
          <UInput
            v-model="pollOptions[index]"
            placeholder="Option"
            size="lg"
            class="mr-2 poll-option-input w-[90%]"
            :ref="(el) => (pollOptionInputs[index] = el)"
            @keydown.enter.prevent="addOptionIfRequire(index)"
          />
          <UButton variant="link" color="red" @click="removeOption(index)">
            <UIcon name="i-heroicons-trash" class="w-6 h-6 text-red-500" />
          </UButton>
        </div>
  
        <UButton @click="addOption" color="green" block class="mb-4">
          Add Option
        </UButton>
  
        <div class="flex justify-between">
          <UButton @click="handleCreatePoll" color="blue" :loading="isSaving">
            Save Poll
          </UButton>
          <UButton @click="closeModal" color="gray">Cancel</UButton>
        </div>
      </UCard>
    </UModal>
  </template>
  
  <script setup>
  import { ref, nextTick, defineEmits, defineProps } from "vue";
  
  const props = defineProps({
    show: Boolean, // Controls modal visibility
  });
  
  const emit = defineEmits(["update:show", "pollCreated"]);
  
  const pollTitle = ref("");
  const pollOptions = ref([""]);
  const isSaving = ref(false);
  const pollOptionInputs = ref([]);
  
  // Add option logic
  const addOption = async () => {
    if (!pollOptions.value[pollOptions.value.length - 1].trim()) {
      const inputs = document.querySelectorAll(".poll-option-input input");
      if (inputs.length > 0) inputs[inputs.length - 1].focus();
      return;
    }
    pollOptions.value.push("");
    await nextTick();
    document.querySelectorAll(".poll-option-input input").at(-1)?.focus();
  };
  
  // Remove option
  const removeOption = (index) => pollOptions.value.splice(index, 1);
  
  // Add option when pressing Enter
  const addOptionIfRequire = async (index) => {
    if (!pollOptions.value[index].trim()) return;
  
    if (index === pollOptions.value.length - 1) {
      pollOptions.value.push("");
      await nextTick();
      document.querySelectorAll(".poll-option-input input").at(-1)?.focus();
    }
  };
  
  // Handle Poll Creation
  const handleCreatePoll = async () => {
    const filteredOptions = pollOptions.value.filter((opt) => opt.trim() !== "");
  
    if (!pollTitle.value.trim()) return alert("Poll title cannot be empty.");
    if (filteredOptions.length < 2) return alert("Poll must have at least two options.");
  
    isSaving.value = true;
    emit("pollCreated", { title: pollTitle.value, options: filteredOptions });
    isSaving.value = false;
    closeModal();
  };
  
  // Close modal
  const closeModal = () => {
    emit("update:show", false);
    pollTitle.value = "";
    pollOptions.value = [""];
  };
  </script>
  