<template>
  <div class="flex flex-col justify-center z-[100]">
    <header
      class="h-[10vh] flex items-center justify-between bg-[#fff] rounded-[50px] px-4 mx-2"
    >
      <div class="logo h-full flex items-center">
        <router-link :to="{ name: 'Home' }">
          <img src="../assets/tree.png" class="w-[40px] h-[50px]" alt="" />
        </router-link>
      </div>
      <div class="flex items-center gap-2">
        <div
          class="flex items-center gap-1 border rounded-xl p-2 cursor-pointer"
          @click="toggleShareComponent"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            style="fill: rgba(0, 0, 0, 1); transform: ; msfilter: "
          >
            <path
              d="M5.5 15a3.51 3.51 0 0 0 2.36-.93l6.26 3.58a3.06 3.06 0 0 0-.12.85 3.53 3.53 0 1 0 1.14-2.57l-6.26-3.58a2.74 2.74 0 0 0 .12-.76l6.15-3.52A3.49 3.49 0 1 0 14 5.5a3.35 3.35 0 0 0 .12.85L8.43 9.6A3.5 3.5 0 1 0 5.5 15zm12 2a1.5 1.5 0 1 1-1.5 1.5 1.5 1.5 0 0 1 1.5-1.5zm0-13A1.5 1.5 0 1 1 16 5.5 1.5 1.5 0 0 1 17.5 4zm-12 6A1.5 1.5 0 1 1 4 11.5 1.5 1.5 0 0 1 5.5 10z"
            ></path>
          </svg>
          <p>Share</p>
        </div>
        <div
          @click="logOut"
          class="flex items-center gap-1 border rounded-xl p-2 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            style="fill: rgba(0, 0, 0, 1); transform: ; msfilter: "
          >
            <path d="M16 13v-2H7V8l-5 4 5 4v-3z"></path>
            <path
              d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z"
            ></path>
          </svg>
          Log out
        </div>
      </div>
    </header>
  </div>
</template>

<script lang="ts" setup>
import { useShareComponent } from "../../composables/utils/showHide";
import { useRouter } from "vue-router";
const { toggleShareComponent } = useShareComponent();
const router = useRouter();
const logOut = () => {
  localStorage.clear();
  router.push("/");
};
</script>
