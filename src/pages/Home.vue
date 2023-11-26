<template>
  <header class="min-h-screen bg-grey h-screen">
    <nav class="h-[10vh] bg-white w-full">
      <div class="w-[90%] mx-auto flex items-center justify-between py-4">
        <Logo />
        <router-link :to="{ name: 'login' }" class=" bg-primary rounded-[10px] text-[#ffff] flex items-center justify-center px-8 py-2 font-black tracking-wider" aria-label="Go to login page" role="link">
          Login
        </router-link>
      </div>
    </nav>
    <!-- Hero -->
    <section class="w-[90%] mx-auto flex flex-col md:flex-row items-center justify-between min-h-screen md:h-[80vh] md:min-h-[80vh] bg-grey gap-16 pt-10 pb-20 md:pt-0 md:pb-0">
      <div class="w-full md:w-1/2 order-2 md:order-1 flex flex-col items-start">
        <h1
          class="font-bold text-primary pb-1 tracking-wider"
        >
          Boost your online presence
        </h1>
        <p class="text-3xl font-black pb-6 leading-10">
          Gather your links to one single link and connect audiences to all of your content with just that link
        </p>
        <p class="text-black border-l-[4px] border-primary pl-3 font-semibold mb-8">Get your personalized link and share across all your favourite social media for free</p>
        <router-link
          :to="{ name: 'register' }"
          class="h-[48px] bg-primary rounded-[10px] text-[#ffff] flex items-center justify-center px-10 font-black tracking-wider" aria-label="Go to get started page"
          >Get Started</router-link
        >
      </div>
      <div class="w-full md:w-1/2 order-1 md:order-2 flex items-center justify-center">
        <img src="../assets/undraw_buffer_wq43.svg" class="object-contain w-[90%] h-full md:w-[70%]" alt="share your link to all social media image"/>
      </div>
    </section>
  </header>
</template>

<script lang="ts" setup>
import Logo from "../components/Logo.vue";
import { useTitle } from "vue-page-title";
const { title } = useTitle("The Only Link You'll Ever Need");
</script>
