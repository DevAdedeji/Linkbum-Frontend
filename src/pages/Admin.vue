<template>
  <div class="relative bg-grey min-h-screen">
    <TheHeader class="sm:fixed sm:left-0 sm:right-0 sm:top-0" />
    <ShareComponent v-if="showShareComponent" />
    <div class="pt-4 sm:pt-[10vh]">
      <div class="lg:relative min-h-screen flex justify-between">
        <div class="relative w-full flex flex-col items-center md:w-[60%] xl:w-1/2">
          <div class="w-[90%] sm:w-[80%] mx-auto py-6">
            <h1 class="text-2xl font-bold text-center sm:text-left pb-3">Customize your links</h1>
            <p class="pb-5">Add, edit, delete links below and share your link to your audiences</p>
            <button
              class="bg-primary w-full h-[48px] font-bold rounded-[20px] text-[#fff] hover:scale-x-95 duration-500 flex items-center justify-center gap-1 tracing-wide"
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
              <div class="grid grid-cols-1 gap-2 items-center justify-center">
                <Loader class="pt-10" v-if="loading" />
                <div v-for="Link, index in user.links" :key="index" v-else>
                  <TheLink
                    :link="Link"
                    :index="index+1"
                    @link-deleted="reloadLinks"
                    @link-updated="reloadLinks"
                  />
                </div>
              </div>
            </div>
          </div>
          <button
            class="fixed bottom-5 md:hidden border border-[#e9e9e9] shadow-xl p-2 rounded-[10px] font-bold flex items-center gap-1"
            @click="showPreviewMobile = true"
            aria-label="Preview how visitors will see your link when you share"
            type="button"
          >
            <img src="../assets/eye.png" alt="eye-icon" />
            <span>Preview</span>
          </button>
        </div>
        <div
          class="hidden md:flex flex-col md:bg-transparent md:w-[40%] xl:w-1/2 items-center justify-center border-l-4 border-primary lg:fixed lg:top-[10vh] lg:bottom-0 lg:right-0"
          :class="showPreviewMobile ? 'w-full !flex fixed bg-[#fff]' : ''"
        >

          <button aria-label="close preview modal" type="button" class=" block md:hidden ml-auto border p-1 rounded font-bold cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"  @click="showPreviewMobile = false">
              <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
            </svg>
          </button>
          <div
            class="border-[15px] -mt-[10vh] border-[#000] rounded-[25px] w-[352px] h-[724px] min-w-[352px] min-h-[724px] flex items-center justify-center box-border overflow-hidden"
            style="transform: scale(0.582141)"
            :class="showPreviewMobile ? '-mt-[15vh] lg:-mt-0' : ''"
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
import TheHeader from "../components/TheHeader.vue";
import AddLinkVue from "../components/AddLink.vue";
import ShareComponent from "../components/ShareComponent.vue";
import { useAddLinkComponent } from "../composables/utils/showHide";
import { useShareComponent } from "../composables/utils/showHide";
import Loader from "../components/Loader2.vue";
import { useUserData } from "../composables/user/getUserData";
import TheLink from "../components/TheLink.vue";
const { getUserData, loading, user } = useUserData();
const { showAddLinkComponent, toggleAddLinkComponent } = useAddLinkComponent();
const { showShareComponent } = useShareComponent();
const { title } = useTitle("Dashboard");
const username = localStorage.getItem("linkbum.username");
const url = `https://linkbum.vercel.app/${username}`;
const previewIframe = ref<HTMLIFrameElement>() as any;
const showPreviewMobile = ref<boolean>(false);

let iframe = document.querySelector(".previewIframe");
getUserData();
const reloadLinks = () => {
  getUserData();
  previewIframe.value.src = previewIframe.value.src;
};
</script>

<style>
input {
  background-color: transparent;
}
</style>
