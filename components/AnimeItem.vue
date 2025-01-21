<script setup>
  const props = defineProps({ anime: { type: Object, required: true } });
</script>

<template>
    <NuxtLink :to="`/anime/${anime.id}`" class="flex flex-col items-center text-center">
      <div class="w-60 aspect-[9/13] overflow-hidden rounded-md">
        <NuxtImg class="w-full h-full object-cover" v-if="anime.image" :src="anime.image" alt="anime image" loading="lazy" />
        <span v-else>No Image Available</span>
      </div>
      <p class="font-medium">{{ anime.id }}: {{ anime.name }}</p>
      <p class="text-sm text-gray-600">{{ anime.type }}</p>
    </NuxtLink>
</template>