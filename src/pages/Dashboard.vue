<template>
  <div class="bg-grey min-h-screen w-full py-2">
    <TheHeader />
  </div>
</template>

<script lang="ts" setup>
import { useTitle } from "vue-page-title";
import TheHeader from "../components/TheHeader.vue";
const { title } = useTitle("Dashboard");
</script>
