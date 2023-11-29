<template>
  <form class="bg-[#fff] rounded-lg p-4 shadow border border-gray-200 mb-3" @submit.prevent="editLink(link._id)">
    <div class="w-full flex items-center justify-between">
      <h2 class="font-semibold text-xl">{{ `Link #${index}` }}</h2>
      <button type="button" class="ml-auto cursor-pointer mb-2" @click="enableUpdateLink" aria-label="Update link">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          style="fill: #164081; transform: ; msfilter: "
        >
          <path
            d="M19.045 7.401c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.378-.378-.88-.586-1.414-.586s-1.036.208-1.413.585L4 13.585V18h4.413L19.045 7.401zm-3-3 1.587 1.585-1.59 1.584-1.586-1.585 1.589-1.584zM6 16v-1.585l7.04-7.018 1.586 1.586L7.587 16H6zm-2 4h16v2H4z"
          ></path>
        </svg>
      </button>
    </div>
    <div class="py-4 flex flex-col gap-3">
      <div class="flex flex-col gap-1">
        <label for="title" class="font-bold">Title: </label>
        <input
          type="text"
          v-model="link.title"
          class="capitalize w-full outline-none rounded-md border border-gray-400 bg-transparent h-[48px] px-2"
          :disabled="enableEdit"
          id="title"
          name="title"
          ref="title"
        />
      </div>
      <div class="flex flex-col gap-1">
        <label for="link" class="font-bold">Link: </label>
        <input
          type="text"
          v-model="link.link"
          class="font-medium w-full break-words outline-none rounded-md border border-gray-400 bg-transparent h-[48px] px-2"
          :disabled="enableEdit"
          name="link"
          id="link"
        />
        <span class="text-[12px] text-red-500" v-if="showLinkIsInvalid">
          Link should be a valid URL
        </span>
      </div>
    </div>
    <div class="mt-4 flex items-center justify-between">
      <button
        class="bg-primary rounded-md py-2 px-4 text-[#fff] text-[14px]"
        v-if="!enableEdit"
        type="submit"
      >
        {{ updating ? "Updating..." : "Update" }}
      </button>
      <button class="ml-auto cursor-pointer" @click="deleteCurentLink(link._id)" aria-label="Delete link" type="button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          style="fill: #164081; transform: ; msfilter: "
        >
          <path
            d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"
          ></path>
          <path d="M9 10h2v8H9zm4 0h2v8h-2z"></path>
        </svg>
      </button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { PropType, ref } from "vue";
import { isValidUrl } from "../composables/utils/validURL";
import useDeleteLink from '../composables/Link/delete'
import useUpdateLink from '../composables/Link/update'

interface Link {
  _id: string;
  title: string;
  link: string;
}
const props = defineProps({
  link: {
    type: Object as PropType<Link>,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  }
});

const { deleteLink } = useDeleteLink()
const { updateLink, updating, showLinkIsInvalid } = useUpdateLink()


const enableEdit = ref<boolean>(true);
const title = ref<HTMLInputElement | null>(null)

const deleteCurentLink = async (id: string) => {
    await deleteLink(id)
};
const enableUpdateLink = () => {
  enableEdit.value = !enableEdit.value;
  if(!enableEdit.value){
    title.value?.focus()
  }
};
const editLink = async (id: string) => {
  const { link, title } = props.link;
  const data = {id, link, title}
  const isLinkValid = isValidUrl(link);
  if (isLinkValid) {
    await updateLink(data)
    enableUpdateLink()
  } else {
    showLinkIsInvalid.value = true;
    setTimeout(() => {
      showLinkIsInvalid.value = false;
    }, 2000);
  }
};
</script>
