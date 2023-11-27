<template>
  <div class="min-h-screen">
    <div
      class="flex flex-col lg:flex-row py-16 lg:py-0 lg:justify-between lg:items-center min-h-[80vh] lg:min-h-screen"
    >
      <div class="w-full lg:w-1/2 flex items-center justify-center">
        <form
          @submit.prevent="loginUser"
          class="w-[90%] sm:w-[60%] flex justify-center items-center flex-col gap-6"
        >
          <h1 class="text-2xl lg:text-3xl font-bold text-center whitespace-nowrap">
            Login to your <span class="text-primary">Linkbum</span>
          </h1>
          <div class="flex flex-col gap-1 w-full">
            <label for="username" class="text-[16px] font-semibold">Username </label>
            <input
              type="text"
              v-model="form.username"
              id="username"
              name="username"
              class="border border-gray-400 bg-transparent rounded-[10px] w-full h-[48px] px-2 outline-none"
            />
          </div>
          <div class="flex flex-col gap-1 w-full">
            <label for="password" class="text-[16px] font-semibold">Password </label>
            <div
              class="border border-gray-400 bg-transparent rounded-[10px] w-full flex items-center justify-between h-[48px] px-2"
            >
              <input
                :type="showPassword ? 'password' : 'text'"
                v-model="form.password"
                id="password"
                name="password"
                class="bg-transparent w-[90%] outline-none"
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
            class="h-[48px] bg-primary rounded-[10px] text-[#fff] w-full text-xl font-semibold flex items-center justify-center mt-6"
            aria-label="Login to your account"
          >
            <span v-if="!loading">Login</span>
            <LoaderVue v-if="loading" />
          </button>
          <p>
            Don't have an account?
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
          class="w-full h-screen object-contain" 
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, ComponentPublicInstance } from "vue";
import LoaderVue from "../components/Loader.vue";
import auth from "../composables/auth/auth";
import { useTitle } from "vue-page-title";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { usePassword } from "../composables/utils/showHide";
const { togglePassword, showPassword } = usePassword();
const router = useRouter();
const toast = useToast();
const { title } = useTitle("Login your account");
const form = reactive({
  username: "",
  password: "",
});
const loading = ref<boolean>(false);
// let showPassword = ref<boolean>(true);
const loginUser = () => {
  loading.value = true;
  auth(form, "login")
    .then((result) => {
      loading.value = false;
      if (result.data.success === true) {
        localStorage.setItem("auth.linkbum", result.data.token);
        localStorage.setItem("linkbum.userId", result.data.user._id);
        localStorage.setItem("linkbum.username", result.data.user.username);
        router.push("/admin");
      } else {
        toast.error(result.data.message, {
          timeout: 3000,
        });
      }
    })
    .catch((err) => {
      loading.value = false;
      toast.error(
        err.response.data.username || err.response.data.email || err.response.data.error,
        {
          timeout: 3000,
        }
      );
    });
};
</script>
