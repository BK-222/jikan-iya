import { defineStore } from 'pinia'

interface Anime {
  id: number
  title: string
}

const useProfileStore = defineStore('profile', () => {

  const completedAnime = ref<Anime[]>([])
  const plannedAnime = ref<Anime[]>([])

  async function fetchProfile() {
    try {
      const response = await $fetch<{ data: { completedAnime: Anime[]; plannedAnime: Anime[] } }>('/api/profile/fetch')
      completedAnime.value = response.data.completedAnime
      plannedAnime.value = response.data.plannedAnime
    } catch (error) {
      console.error('Profile fetch error:', error)
    }
  }

  async function addCompletedAnime(anime: Anime) {
    try {
      await $fetch('/api/profile/completed', {
        method: 'POST',
        body: anime
      })
      completedAnime.value.push(anime)
    } catch (error) {
      console.error('Error adding anime:', error)
    }
  }

  async function addPlannedAnime(anime: Anime) {
    try {
      await $fetch('/api/profile/planned', {
        method: 'POST',
        body: anime
      })
      plannedAnime.value.push(anime) // Same optimistic update
    } catch (error) {
      console.error('Error adding anime:', error)
    }
  }

  async function removeCompletedAnime(anime: Anime) {
    try {
      await $fetch('/api/profile/completed', {
        method: 'DELETE',
        body: { id: anime.id }
      })
      completedAnime.value = completedAnime.value.filter(item => item.id !== anime.id)
    } catch (error) {
      console.error('Remove failed:', error)
    }
  }

  async function removePlannedAnime(anime: Anime) {
    try {
      await $fetch('/api/profile/planned', {
        method: 'DELETE',
        body: { id: anime.id }
      })
      plannedAnime.value = plannedAnime.value.filter(item => item.id !== anime.id)
    } catch (error) {
      console.error('Remove failed:', error)
    }
  }

  return { completedAnime, plannedAnime, fetchProfile, addCompletedAnime, addPlannedAnime, 
    removeCompletedAnime, removePlannedAnime }
})

export default useProfileStore