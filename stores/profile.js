import { defineStore } from 'pinia';
import { collection, doc, getDocs, setDoc, deleteDoc } from 'firebase/firestore';
import useAuthenticationStore from '~/stores/auth';

const useProfileStore = defineStore('profile', () => {
  const { $firestore } = useNuxtApp();
  const authStore = useAuthenticationStore();

  const completedAnime = ref([]);
  const plannedAnime = ref([]);

  const getCompletedAnime = computed(() => {
    return completedAnime.value;
  });
  const getPlannedAnime = computed(() => {
    return plannedAnime.value;
  });

  const fetchProfile = async function() {
    const userId = authStore.getUserId;
    try {
      const completedRef = collection($firestore, `users/${userId}/completed_anime`);
      const completedSnapshot = await getDocs(completedRef);
      completedAnime.value = completedSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      
      const plannedRef = collection($firestore, `users/${userId}/planned_anime`);
      const plannedSnapshot = await getDocs(plannedRef);
      plannedAnime.value = plannedSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  }

  const addCompletedAnime = async function(anime) {
    const userId = authStore.getUserId;
    if (!userId) {
      console.error('User ID not available!');
      return;
    }
    try {
      await setDoc(doc($firestore, `users/${userId}/completed_anime/${anime.id}`), anime);
      console.log('Anime successfully added to completed list!');
      completedAnime.value.push(anime);
    } catch (error) {
      console.error('Error adding anime to completed:', error);
    }
  }

  const addPlannedAnime = async function(anime) {
    const userId = authStore.getUserId;
    if (!userId) {
      console.error('User ID not available!');
      return;
    }
    try {
      await setDoc(doc($firestore, `users/${userId}/planned_anime`, anime.id.toString()), anime);
      plannedAnime.value.push(anime);    
    } catch (error) {
      console.error('Error adding anime to planned:', error);
    }
  }

  const removeCompletedAnime = async function(anime) {
    const userId = authStore.getUserId;
    if (!userId) {
      console.error('User ID not available!');
      return;
    }
    try {
      await deleteDoc(doc($firestore, `users/${userId}/completed_anime/${anime.id}`));
      completedAnime.value = completedAnime.value.filter(anime => anime.id !== anime.id);
    } catch (error) {
      console.error('Error removing anime from completed:', error);
    }
  }

  const removePlannedAnime = async function(anime) {
    const userId = authStore.getUserId;
    if (!userId) {
      console.error('User ID not available!');
      return;
    }
    try {
      await deleteDoc(doc($firestore, `users/${userId}/planned_anime/${anime.id}`));
      plannedAnime.value = plannedAnime.value.filter(anime => anime.id !== anime.id);
    } catch (error) {
      console.error('Error removing anime from planned:', error);
    }
  }

  // const clearState = () => {
  //   completedAnime.value = [];
  //   plannedAnime.value = [];
  // };


  return { completedAnime, plannedAnime, getCompletedAnime, 
    getPlannedAnime, fetchProfile, addCompletedAnime, addPlannedAnime, 
    removeCompletedAnime, removePlannedAnime };
});

export default useProfileStore;