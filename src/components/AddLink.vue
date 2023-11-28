<template>
  <div class="bg-[#fff] border border-gray-200 shadow rounded-lg w-full p-4">
    <div class="flex items-center justify-between">
      <p class="font-semibold">Add Link</p>
      <button @click="toggleAddLinkComponent">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          style="fill: rgba(0, 0, 0, 1); transform: ; msfilter: "
        >
          <path
            d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"
          ></path>
        </svg>
      </button>
    </div>
    <form class="flex flex-col gap-2 py-4" @submit.prevent="createLink">
      <div class="flex flex-col gap-1">
        <label for="title" class="font-medium">Title</label>
        <input
          type="text"
          v-model="form.title"
          class="border border-gray-400 bg-transparent h-[48px] outline-none px-2 rounded-md text-[14px]"
          name="title"
          id="title"
          required
        />
      </div>
      <div class="flex flex-col gap-1">
        <label for="link" class="font-medium">Link</label>
        <input
          type="text"
          class="border border-gray-400 bg-transparent h-[48px] outline-none px-2 rounded-md text-[14px]"
          v-model="form.link"
          name="link"
          id="link"
          required
        />
        <span class="text-[12px] text-red-500" v-if="showLinkIsInvalid"
          >Link should be a valid URL</span
        >
      </div>
      <button
        type="submit"
        class="bg-primary text-[#fff] font-bold h-[48px] rounded-md mt-4 hover:scale-x-95 duration-500 flex items-center justify-center"
      >
        <span v-if="!loading">Add</span>
        <LoaderVue v-if="loading" />
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import useLink from "../composables/Link";
import LoaderVue from "./custom/Loader.vue";
import useCreateLink from '../composables/Link/create'

const { toggleAddLinkComponent } = useLink()
const { loading, form, createLink, showLinkIsInvalid } = useCreateLink()

</script>
