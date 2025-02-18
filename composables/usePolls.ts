import { ref } from "vue";
import { useNuxtApp } from "#app";
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs ,getDoc } from "firebase/firestore";

export const usePolls = () => {
  const { $db } = useNuxtApp();
  const polls = ref([]);

  // ✅ Fix: Ensure getPolls returns data properly
  const getPolls = async () => {
    try {
      const snapshot = await getDocs(collection($db, "polls"));
      const fetchedPolls = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      polls.value = fetchedPolls;  // ✅ Update ref properly
      return fetchedPolls;  // ✅ Always return fetched data
    } catch (error) {
      console.error("Error fetching polls:", error);
      return []; // Return empty array on failure
    }
  };

  const createPoll = async (poll) => {
    await addDoc(collection($db, "polls"), poll);
    return await getPolls(); // ✅ Fetch updated polls after creation
  };


  const updatePoll = async (id, updatedPoll) => {
    try {
      const pollRef = doc($db, "polls", id);
      await updateDoc(pollRef, updatedPoll);
      return await getPolls(); // Refresh polls after update
    } catch (error) {
      console.error("Error updating poll:", error);
    }
  };
  

  const deletePoll = async (id) => { // ✅ Fix function name to `deletePoll`
    await deleteDoc(doc($db, "polls", id));
    return await getPolls(); // ✅ Fetch updated polls after deletion
  };
   // Voting function
   const voteOnPoll = async (pollId, userId, selectedOption) => {
    const pollRef = doc($db, "polls", pollId);

    try {
      const pollSnapshot = await getDoc(pollRef);
      if (!pollSnapshot.exists()) return console.error("Poll not found");

      const pollData = pollSnapshot.data();
      const votes = pollData.votes || {};
      const votedUsers = pollData.votedUsers || {};

      // If user has already voted, prevent re-voting
      if (votedUsers[userId]) {
        console.warn("User has already voted on this poll.");
        return { alreadyVoted: true };
      }

      // Update votes count
      votes[selectedOption] = (votes[selectedOption] || 0) + 1;
      votedUsers[userId] = selectedOption;

      await updateDoc(pollRef, { votes, votedUsers });

      return { success: true };
    } catch (error) {
      console.error("Error voting on poll:", error);
      return { error };
    }
  };

  

  return { polls, getPolls, createPoll, updatePoll, deletePoll, voteOnPoll }; // ✅ Ensure correct function names
};
