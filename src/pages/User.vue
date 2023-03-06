<template>
  <div class="min-h-screen bg-[#fff] w-full flex flex-col items-center">
    <div v-if="loading" class="flex items-center justify-center min-h-[80vh]">
      <Loader />
    </div>
    <div
      class="w-[90%] md:w-[70%] lg:w-[60%] min-h-full flex flex-col items-center pt-8 pb-2"
      v-else
    >
      <div class="flex flex-col items-center gap-2">
        <div class="w-[100px] h-[100px] rounded-[50%]">
          <img
            :src="user.profilePic"
            :alt="user.username + 'image'"
            class="w-full h-full rounded-[50%]"
          />
        </div>
        <p class="font-bold capitalize text-xl text-green">@{{ user.username }}</p>
      </div>
      <p class="pt-4 font-medium text-center w-[90%] mx-auto">{{ user.bio }}</p>
      <div class="w-full flex flex-col gap-5 pt-10 min-h-[50vh] md:min-h-[60vh]">
        <div v-for="link in user.links" class="w-full">
          <a
            :href="link.link"
            target="_blank"
            class="bg-green text-[#fff] rounded-[10px] h-[58px] !w-full font-bold flex items-center justify-center capitalize"
            >{{ link.title }}</a
          >
        </div>
        <div v-if="user.links.length === 0">
          <p class="text-xl font-bold text-center py-10">
            No links has been added by user yet
          </p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useTitle } from "vue-page-title";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import Footer from "../components/Footer.vue";
import Loader from "../components/Loader2.vue";
import getData from "../../composables/requests/get/getData";

const route = useRoute();
const router = useRouter();
const toast = useToast();
let username = route.params.username;
const { title } = useTitle(`@${username}`);
let loading = ref(true);
let user = ref({
  username: "",
  profilePic: "",
  bio: "",
  links: [
    {
      title: "",
      link: "",
    },
  ],
});
const getUserData = () => {
  getData(`api/user/${username}`)
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
getUserData();
</script>
