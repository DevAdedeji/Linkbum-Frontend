<template>
  <div class="relative bg-grey min-h-screen">
    <Navbar class="sm:fixed sm:left-0 sm:right-0 sm:top-0" />
    <ShareComponent v-if="showShareComponent" />
    <section class="py-4 sm:pt-[15vh] sm:pb-[5vh]">
      <div class="py-6">
        <h2 class="text-3xl text-center">My Account</h2>
      </div>
      <div v-if="loading" class="flex items-center justify-center py-10">
        <Loader />
      </div>
      <div
        class="bg-[#fff] w-[90%] md:w-[70%] lg:w-[50%] mx-auto rounded-[10px] p-5"
        v-else
      >
        <form class="mb-5 pb-5 border-b border-[#e9e9e9]">
          <div class="flex gap-2">
            <div class="!w-[100px] !h-[100px] rounded-[50%]">
              <img
                :src="profilePic"
                class="!w-full !h-full rounded-[50%]"
                id="userDP"
                ref="userDP"
                :alt="`${user.username} profile picture`"
              />
            </div>

            <label
              for="profilePic"
              class="bg-primary rounded-md py-1 px-2 text-[#fff] self-end cursor-pointer whitespace-nowrap font-bold tracing-wide"
              aria-label="Change photo button"
              >Change Photo</label
            >
            <input
              type="file"
              accept="image/*"
              @change="upload"
              name="profilePic"
              id="profilePic"
              ref="profilePicture"
              class="hidden"
            />
            <Loader3 v-if="updatingUserDP" />
          </div>
        </form>
        <form class="flex flex-col gap-4 w-full" @submit.prevent="updateUserInfo">
          <div class="flex flex-col gap-2">
            <label class="text-[12px]" for="username">Username</label>
            <input
              type="text"
              v-model="user.username"
              name="username"
              id="username"
              class="capitalize border border-gray-400 bg-transparent p-2 rounded outline-none"
            />
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-[12px]" for="email">Email</label>
            <input
              type="email"
              v-model="user.email"
              name="email"
              id="email"
              class="border border-gray-400 bg-transparent p-2 rounded outline-none"
            />
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-[12px]" for="bio">Bio</label>
            <textarea
              id="bio"
              cols="10"
              rows="5"
              class="outline-none border border-gray-400 bg-transparent rounded p-2"
              v-model="user.bio"
              name="bio"
              >{{ user.bio }}</textarea
            >
          </div>
          <button class="rounded-[10px] bg-primary font-bold tracking-wide text-[#fff] py-3 w-[50%] md:w-[30%]">
            {{ updatingUserInfo ? "Updating..." : "Update Details" }}
          </button>
        </form>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Navbar from "../components/Navbar.vue";
import { useTitle } from "vue-page-title";
import ShareComponent from "../components/ShareComponent.vue";
import { useShareComponent } from "../composables/utils/showHide";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import Loader from "../components/custom/Loader2.vue";
import Loader3 from "../components/custom/Loader3.vue";
import useRequest from '../composables/requests';

const { title } = useTitle("Account Settings");
const {getData, putData} = useRequest()
const { showShareComponent } = useShareComponent();
const toast = useToast();
const router = useRouter();
const loading = ref<boolean>(true);
const updatingUserDP = ref<boolean>(false);
const updatingUserInfo = ref<boolean>(false);
const user = ref({
  username: "",
  email: "",
  bio: "",
  profilePic: "",
});
const profilePic = ref("");

const profilePicture = ref<HTMLInputElement>() as any;
const userDP = ref<HTMLImageElement>() as any;
const getUserData = () => {
  getData(`api/user/me/details`)
    .then((result) => {
      loading.value = false;
      user.value = result.data;
      profilePic.value = result.data.profilePic;
    })
    .catch((err) => {
      loading.value = false;
      if (err.response.status === 404) {
        toast.error("User not found, redirected to homepage", {
          timeout: 3000,
        });
        router.push("/");
      } else {
        toast.error("Something went wrong, please try again", {
          timeout: 3000,
        });
        router.push("/");
      }
    });
};

getUserData();

const updateUserInfo = () => {
  let form = {};
  const { email, username, bio } = user.value;
  form = { email, username, bio };
  updatingUserInfo.value = true;
  putData("api/user/me", form)
    .then((result) => {
      updatingUserInfo.value = false;
      if (result.data.success) {
        localStorage.setItem("linkbum.username", result.data.user.username);
        toast.success(result.data.message, {
          timeout: 3000,
        });
        getUserData();
      } else {
        toast.success(result.data.message, {
          timeout: 3000,
        });
      }
    })
    .catch((err) => {
      updatingUserInfo.value = false;
      toast.error(
        err.response.data.username ||
          err.response.data.email ||
          err.response.data.error ||
          err.response.data.message ||
          "Something went wrong, pls try again",
        {
          timeout: 3000,
        }
      );
    });
};

const upload = async (e: Event) => {
  let file = profilePicture.value.files[0];
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  fileReader.onload = (e) => {
    userDP.value.src = e.target?.result;
  };
  let form = new FormData();
  form.append("file", file);
  updatingUserDP.value = true;
  await putData("api/user/me/profile-picture", form)
    .then((result) => {
      updatingUserDP.value = false;
      if (result.data.success) {
        toast.success(result.data.message, {
          timeout: 3000,
        });
        getUserData();
      } else {
        toast.success(result.data.message, {
          timeout: 3000,
        });
      }
    })
    .catch((err) => {
      userDP.value.src = user.value.profilePic;
      updatingUserDP.value = false;
      toast.error(
        err.response.data.error ||
          err.response.data.message ||
          "Something went wrong, pls try again",
        {
          timeout: 3000,
        }
      );
    });
};
</script>
