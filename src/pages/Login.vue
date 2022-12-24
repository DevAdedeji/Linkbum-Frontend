<template>
  <div class="flex flex-col lg:flex-row bg-[#ffff] justify-between h-screen max-h-screen">
    <div class="w-full lg:w-1/2 login-form flex items-center min-h-screen justify-center">
      <form
        @submit.prevent="loginUser"
        class="w-[90%] sm:w-[60%] flex justify-center items-center flex-col gap-10"
      >
        <h1 class="text-6xl font-bold">Login</h1>
        <div class="flex flex-col gap-1 w-full">
          <label for="username" class="text-xl font-semibold">Username </label>
          <input
            type="text"
            v-model="username"
            class="bg-grey rounded-[10px] w-full h-[48px] px-2"
          />
        </div>
        <div class="flex flex-col gap-1 w-full">
          <label for="password" class="text-xl font-semibold">Password </label>
          <input
            type="password"
            v-model="password"
            class="bg-grey rounded-[10px] w-full h-[48px] px-2"
          />
        </div>
        <button
          type="submit"
          class="h-[48px] bg-green rounded-[10px] text-[#fff] w-full text-xl font-semibold"
        >
          Login
        </button>
        <p>
          Don't have a linkbum account?
          <router-link :to="{ name: 'register' }" class="text-blue-700 underline">
            Create one
          </router-link>
        </p>
      </form>
    </div>
    <div class="w-1/2 hidden lg:block h-full">
      <img
        src="../assets/01-Create-Account-1920x1920.webp"
        alt="image"
        class="w-full h-full"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useTitle } from "vue-page-title";
const { title } = useTitle("Login your account");
const username = ref<string>("");
const password = ref<string>("");
const btnDisabled = ref<boolean>(false);
const loginUser = () => {
  console.log(username.value, password.value);
};
</script>
