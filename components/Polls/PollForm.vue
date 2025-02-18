<script setup>
import { ref, onMounted } from 'vue'
import { usePolls } from '~/composables/usePolls'
import { useRoute, useRouter } from 'vue-router'

const { createPoll, updatePoll, getPollById } = usePolls()
const title = ref('')
const options = ref([''])
const route = useRoute()
const router = useRouter()

// Get the pollId from the route params if editing an existing poll
const pollId = route.params.id || null
const loading = ref(false)
const error = ref(null)

// Fetch poll data if in edit mode
onMounted(async () => {
  if (pollId) {
    try {
      loading.value = true
      const poll = await getPollById(pollId)
      title.value = poll.title
      options.value = poll.options
    } catch (err) {
      error.value = 'Error fetching poll data: ' + err.message
    } finally {
      loading.value = false
    }
  }
})

const addOption = () => options.value.push('')
const removeOption = (index) => options.value.splice(index, 1)

const handleCreatePoll = async () => {
  const pollData = { title: title.value, options: options.value }

  try {
    if (pollId) {
      await updatePoll(pollId, pollData)
    } else {
      await createPoll(pollData)
    }

    // Redirect back to the admin dashboard after creation/edit
    router.push('/admin')
  } catch (err) {
    error.value = 'Error saving poll: ' + err.message
  }
}
</script>

<template>
  <div>
    <div v-if="loading">Loading poll...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <input v-model="title" placeholder="Poll Title" />
    <div v-for="(option, index) in options" :key="index">
      <input v-model="options[index]" placeholder="Option" />
      <button @click="removeOption(index)">X</button>
    </div>
    <button @click="addOption">Add Option</button>
    <button @click="handleCreatePoll">Save Poll</button>
  </div>
</template>
