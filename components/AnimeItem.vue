<script setup>
  const props = defineProps({ anime: { type: Object, required: true } });
</script>

<template>
  <li>
    <NuxtLink :to="`/anime/${anime.id}`">
      <NuxtImg class="h-70 w-60" v-if="anime.image" :src="anime.image" alt="anime image" loading="lazy" />
      <span v-else>No Image Available</span>
      <p>{{ anime.id }}: {{ anime.name }}</p>
      <p>{{ anime.type }}</p>
    </NuxtLink>
  </li>
</template>