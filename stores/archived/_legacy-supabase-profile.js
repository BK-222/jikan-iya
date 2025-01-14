import { defineStore } from 'pinia';

const useProfileStore = defineStore('profile', () => {
  const userId = ref(null);
  const completedAnime = ref([]);
  const plannedAnime = ref([]);

  const getCompletedAnime = computed(() => {
    return completedAnime.value
  });
  const getPlannedAnime = computed(() => {
    return plannedAnime.value
  });

  const setUserId = function(userId) {
    userId.value = userId;
  }

  const fetchProfile = async function() {
    const { $supabase } = useNuxtApp();

    // if (!userId.value) {
    //   console.error('User ID is not set. Cannot fetch profile.');
    //   return;
    // }

    const { data, error } = await $supabase
      .from('profiles')
      .select('completed_anime, planned_anime')
      .eq('user_id', userId.value)
      .single();

    if (data) {
      completedAnime.value = data.completed_anime || [];
      plannedAnime.value = data.planned_anime || [];
    } else {
      console.error('Error fetching profile data:', error);
    }
  }

  const addCompletedAnime = async function(anime) {
    completedAnime.value.push(anime);

    const { $supabase } = useNuxtApp();
    const { data, error } = await $supabase
      .from('profiles')
      .update({
        completed_anime: completedAnime.value
      })
      .eq('user_id', userId.value);

      if (error) {
        console.error('Error adding anime to profile:', error);
      }
  }

  const addPlannedAnime = async function(anime) {
    plannedAnime.value.push(anime);

    const { $supabase } = useNuxtApp();
    const { data, error } = await $supabase
      .from('profiles')
      .update({
        planned_anime: plannedAnime.value
      })
      .eq('user_id', userId.value);

      if (error) {
        console.error('Error adding anime to profile:', error);
      }
  }


  return { userId, completedAnime, plannedAnime, getCompletedAnime, getPlannedAnime, setUserId, fetchProfile, addCompletedAnime, addPlannedAnime }
});

export default useProfileStore;