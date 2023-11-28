<template>
  <div
    class="w-[90%] sm:w-[50%] md:w-[40%] lg:w-[30%] mx-auto absolute top-[10vh] right-0 border border-[#e9e9e9] bg-[#fff] p-4 z-[99] rounded-lg shadow-xl"
  >
    <div class="w-[90%] mx-auto pb-4">
      <p class="font-bold text-center">Share your linkbum</p>
      <span class="text-center text-[14px]"
        >Get more visitors by sharing your Linktree everywhere.</span
      >
    </div>
    <div class="flex flex-col gap-4 pb-4">
      <ShareNetwork
        network="facebook"
        :url="url"
        title="Hi, check out my profile on Linkbum"
        hashtags="linkbum"
      >
        <div
          class="flex items-center gap-2 border border-[#e9e9e9] rounded-md p-2 w-full"
        >
          <img src="../assets/fb.png" class="w-[40px] h-[30px]" />
          <p>Share on Facebook</p>
        </div>
      </ShareNetwork>
      <ShareNetwork
        network="whatsapp"
        :url="url"
        title="Hi, check out my profile on Linkbum"
        hashtags="linkbum"
      >
        <div
          class="flex items-center gap-2 border border-[#e9e9e9] rounded-md p-2 w-full"
        >
          <img src="../assets/WhatsApp.svg" class="w-[40px] h-[30px]" />
          <p>Share on Whatsapp</p>
        </div> </ShareNetwork
      ><ShareNetwork
        network="twitter"
        :url="url"
        title="Hi, check out my profile on Linkbum"
        hashtags="linkbum"
      >
        <div
          class="flex items-center gap-2 border border-[#e9e9e9] rounded-md p-2 w-full"
        >
          <img src="../assets/twitter.png" class="w-[30px] h-[30px]" />
          <p>Share on Twitter</p>
        </div>
      </ShareNetwork>
    </div>
    <div
      class="border border-[#e9e9e9] rounded-md p-2 w-full flex flex-col gap-2 items-start sm:flex-row sm:items-center justify-between hover:bg-[#e9e9e9] text-[14px]"
    >
      <p class="font-bold">{{ url }}</p>
      <button @click="copyLink" class="underline" aria-label="Copy your linkbum link and share anywhere">
        {{ linkCopied ? "Copied!" : "Copy" }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const username = localStorage.getItem("linkbum.username");
const url = ref<string>(`https://linkbum.vercel.app/${username}`);
const linkCopied = ref<boolean>(false);
const copyLink = () => {
  navigator.clipboard.writeText(url.value);
  linkCopied.value = true;
};
</script>
