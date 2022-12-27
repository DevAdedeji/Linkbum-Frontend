<template>
  <div class="relative bg-grey min-h-screen">
    <TheHeader class="sm:fixed sm:left-0 sm:right-0 sm:top-0" />
    <ShareComponent v-if="showShareComponent" />
    <div class="pt-4 sm:pt-[10vh]">
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
            <AddLinkVue v-if="showAddLinkComponent" @link-added="reloadLinks" />
            <div class="pt-10">
              <span class="border border-[#e9e9e9] p-3 rounded-lg">My links</span>
              <div class="grid grid-cols-1 gap-2 items-center justify-center pt-10">
                <Loader class="pt-10" v-if="loading" />
                <div v-for="link in user.links" v-else>
                  <div class="bg-[#fff] rounded-lg p-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      style="fill: rgba(61, 167, 100, 1); transform: ; msfilter: "
                      class="ml-auto cursor-pointer mb-2"
                    >
                      <path
                        d="M19.045 7.401c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.378-.378-.88-.586-1.414-.586s-1.036.208-1.413.585L4 13.585V18h4.413L19.045 7.401zm-3-3 1.587 1.585-1.59 1.584-1.586-1.585 1.589-1.584zM6 16v-1.585l7.04-7.018 1.586 1.586L7.587 16H6zm-2 4h16v2H4z"
                      ></path>
                    </svg>
                    <input
                      type="text"
                      v-model="link.title"
                      class="capitalize pb-2 font-bold w-full outline-none"
                      disabled
                    />
                    <input
                      type="text"
                      v-model="link.link"
                      class="font-medium w-full outline-none break-words"
                      disabled
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      style="fill: rgba(61, 167, 100, 1); transform: ; msfilter: "
                      class="ml-auto cursor-pointer mt-4"
                      @click="deleteCurentLink(link._id)"
                    >
                      <path
                        d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"
                      ></path>
                      <path d="M9 10h2v8H9zm4 0h2v8h-2z"></path>
                    </svg>
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
import ShareComponent from "../components/ShareComponent.vue";
import { useAddLinkComponent } from "../../composables/utils/showHide";
import { useShareComponent } from "../../composables/utils/showHide";
import Loader from "../components/Loader2.vue";
import getData from "../../composables/get/getData";
import { deleteLink } from "../../composables/post/postData";
import { useToast } from "vue-toastification";
const toast = useToast();
const router = useRouter();
const { showAddLinkComponent, toggleAddLinkComponent } = useAddLinkComponent();
const { showShareComponent } = useShareComponent();
const { title } = useTitle("Dashboard");
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
const reloadLinks = () => {
  getUserData();
};
const deleteCurentLink = (id: string) => {
  deleteLink(`api/link/post/${id}`)
    .then((result) => {
      if (result.data.success === true) {
        getUserData();
        toast.success(result.data.message, {
          timeout: 3000,
        });
      } else {
        toast.error(result.data.message, {
          timeout: 3000,
        });
      }
    })
    .catch((err) => {
      toast.error(
        err.response.data.title || err.response.data.link || err.response.data.error,
        {
          timeout: 3000,
        }
      );
    });
};
</script>

<style>
input {
  background-color: transparent;
}
</style>
