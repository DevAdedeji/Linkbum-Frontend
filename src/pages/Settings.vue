<template>
  <div class="relative bg-grey min-h-screen">
    <TheHeader class="sm:fixed sm:left-0 sm:right-0 sm:top-0" />
    <ShareComponent v-if="showShareComponent" />
    <section class="pt-4 sm:pt-[10vh]">
      <div class="py-6">
        <h2 class="text-3xl text-center">My Account</h2>
      </div>
      <div class="Information">
        <form
          class="flex flex-col gap-4 bg-[#fff] w-[90%] md:w-[70%] lg:w-[50%] mx-auto rounded-[10px] p-5"
          @submit.prevent="updateUserInfo"
        >
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
          <button class="rounded-[10px] bg-green text-[#fff] py-3 w-[30%]">
            Save Details
          </button>
        </form>
      </div>
    </section>
    <!-- <form @submit.prevent="upload" class="pt-4 sm:pt-[10vh]">
      <input type="file" accept="image/*" id="profilePic" />
      <button>Upload</button>
    </form> -->
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import TheHeader from "../components/TheHeader.vue";
import { useTitle } from "vue-page-title";
import ShareComponent from "../components/ShareComponent.vue";
import { useShareComponent } from "../../composables/utils/showHide";
import getData from "../../composables/get/getData";
import { useToast } from "vue-toastification";
const toast = useToast();
const router = useRouter();
const { title } = useTitle("Account Settings");
const { showShareComponent } = useShareComponent();
const id = localStorage.getItem("linkbum.userId");
const loading = ref<boolean>(true);
let user = ref({
  username: "",
  profilePic: "",
  email: "",
  bio: "",
});
const getUserData = () => {
  getData(`api/user/me/${id}`)
    .then((result) => {
      loading.value = false;
      user.value = result.data;
    })
    .catch((err) => {
      loading.value = false;
      if (err.response.status === 404) {
        toast.error("User not found, redirected to homepage", {
          timeout: 3000,
        });
        router.push("/");
      } else {
        toast.error("Something went wrong, please try again", {
          timeout: 3000,
        });
        router.push("/");
      }
    });
};

const updateUserInfo = () => {};

getUserData();

const upload = async (e: Event) => {
  // let file = document.getElementById("profilePic")?.files[0];
  // let form = new FormData();
  // form.append("file", file);
};
</script>
