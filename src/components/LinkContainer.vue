<template>
  <div class="bg-[#fff] rounded-lg p-4 shadow border border-gray-200 mb-3">
    <div class="w-full flex items-center justify-between mb-2">
      <h2 class="font-semibold text-xl">{{ `Link #${index}` }}</h2>
      <button class="ml-auto cursor-pointer mb-2" @click="enableUpdateLink" aria-label="Update link">
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
    <div class="flex flex-col">
      <label for="title" class="font-bold">Title: </label>
      <input
        type="text"
        v-model="link.title"
        class="capitalize w-full outline-none rounded-md"
        :class="enableEdit ? 'outline-none' : 'border border-gray-400 bg-transparent h-[48px] px-2'"
        :disabled="enableEdit"
        id="title"
        name="title"
      />
    </div>
    <div class="flex flex-col my-2">
      <label for="link" class="font-bold">Link: </label>
      <input
        type="text"
        v-model="link.link"
        class="font-medium text-[14px] sm:text-[16px] w-full break-words outline-none rounded-md"
        :class="enableEdit ? 'outline-none' : 'border border-gray-400 bg-transparent h-[48px] px-2'"
        :disabled="enableEdit"
        name="link"
        id="link"
      />
    </div>
    <span class="text-[12px] text-red-500" v-if="showLinkIsInvalid"
      >Link should be a valid URL</span
    >
    <div class="mt-4 flex items-center justify-between">
      <button
        @click="updateLink(link._id)"
        class="bg-primary rounded-md py-2 px-4 text-[#fff] text-[14px]"
        v-if="!enableEdit"
      >
        {{ updating ? "Updating..." : "Update" }}
      </button>
      <button class="ml-auto cursor-pointer" @click="deleteCurentLink(link._id)" aria-label="Delete link">
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
  </div>
</template>

<script lang="ts" setup>
import useRequest from '../composables/requests';
import { useToast } from "vue-toastification";
import { PropType, ref } from "vue";
import { isValidUrl } from "../composables/utils/validURL";
const toast = useToast();
const {deleteData, putData} = useRequest()
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
const emit = defineEmits(["linkDeleted", "linkUpdated"]);
const enableEdit = ref<boolean>(true);
const updating = ref<boolean>(false);
const showLinkIsInvalid = ref<boolean>(false);

const deleteCurentLink = (id: string) => {
  deleteData(`api/link/post/${id}`)
    .then((result) => {
      if (result.data.success === true) {
        toast.success(result.data.message, {
          timeout: 3000,
        });
        emit("linkDeleted");
      } else {
        toast.error(result.data.message, {
          timeout: 3000,
        });
      }
    })
    .catch((err) => {
      toast.error(
        err.response.data.title ||
          err.response.data.link ||
          err.response.data.error ||
          err.response.data.message ||
          "Something went wrong, pls try again",
        {
          timeout: 3000,
        }
      );
    });
};

const enableUpdateLink = () => {
  enableEdit.value = !enableEdit.value;
};
const updateLink = (id: string) => {
  const { link, title } = props.link;
  const isLinkValid = isValidUrl(link);
  if (isLinkValid) {
    updating.value = true;
    putData(`api/link/post/${id}`, { link, title })
      .then((result) => {
        updating.value = false;
        showLinkIsInvalid.value = false;
        if (result.data.success) {
          toast.success(result.data.message, {
            timeout: 3000,
          });
          enableEdit.value = true;
          emit("linkUpdated");
        } else {
          toast.success(result.data.message, {
            timeout: 3000,
          });
        }
      })
      .catch((err) => {
        updating.value = false;
        if (err) {
          toast.error(
            err.response.data.title ||
              err.response.data.link ||
              err.response.data.error ||
              err.response.data.message ||
              "Something went wrong, pls try again",
            {
              timeout: 3000,
            }
          );
        }
      });
  } else {
    showLinkIsInvalid.value = true;
    setTimeout(() => {
      showLinkIsInvalid.value = false;
    }, 2000);
  }
};
</script>
