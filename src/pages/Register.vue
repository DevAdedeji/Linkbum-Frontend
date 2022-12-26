<template>
  <div
    class="flex flex-col lg:flex-row bg-[#ffff] justify-between h-[90vh] lg:h-screen max-h-screen"
  >
    <Header class="block lg:hidden" />
    <div
      class="w-full lg:w-1/2 login-form flex items-center min-h-[90vh] lg:min-h-screen justify-center"
    >
      <form
        @submit.prevent="registerUser"
        class="w-[90%] sm:w-[60%] flex justify-center items-center flex-col gap-6"
      >
        <h1 class="text-2xl lg:text-3xl font-bold text-center whitespace-nowrap">
          Create your account
        </h1>
        <div class="flex flex-col gap-1 w-full">
          <label for="username" class="text-[16px] font-semibold">Username </label>
          <input
            type="text"
            v-model="form.username"
            class="bg-grey rounded-[10px] w-full h-[48px] px-2"
            required
          />
        </div>
        <div class="flex flex-col gap-1 w-full">
          <label for="username" class="text-[16px] font-semibold">Email </label>
          <input
            type="email"
            v-model="form.email"
            class="bg-grey rounded-[10px] w-full h-[48px] px-2"
            required
          />
        </div>
        <div class="flex flex-col gap-1 w-full">
          <label for="username" class="text-[16px] font-semibold">Gender </label>
          <select
            v-model="form.gender"
            class="bg-grey rounded-[10px] w-full h-[48px] px-2"
            required
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
        </div>
        <div class="flex flex-col gap-1 w-full">
          <label for="password" class="text-[16px] font-semibold">Password </label>
          <input
            type="password"
            v-model="form.password"
            class="bg-grey rounded-[10px] w-full h-[48px] px-2"
            required
          />
        </div>
        <button
          type="submit"
          class="h-[48px] bg-green rounded-[10px] text-[#fff] w-full text-[16px] font-semibold flex items-center justify-center"
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
        class="w-full h-full"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useTitle } from "vue-page-title";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import auth from "../../composables/auth/auth";
import LoaderVue from "../components/Loader.vue";
import Header from "../components/Header.vue";
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
const registerUser = () => {
  loading.value = true;
  auth(form, "/register")
    .then((result) => {
      loading.value = false;
      if (result.data.success === true) {
        toast.success(result.data.message, {
          timeout: 2000,
        });
        router.push("/login");
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
