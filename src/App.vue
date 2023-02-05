<template>
  <div v-if="!isOnLine" class="bg-red-500 text-white py-3 text-center">
    No internet connection
  </div>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, onBeforeUnmount, watch } from "vue";

const isOnLine = ref<boolean>(true);

onBeforeMount(() => {
  window.addEventListener("online", () => {
    isOnLine.value = true;
  });
  window.addEventListener("offline", () => {
    isOnLine.value = false;
  });
});
onBeforeUnmount(() => {
  window.removeEventListener("online", () => {});
  window.removeEventListener("offline", () => {});
});

watch(isOnLine, (newVal) => {
  isOnLine.value = newVal;
});
</script>

<style scoped></style>
