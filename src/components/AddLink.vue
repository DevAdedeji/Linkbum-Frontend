<template>
  <div class="bg-[#fff] rounded-lg w-full p-4">
    <div class="flex items-center justify-between">
      <p class="font-semibold">Add Link</p>
      <button @click="toggleAddLinkComponent">X</button>
    </div>
    <form class="flex flex-col gap-2 py-4" @submit.prevent="addLink">
      <div class="flex flex-col gap-1">
        <label for="title" class="font-medium">Title</label>
        <input
          type="text"
          v-model="form.title"
          class="bg-grey h-[48px] outline-none px-2 rounded-md"
          required
        />
      </div>
      <div class="flex flex-col gap-1">
        <label for="title" class="font-medium">Link</label>
        <input
          type="text"
          class="bg-grey h-[48px] outline-none px-2 rounded-md text-[14px]"
          v-model="form.link"
          required
        />
      </div>
      <button
        type="submit"
        class="bg-green text-[#fff] font-bold h-[48px] rounded-md mt-4 hover:scale-x-95 duration-500 flex items-center justify-center"
      >
        <span v-if="!loading">Add</span>
        <LoaderVue v-if="loading" />
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { useAddLinkComponent } from "../../composables/utils/showHide";
import { ref, reactive } from "vue";
import LoaderVue from "./Loader.vue";
const { toggleAddLinkComponent } = useAddLinkComponent();
const loading = ref<boolean>(false);
const form = reactive({
  title: "",
  link: "",
});
const addLink = () => {
  loading.value = true;
};
</script>
