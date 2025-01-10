<script setup>
import useAuthStore from '~/stores/auth';
import { useRouter, useRoute } from 'vue-router';

const store = useAuthStore();
const router = useRouter();
const route = useRoute();

const userDetails = reactive({
  email: '',
  password: ''
});

const isFormValid = ref(true);
const mode = ref('login');
const isLoading = ref(false);
const error = ref(null);

const isLoggedIn = computed(() => {
  return store.isAuthenticated;
});

const switchModeButtonCaption = computed(() => {
  return mode.value === 'login' ? 'Signup' : 'Login';
});

const submitButtonCaption = computed(() => {
  return mode.value === 'login' ? 'Login' : 'Signup';
});

const submitForm = async function() {
  isFormValid.value = true;
  if (userDetails.email === '' || !userDetails.email.includes('@') || userDetails.password.length < 6) {
    isFormValid.value = false;
    return;
  }

  isLoading.value = true;

  const actionPayload = { 
    email: userDetails.email, 
    password: userDetails.password
  }

  try {
    if (mode.value === 'login') {
      await store.login(actionPayload);
    } else {
      await store.signup(actionPayload);
    }

    // const redirectUrl = (route.query.redirect || '/secret');
    const redirectUrl = ('/profile');
    router.replace(redirectUrl);
  } catch (err) {
    console.error('Error during Signup:', err.message); 
    error.value = err.message || 'Failed to authenticate, try later.';
  }

  isLoading.value = false;
}

const switchAuthMode = function() {
  mode.value === 'login' ? mode.value = 'signup' : mode.value = 'login';
}

const logout = function() {
  store.logout();
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
        <input type="email" id="email" v-model.trim="userDetails.email" />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model.trim="userDetails.password" />
      </div>
      <p v-if="!isFormValid">
        Please enter a valid email and a password of at least 6 characters.
      </p>
      <BaseButton>{{ submitButtonCaption }}</BaseButton>
    </BaseForm>
    <div class="flex justify-center items-center">
      <p v-if="mode === 'login'">Don't yet have an account?</p>
      <p v-else>Already have an account?</p>
      <BaseButton @click="switchAuthMode">{{ switchModeButtonCaption }}</BaseButton>
      <div v-if="isLoggedIn">
        <BaseButton @click="logout">Logout</BaseButton>
      </div>
    </div>
  </div>
</template>