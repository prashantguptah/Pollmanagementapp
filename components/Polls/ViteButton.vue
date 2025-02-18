<script setup>
import { ref, watchEffect } from 'vue'
import { usePolls } from '~/composables/usePolls'
import { useAuthStore } from '~/store/auth'

const { votePoll } = usePolls()
const { user } = useAuthStore()

const pollId = defineProps().pollId
const options = defineProps().options
const userVote = ref('')

const handleVote = async (option) => {
  if (!user.value) {
    alert('Please log in to vote!')
    return
  }
  userVote.value = option
  await votePoll(pollId, user.value.uid, option)
}

watchEffect(() => {
  if (user.value) {
    const userVoteInPoll = options.find(option => option === user.value.votes[pollId])
    if (userVoteInPoll) {
      userVote.value = userVoteInPoll
    }
  }
})
</script>

<template>
  <div>
    <div v-for="option in options" :key="option">
      <button :disabled="userVote === option" @click="handleVote(option)">
        {{ option }}
      </button>
    </div>
  </div>
</template>
