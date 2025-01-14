import { defineStore } from 'pinia';

const useProfileStore = defineStore('profile', () => {
  const userId = ref(null);
  const completedAnime = ref([]);
  const plannedAnime = ref([]);

  const getCompletedAnime = computed(() => {
    
  });
  const getPlannedAnime = computed(() => {
    
  });

  const setUserId = function(userId) {
    
  }

  const fetchProfile = async function() {
    
  }

  const addCompletedAnime = async function(anime) {
    
  }

  const addPlannedAnime = async function(anime) {
    
  }


  return { userId, completedAnime, plannedAnime, getCompletedAnime, getPlannedAnime, setUserId, fetchProfile, addCompletedAnime, addPlannedAnime }
});

export default useProfileStore;