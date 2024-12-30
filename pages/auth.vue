<script setup>
const userDetails = reactive({
  email: '',
  password: ''
});
const isformValid = ref(true);
const isLoading = ref(false);
const error = ref(null);
</script>
<template>
  <div>
    <BaseForm>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model.trim="email" />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model.trim="password" />
      </div>
      <BaseButton>Submit</BaseButton>
    </BaseForm>
  </div>
</template>