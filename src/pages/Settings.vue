<template>
  <div class="min-h-screen">
    <TheHeader class="sm:fixed sm:left-0 sm:right-0 sm:top-0" />
    <form @submit.prevent="upload" class="pt-4 sm:pt-[10vh]">
      <input type="file" accept="image/*" name="profilePic" id="profilePic" />
      <button>Upload</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import axios from "axios";
import TheHeader from "../components/TheHeader.vue";
const upload = async (e: Event) => {
  //   let file = document.getElementById("profilePic")?.files[0];
  //   let form = new FormData();
  //   form.append("file", file);
};
</script>
