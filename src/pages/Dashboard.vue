<template>
  <div class="relative bg-grey min-h-screen">
    <TheHeader class="sm:fixed sm:left-0 sm:right-0 sm:top-0" />
    <ShareComponent v-if="showShareComponent" />
    <div class="pt-4 sm:pt-[10vh]">
      <div class="lg:relative min-h-screen flex justify-between">
        <div class="w-full sm:w-[60%] xl:w-1/2">
          <div class="w-[90%] sm:w-[80%] mx-auto py-6">
            <button
              class="bg-green w-full h-[48px] font-bold rounded-[20px] text-[#fff] hover:scale-x-95 duration-500 flex items-center justify-center gap-1"
              v-if="!showAddLinkComponent"
              @click="toggleAddLinkComponent"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                style="fill: rgba(255, 255, 255, 1); transform: ; msfilter: "
              >
                <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
              </svg>
              <span>Add link</span>
            </button>
            <AddLinkVue v-if="showAddLinkComponent" @link-added="reloadLinks" />
            <div class="pt-10">
              <span class="border border-[#e9e9e9] p-3 rounded-lg">My links</span>
              <div class="grid grid-cols-1 gap-2 items-center justify-center pt-10">
                <Loader class="pt-10" v-if="loading" />
                <div v-for="Link in user.links" v-else>
                  <TheLink
                    :link="Link"
                    @link-deleted="reloadLinks"
                    @link-updated="reloadLinks"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="hidden sm:w-[40%] xl:w-1/2 sm:flex items-center justify-center border-l border-[#e9e9e9] lg:fixed lg:top-[10vh] lg:bottom-0 lg:right-0"
        >
          <div
            class="border-[15px] border-[#000] rounded-[25px] w-[352px] h-[724px] min-w-[352px] min-h-[724px] flex items-center justify-center box-border overflow-hidden"
            style="transform: scale(0.582141) translate3d(0px, 0px, 0px)"
          >
            <iframe
              class="previewIframe"
              :src="url"
              width="100%"
              height="100%"
              ref="previewIframe"
            >
              <p>Your browser doesn't support this feature</p>
            </iframe>
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
import ShareComponent from "../components/ShareComponent.vue";
import { useAddLinkComponent } from "../../composables/utils/showHide";
import { useShareComponent } from "../../composables/utils/showHide";
import Loader from "../components/Loader2.vue";
import getData from "../../composables/get/getData";
import TheLink from "../components/TheLink.vue";
import { useToast } from "vue-toastification";
const toast = useToast();
const router = useRouter();
const { showAddLinkComponent, toggleAddLinkComponent } = useAddLinkComponent();
const { showShareComponent } = useShareComponent();
const { title } = useTitle("Dashboard");
const username = localStorage.getItem("linkbum.username");
const url = `https://linkbum.vercel.app/${username}`;
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
const previewIframe = ref<HTMLIFrameElement>();
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
let iframe = document.querySelector(".previewIframe");
getUserData();
const reloadLinks = () => {
  getUserData();
  // previewIframe.value?.contentWindow?.location.reload();
  document.querySelector(".previewIframe").src += "";
};
</script>

<style>
input {
  background-color: transparent;
}
</style>
