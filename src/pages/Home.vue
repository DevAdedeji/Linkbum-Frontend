<template>
  <div class="min-h-screen bg-[#ffff] h-screen">
    <Header class="pb-40" />
    <div class="w-full flex flex-col items-center justify-center">
      <h1
        class="text-5xl md:text-7xl font-bold text-center text-dark max-w-[700px] mx-auto pb-5"
      >
        The Only <span class="text-green">Link</span> You'll Ever Need
      </h1>
      <p class="text-xl text-center font-black pb-5">
        Connect audiences to all of your content with just one link
      </p>
      <router-link
        :to="{ name: 'login' }"
        class="h-[48px] bg-green rounded-[10px] text-[#ffff] flex items-center justify-center px-5"
        >Get Started</router-link
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import Header from "../components/Header.vue";
import { useTitle } from "vue-page-title";
const { title } = useTitle("The Only Link You'll Ever Need");
</script>
