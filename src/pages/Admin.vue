<template>
  <div class="relative bg-grey min-h-screen">
    <Navbar class="sm:fixed sm:left-0 sm:right-0 sm:top-0" />
    <ShareComponent v-if="showShareComponent" />
    <div class="pt-4 sm:pt-[10vh]">
      <div class="lg:relative min-h-screen flex justify-between">
        <div
          class="hidden md:flex flex-col bg-[#fff] border border-gray-200 rounded md:w-[40%] lg:items-center lg:justify-center lg:fixed lg:top-[10vh] lg:bottom-0 lg:left-0"
          :class="showPreviewMobile ? 'w-full !flex fixed border-none' : 'my-10 pt-16'"
        >
          <button aria-label="close preview modal" type="button" class=" block md:hidden ml-auto border p-1 rounded font-bold cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"  @click="showPreviewMobile = false">
              <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
            </svg>
          </button>
          <div
            class="border-[15px] -mt-[10vh] border-[#000] rounded-[25px] w-[400px] h-[760px] min-w-[400px] min-h-[760px] flex items-center justify-center box-border overflow-hidden"
            style="transform: scale(0.582141)"
            :class="showPreviewMobile ? '-mt-[15vh] lg:-mt-0' : ''"
          >
            <iframe
              class="previewIframe"
              :src="url"
              width="100%"
              height="100%"
              ref="previewIframe"
              title="Preview how your link will look like when visitors visit"
            >
              <p>Your browser doesn't support this feature</p>
            </iframe>
          </div>
        </div>
        <div class="w-full flex flex-col bg-[#fff] md:border-2 md:border-gray-200 md:shadow items-center border-none md:w-[60%] md:ml-auto">
          <div class="w-[90%] sm:w-[80%] mx-auto py-6">
            <h1 class="text-2xl font-bold text-center pb-3">Customize your links</h1>
            <p class="pb-5 text-center">Add, edit, delete links below and share your link to your audiences</p>
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
            <AddLinkVue v-if="showAddLinkComponent" />
            <div class="pt-10">
              <div class="grid grid-cols-1 gap-2 items-center justify-center">
                <Loader class="pt-10" v-if="loading" />
                <div v-for="Link, index in user.links" :key="index" v-else>
                  <LinkContainer
                    :link="Link"
                    :index="index+1"
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
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTitle } from "vue-page-title";
import { ref } from "vue";
import Navbar from "../components/Navbar.vue";
import AddLinkVue from "../components/AddLink.vue";
import ShareComponent from "../components/ShareComponent.vue";
import useLink from "../composables/Link";
import useFetchLink from '../composables/Link/fetch'
import { useShareComponent } from "../composables/utils/showHide";
import Loader from "../components/custom/Loader2.vue";
import LinkContainer from "../components/LinkContainer.vue";

const  { fetchUserData, loading, user } = useFetchLink()
const { showAddLinkComponent, toggleAddLinkComponent, url, previewIframe } = useLink()
const { showShareComponent } = useShareComponent();
const { title } = useTitle("Dashboard");
const showPreviewMobile = ref<boolean>(false);

let iframe = document.querySelector(".previewIframe");
fetchUserData();
</script>

<style>
input {
  background-color: transparent;
}
</style>
