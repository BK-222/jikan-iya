<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-gray-50">
    <div class="max-w-2xl w-full">
      <NuxtImg src="/images/404-anime.jpg" alt="Lost anime character" class="w-full max-w-[800px] h-auto mx-auto mb-8" loading="lazy" />
      <h1 class="text-3xl md:text-4xl font-bold mb-4 text-gray-800">404 - Page Not Found</h1>
      <p class="text-lg md:text-xl text-gray-600 mb-8">Even the best anime heroes get lost sometimes...</p>
      <NuxtLink to="/">
        <BaseButton class="text-lg md:text-xl">Back to Main Page</BaseButton>
      </NuxtLink>
    </div>
  </div>
</template>