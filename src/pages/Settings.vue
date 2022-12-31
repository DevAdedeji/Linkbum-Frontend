<template>
  <div class="relative bg-grey min-h-screen">
    <TheHeader class="sm:fixed sm:left-0 sm:right-0 sm:top-0" />
    <ShareComponent v-if="showShareComponent" />
    <section class="py-4 sm:pt-[15vh] sm:pb-[5vh]">
      <div class="py-6">
        <h2 class="text-3xl text-center">My Account</h2>
      </div>
      <div class="bg-[#fff] w-[90%] md:w-[70%] lg:w-[50%] mx-auto rounded-[10px] p-5">
        <form @submit.prevent="upload" class="mb-5 pb-5 border-b border-[#e9e9e9]">
          <div class="flex gap-2">
            <div class="w-[100px] h-[100px] rounded-[50%]">
              <img :src="user.profilePic" class="w-full h-full rounded-[50%]" />
            </div>

            <label
              for="profilePic"
              class="bg-green rounded-md py-1 px-2 text-[#fff] self-end cursor-pointer"
              >Change Photo</label
            >
            <input
              type="file"
              accept="image/*"
              name="profilePic"
              id="profilePic"
              class="hidden"
            />
          </div>
        </form>
        <form class="flex flex-col gap-4 w-full" @submit.prevent="updateUserInfo">
          <div class="flex flex-col gap-2">
            <p class="text-[12px]">Username</p>
            <input
              type="text"
              v-model="user.username"
              class="capitalize border-b border-[#e9e9e9] pb-2 outline-none"
            />
          </div>
          <div class="flex flex-col gap-2">
            <p class="text-[12px]">Email</p>
            <input
              type="text"
              v-model="user.email"
              class="border-b border-[#e9e9e9] pb-2 outline-none"
            />
          </div>
          <div class="flex flex-col gap-2">
            <p class="text-[12px]">Bio</p>
            <textarea
              id=""
              cols="10"
              rows="5"
              class="outline-none border border-[#e9e9e9] p-2"
              v-model="user.bio"
              >{{ user.bio }}</textarea
            >
          </div>
          <button class="rounded-[10px] bg-green text-[#fff] py-3 w-[50%] md:w-[30%]">
            Update Details
          </button>
        </form>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import TheHeader from "../components/TheHeader.vue";
import { useTitle } from "vue-page-title";
import ShareComponent from "../components/ShareComponent.vue";
import { useShareComponent } from "../../composables/utils/showHide";
import { useUserData } from "../../composables/User/getUserData";
import { useToast } from "vue-toastification";
const { getUserData, loading, user } = useUserData();
const { title } = useTitle("Account Settings");
const { showShareComponent } = useShareComponent();

const updateUserInfo = () => {};

getUserData();

const upload = async (e: Event) => {
  // let file = document.getElementById("profilePic")?.files[0];
  // let form = new FormData();
  // form.append("file", file);
};
</script>
