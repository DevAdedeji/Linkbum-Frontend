<template>
  <div class="relative bg-grey min-h-screen">
    <TheHeader class="lg:fixed lg:eft-0 lg:right-0 lg:top-0" />
    <div class="pt-[10vh]">
      <div class="lg:relative min-h-screen flex justify-between">
        <div class="w-full sm:w-[60%] xl:w-1/2">
          <div class="w-[90%] sm:w-[80%] mx-auto py-6">
            <button
              class="bg-green w-full h-[48px] font-bold rounded-md text-[#fff] hover:scale-x-95 duration-500"
              v-if="!showAddLinkComponent"
              @click="toggleAddLinkComponent"
            >
              Add link
            </button>
            <AddLinkVue v-if="showAddLinkComponent" />
            <div class="pt-10">
              <span class="border border-[#e9e9e9] p-3 rounded-lg">My links</span>
              <div class="grid grid-cols-1 gap-2 items-center justify-center pt-10">
                <Loader class="pt-10" v-if="loading" />
                <div v-for="link in user.links" v-else>
                  <div class="bg-[#fff] rounded-lg p-4">
                    <!-- <p class="capitalize pb-2 font-bold">{{ link.title }}</p>
                    <p class="font-medium">{{ link.link }}</p> -->
                    <input
                      type="text"
                      v-model="link.title"
                      class="capitalize pb-2 font-bold w-full outline-none"
                      disabled
                    />
                    <input
                      type="text"
                      v-model="link.link"
                      class="font-medium w-full outline-none"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="hidden sm:w-[40%] xl:w-1/2 sm:flex items-center justify-center border-l border-[#e9e9e9] lg:fixed lg:top-[10vh] lg:bottom-0 lg:right-0"
        >
          <div
            class="border-[5px] border-[#000] rounded-[20px] w-[200px] h-[400px] flex items-center justify-center"
          >
            <p class="font-bold">Feature coming soon</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTitle } from "vue-page-title";
import { ref } from "vue";
import { useRouter } from "vue-router";
import TheHeader from "../components/TheHeader.vue";
import AddLinkVue from "../components/AddLink.vue";
import { useAddLinkComponent } from "../../composables/utils/showHide";
import Loader from "../components/Loader2.vue";
import getData from "../../composables/getData/getData";
import { useToast } from "vue-toastification";
const toast = useToast();
const router = useRouter();
const { showAddLinkComponent, toggleAddLinkComponent } = useAddLinkComponent();
const { title } = useTitle("Dashboard");
const loading = ref<boolean>(true);
let user = ref({
  username: "",
  profilePic: "",
  links: [
    {
      title: "",
      link: "",
    },
  ],
});
const id = localStorage.getItem("linkbum.userId");
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
getUserData();
</script>
