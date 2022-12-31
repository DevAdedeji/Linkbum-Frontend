<template>
  <div class="relative bg-grey min-h-screen">
    <TheHeader class="sm:fixed sm:left-0 sm:right-0 sm:top-0" />
    <ShareComponent v-if="showShareComponent" />
    <section class="pt-4 sm:pt-[10vh]">
      <div class="py-6">
        <h2 class="text-3xl text-center">My Account</h2>
      </div>
      <div></div>
    </section>
    <!-- <form @submit.prevent="upload" class="pt-4 sm:pt-[10vh]">
      <input type="file" accept="image/*" id="profilePic" />
      <button>Upload</button>
    </form> -->
  </div>
</template>

<script lang="ts" setup>
import axios from "axios";
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
  links: [
    {
      title: "",
      link: "",
      _id: "",
    },
  ],
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

const upload = async (e: Event) => {
  // let file = document.getElementById("profilePic")?.files[0];
  // let form = new FormData();
  // form.append("file", file);
};
</script>
