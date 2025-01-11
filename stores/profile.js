import { defineStore } from 'pinia';

const useProfileStore = defineStore('profile', () => {
  const userId = ref(null);
  const completedAnime = ref([]);
  const plannedAnime = ref([]);

  const fetchProfile = async function() {
    const { supabase } = useNuxtApp();

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
        completedAnime: completedAnime.value
      })
      .eq('user_id', userId.value);

    if (error) throw error;
  }

  const addPlannedAnime = async function(anime) {
    plannedAnime.value.push(anime);

    const { $supabase } = useNuxtApp();
    const { data, error } = await $supabase
      .from('profiles')
      .update({
        plannedAnime: plannedAnime.value
      })
      .eq('user_id', userId.value);

    if (error) throw error;
  }


  return { userId, completedAnime, plannedAnime, fetchProfile, addCompletedAnime, addPlannedAnime };
});

export default useProfileStore;