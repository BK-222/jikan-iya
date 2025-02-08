<script setup>
import useAuthStore from '~/stores/auth';
import { useRouter } from 'vue-router';

definePageMeta({
  middleware: 'guest-guard',
});

const authStore = useAuthStore();
const router = useRouter();

const userDetails = reactive({ email: '', password: '' });

const isFormValid = ref(true),
      mode = ref('login'),
      isLoading = ref(false),
      error = ref(null);

const switchModeButtonCaption = computed(() => mode.value === 'login' ? 'Signup' : 'Login');
const submitButtonCaption = computed(() => mode.value === 'login' ? 'Login' : 'Signup');

const submitForm = async function() {
  isFormValid.value = true;
  error.value = null;

  if (userDetails.email === '' || !userDetails.email.includes('@') || userDetails.password.length < 6) {
    isFormValid.value = false;
    return;
  }

   if (mode.value === 'signup' && userDetails.username.length < 4) {
    isFormValid.value = false
    return
  }

  isLoading.value = true;

  const actionPayload = mode.value === 'login'
    ? { email: userDetails.email, password: userDetails.password }
    : { email: userDetails.email, username: userDetails.username, password: userDetails.password };

  try {
    mode.value === 'login'
    ? await authStore.login(actionPayload)
    : await authStore.signup(actionPayload);

    // const redirectUrl = (route.query.redirect || '/secret');

    await router.replace(`/profile/${authStore.getUserId}`);
  } catch (err) {
    error.value = err.message || 'Failed to authenticate, please try again later.';
  } finally {
    isLoading.value = false;
  }
}

const switchAuthMode = function() {
  mode.value === 'login' ? mode.value = 'signup' : mode.value = 'login';
}

</script>
<template>
  <div>
    <div v-if="isLoading" class="flex flex-col items-center">
      <p class="mb-2">Authenticating...</p>
      <div class="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-teal-500 border-t-transparent"></div>
    </div>
    <BaseForm v-else @submit.prevent="submitForm">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model.trim="userDetails.email" class="border rounded" required />
      </div>
      <div v-if="mode === 'signup'">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model.trim="userDetails.username" class="border rounded" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model.trim="userDetails.password" class="border rounded" required />
      </div>
      <p v-if="!isFormValid">
        Please enter a valid email and a password of at least 6 characters.
      </p>
      <BaseButton>{{ submitButtonCaption }}</BaseButton>
    </BaseForm>
    <div class="flex justify-center items-center mt-4 space-x-2">
      <p v-if="mode === 'login'">Don't yet have an account?</p>
      <p v-else>Already have an account?</p>
      <BaseButton @click="switchAuthMode">{{ switchModeButtonCaption }}</BaseButton>
    </div>
  </div>
</template>