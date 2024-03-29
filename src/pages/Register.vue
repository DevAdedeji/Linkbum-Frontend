<template>
  <div class="min-h-screen">
    <div
      class="flex flex-col lg:flex-row py-16 lg:py-0 lg:justify-between lg:items-center min-h-[80vh] lg:min-h-screen"
    >
      <div class="w-full lg:w-1/2 flex items-center justify-center">
        <form
          @submit.prevent="registerUser"
          class="w-[90%] sm:w-[60%] flex justify-center items-center flex-col gap-4"
        >
          <h1 class="text-2xl lg:text-3xl font-bold text-center whitespace-nowrap">
            Create your account
          </h1>
          <div class="flex flex-col gap-1 w-full">
            <label for="username" class="text-[16px] font-semibold">Username </label>
            <input
              type="text"
              v-model.trim="form.username"
              class="border border-gray-400 bg-transparent rounded-[10px] w-full h-[48px] px-2 outline-none"
              name="username"
              id="username"
              required
            />
          </div>
          <div class="flex flex-col gap-1 w-full">
            <label for="email" class="text-[16px] font-semibold">Email </label>
            <input
              type="email"
              v-model="form.email"
              class="border border-gray-400 bg-transparent rounded-[10px] w-full h-[48px] px-2 outline-none"
              name="email"
              id="email"
              required
            />
          </div>
          <div class="flex flex-col gap-1 w-full">
            <label for="gender" class="text-[16px] font-semibold">Gender </label>
            <select
              v-model="form.gender"
              class="border border-gray-400 bg-transparent rounded-[10px] w-full h-[48px] px-2 outline-none"
              name="gender"
              id="gender"
              required
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>
          <div class="flex flex-col gap-1 w-full">
            <label for="password" class="text-[16px] font-semibold">Password </label>
            <div
              class="border border-gray-400 bg-transparent rounded-[10px] w-full flex items-center justify-between h-[48px] px-2"
            >
              <input
                :type="showPassword ? 'password' : 'text'"
                v-model="form.password"
                class="bg-transparent w-[90%] outline-none"
                name="password"
                id="password"
                required
              />
              <button class="cursor-pointer" :class="showPassword ? 'block' : 'hidden'" @click="togglePassword" aria-label="Click to view password">
                <img
                  src="../assets/eye.png"
                  alt="view_password_icon"
                  class="w-[20px] h-[20px]"
                />
              </button>
              <button type="button" role="button" @click="togglePassword" :class="showPassword ? 'hidden' : 'block'" class="cursor-pointer" aria-label="Click to hide password">
                <img
                  src="../assets/eye-off.png"
                  alt="hide_password_icon"
                  class="w-[20px] h-[20px]"
                />
              </button>
            </div>
          </div>
          <button
            type="submit"
            class="h-[48px] bg-primary rounded-[10px] text-[#fff] w-full text-[16px] font-semibold flex items-center justify-center"
            aria-label="Register an account"
          >
            <span v-if="!loading">Register</span>
            <LoaderVue v-if="loading" />
          </button>
          <p>
            Already have an account?
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
          class="w-full h-screen object-contain"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useTitle } from "vue-page-title";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import LoaderVue from "../components/custom/Loader.vue";
import { usePassword } from "../composables/utils/showHide";
import api from '../services/api'

const { togglePassword, showPassword } = usePassword();
const { title } = useTitle("Register an account");
const router = useRouter();
const toast = useToast();
const form = reactive({
  username: "",
  email: "",
  password: "",
  gender: "",
});
const loading = ref<boolean>(false);
const registerUser = async () => {
  loading.value = true;
  try {
    const response = await api.post('api/auth/register', form)
    if (response.data.success === true) {
      toast.success(response.data.message, {
        timeout: 2000,
      });
      router.push("/login");
    }
  } catch (err:any){
    loading.value = false;
    toast.error(
      err.response.data.username || err.response.data.email || err.response.data.error,
      {
        timeout: 3000,
      }
    );
  }
};
</script>
