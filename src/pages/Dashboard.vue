<template>
  <div class="relative bg-grey min-h-screen w-full">
    <TheHeader class="fixed left-0 right-0 top-0" />
    <!-- <div class="h-[150vh] bg-red-500"></div> -->
  </div>
</template>

<script lang="ts" setup>
import { useTitle } from "vue-page-title";
import TheHeader from "../components/TheHeader.vue";
const { title } = useTitle("Dashboard");
</script>
