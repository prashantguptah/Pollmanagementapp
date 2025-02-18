import { ref } from "vue";
import { useNuxtApp } from "#app";
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs ,getDoc } from "firebase/firestore";

export const usePolls = () => {
  const { $db } = useNuxtApp();
  const polls = ref([]);
  const selectedOptions = ref({});


  const getPolls = async () => {
    try {
      const snapshot = await getDocs(collection($db, "polls"));
      const fetchedPolls = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      polls.value = fetchedPolls;  
      return fetchedPolls; 
    } catch (error) {
      console.error("Error fetching polls:", error);
      return []; 
    }
  };

  const getPollsOptions = async (userId) => {
    try {
      const snapshot = await getDocs(collection($db, "polls"));
      const fetchedPolls = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      // Store user's previous votes
      const userVotes = {};
      fetchedPolls.forEach((poll) => {
        if (poll.votedUsers?.[userId]) {
          userVotes[poll.id] = poll.votedUsers[userId];
        }
      });

      polls.value = fetchedPolls;
      selectedOptions.value = userVotes; 
      return fetchedPolls;
    } catch (error) {
      console.error("Error fetching polls:", error);
      return [];
    }
  };
  const createPoll = async (poll) => {
    await addDoc(collection($db, "polls"), poll);
    return await getPolls(); 
  };


  const updatePoll = async (id, updatedPoll) => {
    try {
      const pollRef = doc($db, "polls", id);
      await updateDoc(pollRef, updatedPoll);
      return await getPolls(); 
    } catch (error) {
      console.error("Error updating poll:", error);
    }
  };
  

  const deletePoll = async (id) => { 
    await deleteDoc(doc($db, "polls", id));
    return await getPolls(); 
  };


   
  const voteOnPoll = async (pollId, userId, selectedOption) => {
    const pollRef = doc($db, "polls", pollId);

    try {
      const pollSnapshot = await getDoc(pollRef);
      if (!pollSnapshot.exists()) return console.error("Poll not found");

      const pollData = pollSnapshot.data();
      const votes = pollData.votes || {};
      const votedUsers = pollData.votedUsers || {};

      // If user previously voted, reduce count for old vote
      if (votedUsers[userId]) {
        const previousVote = votedUsers[userId];
        if (previousVote !== selectedOption) {
          votes[previousVote] = (votes[previousVote] || 1) - 1; // Reduce old vote count
        }
      }

      // Update with new vote
      votes[selectedOption] = (votes[selectedOption] || 0) + 1;
      votedUsers[userId] = selectedOption;

      await updateDoc(pollRef, { votes, votedUsers });

      selectedOptions.value[pollId] = selectedOption;

      return { success: true };
    } catch (error) {
      console.error("Error voting on poll:", error);
      return { error };
    }
  };

  

  return { polls, getPolls, createPoll, updatePoll, deletePoll, voteOnPoll , getPollsOptions}; 
};
