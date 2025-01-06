<script setup>
import useAuthStore from '~/stores/auth';

const store = useAuthStore();

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
    mode.value === 'login' ? await store.login(actionPayload) : await store.signup(actionPayload);
    console.log('Signup Successful');
  } catch (err) {
    console.error('Error during Signup:', err.message); 
    error.value = err.message || 'Failed to authenticate, try later.';
  }
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
    <BaseForm @submit.prevent="submitForm">
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
      <p>already have an account?</p>
      <BaseButton @click="switchAuthMode">{{ switchModeButtonCaption }}</BaseButton>
      <BaseButton @click="logout">Logout</BaseButton>
      <p v-if="isLoggedIn">
        <NuxtLink to="/secret">secret</NuxtLink>
      </p>
      <p v-if="error">Error: {{ error.message }}</p>
    </div>
  </div>
</template>