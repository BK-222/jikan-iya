import { defineStore } from 'pinia';
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
    try {
      const response = await $fetch('/api/profile');
      completedAnime.value = response.completed;
      plannedAnime.value = response.planned;
    } catch (error) {
      console.error('Profile fetch error:', error);
    }
  }

  const addCompletedAnime = async function(anime) {
    try {
      await $fetch('/api/profile/add-completed', {
        method: 'POST',
        body: { anime }
      });
      completedAnime.value.push(anime);
    } catch (error) {
      console.error('Error adding anime:', error);
    }
  }

  const addPlannedAnime = async function(anime) {
    try {
      await $fetch('/api/profile/add-planned', {
        method: 'POST',
        body: { anime }
      });
      completedAnime.value.push(anime); // Same optimistic update
    } catch (error) {
      console.error('Error adding anime:', error);
    }
  }

  const removeCompletedAnime = async function(anime) {
    try {
      await $fetch('/api/profile/remove-completed', {
        method: 'DELETE',
        body: { id: anime.id }
      });
      completedAnime.value = completedAnime.value.filter(a => a.id !== anime.id);
    } catch (error) {
      console.error('Remove failed:', error);
    }
  }

  const removePlannedAnime = async function(anime) {
    try {
      await $fetch('/api/profile/remove-planned', {
        method: 'DELETE',
        body: { id: anime.id }
      });
      plannedAnime.value = plannedAnime.value.filter(a => a.id !== anime.id);
    } catch (error) {
      console.error('Remove failed:', error);
    }
  }

  return { completedAnime, plannedAnime, getCompletedAnime, 
    getPlannedAnime, fetchProfile, addCompletedAnime, addPlannedAnime, 
    removeCompletedAnime, removePlannedAnime };
});

export default useProfileStore;