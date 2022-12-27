<template>
  <div class="bg-[#fff] rounded-lg w-full p-4">
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
    <form class="flex flex-col gap-2 py-4" @submit.prevent="addLink">
      <div class="flex flex-col gap-1">
        <label for="title" class="font-medium">Title</label>
        <input
          type="text"
          v-model="form.title"
          class="bg-grey h-[48px] outline-none px-2 rounded-md text-[14px]"
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
        <span class="text-[12px] text-red-500" v-if="showLinkIsInvalid"
          >Link should be a valid URL</span
        >
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
import postData from "../../composables/post/postData";
import { isValidUrl } from "../../composables/utils/validURL";
import { useToast } from "vue-toastification";
const { toggleAddLinkComponent } = useAddLinkComponent();
const loading = ref<boolean>(false);
const toast = useToast();
const form = reactive({
  title: "",
  link: "",
});
const showLinkIsInvalid = ref<boolean>(false);
const emit = defineEmits(["linkAdded"]);
const addLink = () => {
  const isLinkValid = isValidUrl(form.link);
  if (isLinkValid) {
    loading.value = true;
    postData("api/link/post", form)
      .then((result) => {
        loading.value = false;
        if (result.data.sucess === true) {
          toggleAddLinkComponent();
          toast.success(result.data.message, {
            timeout: 3000,
          });
          form.link = "";
          form.title = "";
          emit("linkAdded");
        } else {
          toast.error(result.data.message, {
            timeout: 3000,
          });
        }
      })
      .catch((err) => {
        toast.error(
          err.response.data.title || err.response.data.link || err.response.data.error,
          {
            timeout: 3000,
          }
        );
        loading.value = false;
      });
  } else {
    showLinkIsInvalid.value = true;
  }
};
</script>
