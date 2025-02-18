import { ref } from "vue";
import { useNuxtApp } from "#app";
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from "firebase/firestore";

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
    await updateDoc(doc($db, "polls", id), updatedPoll);
    return await getPolls(); // ✅ Refresh poll list
  };

  const deletePoll = async (id) => { // ✅ Fix function name to `deletePoll`
    await deleteDoc(doc($db, "polls", id));
    return await getPolls(); // ✅ Fetch updated polls after deletion
  };

  return { polls, getPolls, createPoll, updatePoll, deletePoll }; // ✅ Ensure correct function names
};
