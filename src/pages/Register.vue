<template>
  <div class="flex flex-col lg:flex-row bg-[#ffff] justify-between h-screen max-h-screen">
    <div class="w-full lg:w-1/2 login-form flex items-center min-h-screen justify-center">
      <form
        @submit.prevent="registerUser"
        class="w-[90%] sm:w-[60%] flex justify-center items-center flex-col gap-6"
      >
        <h1 class="text-6xl font-bold">Register</h1>
        <div class="flex flex-col gap-1 w-full">
          <label for="username" class="text-xl font-semibold">Username </label>
          <input
            type="text"
            v-model="username"
            class="bg-grey rounded-[10px] w-full h-[48px] px-2"
          />
        </div>
        <div class="flex flex-col gap-1 w-full">
          <label for="username" class="text-xl font-semibold">Email </label>
          <input
            type="email"
            v-model="email"
            class="bg-grey rounded-[10px] w-full h-[48px] px-2"
          />
        </div>
        <div class="flex flex-col gap-1 w-full">
          <label for="username" class="text-xl font-semibold">Gender </label>
          <select v-model="gender" class="bg-grey rounded-[10px] w-full h-[48px] px-2">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
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
          Already have a linkbum account?
          <router-link :to="{ name: 'login' }" class="text-blue-700 underline">
            Login
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
const { title } = useTitle("Register an account");
const username = ref<string>("");
const email = ref<string>("");
const password = ref<string>("");
const gender = ref<string>("");
const btnDisabled = ref<boolean>(false);
const registerUser = () => {
  console.log(username.value, password.value);
};
</script>
