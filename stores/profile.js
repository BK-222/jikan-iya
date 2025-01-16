import { defineStore } from 'pinia';
import { collection, doc, getDocs, setDoc, addDoc } from 'firebase/firestore';
import useAuthenticationStore from '~/stores/auth';

const useProfileStore = defineStore('profile', () => {
  const completedAnime = ref([]);
  const plannedAnime = ref([]);
  const { $firestore } = useNuxtApp();

  const getCompletedAnime = computed(() => {
    
  });
  const getPlannedAnime = computed(() => {
    
  });

  const fetchProfile = async function() {
    
  }

  const addCompletedAnime = async function(anime) {
    const authStore = useAuthenticationStore();
    const userId = authStore.getUserId;
    if (!userId) {
      console.error('User ID not available!');
      return;
    }
    try {
      await setDoc(doc($firestore, `users/${userId}/completed_anime`, anime.id.toString()), anime);
      console.log('Anime successfully added to completed list!');
      completedAnime.value.push(anime);
    } catch (error) {
      console.error('Error adding anime to completed:', error);
    }
  }

  const addPlannedAnime = async function(anime) {
    const authStore = useAuthenticationStore();
    const userId = authStore.getUserId;
    console.log('Attempting to add anime. User ID:', userId);
    if (!userId) {
      console.error('User ID not available!');
      return;
    }
    await setDoc(doc($firestore, `users/${userId}/planned_anime`, anime.id.toString()), anime);
    plannedAnime.value.push(anime);
  }


  return { completedAnime, plannedAnime, getCompletedAnime, getPlannedAnime, fetchProfile, addCompletedAnime, addPlannedAnime }
});

export default useProfileStore;