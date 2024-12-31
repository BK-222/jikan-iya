<script setup>
import useAuthStore from '@/stores/Auth';

const store = useAuthStore();

const userDetails = reactive({
  email: '',
  password: ''
});
const isFormValid = ref(true);
const isLoading = ref(false);
const error = ref(null);

const submitForm = async () => {
  if (userDetails.email === '' || !userDetails.email.includes('@') || userDetails.password.length < 6) {
    isFormValid.value = false;
    return;
  }

  isLoading.value = true;

  const actionPayload = { 
    email: userDetails.email, 
    password: userDetails.password
  }
}
</script>
<template>
  <div>
    <BaseForm @submit.prevent="submitForm">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model.trim="email" />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model.trim="password" />
      </div>
      <p v-if="!formIsValid">
        Please enter a valid email and a password of at least 6 characters.
      </p>
      <BaseButton>Submit</BaseButton>
    </BaseForm>
    <p v-if="error">Error: {{ error.message }}</p>
  </div>
</template>