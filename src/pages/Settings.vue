<template>
  <div class="relative bg-grey min-h-screen">
    <TheHeader class="sm:fixed sm:left-0 sm:right-0 sm:top-0" />
    <ShareComponent v-if="showShareComponent" />
    <section class="py-4 sm:pt-[15vh] sm:pb-[5vh]">
      <div class="py-6">
        <h2 class="text-3xl text-center">My Account</h2>
      </div>
      <div class="bg-[#fff] w-[90%] md:w-[70%] lg:w-[50%] mx-auto rounded-[10px] p-5">
        <form class="mb-5 pb-5 border-b border-[#e9e9e9]">
          <div class="flex gap-2">
            <div class="w-[100px] h-[100px] rounded-[50%]">
              <img :src="profilePic" class="w-full h-full rounded-[50%]" id="userDP" />
            </div>

            <label
              for="profilePic"
              class="bg-green rounded-md py-1 px-2 text-[#fff] self-end cursor-pointer"
              >Change Photo</label
            >
            <input
              type="file"
              accept="image/*"
              name="profilePic"
              id="profilePic"
              class="hidden"
            />
          </div>
        </form>
        <form class="flex flex-col gap-4 w-full" @submit.prevent="updateUserInfo">
          <div class="flex flex-col gap-2">
            <p class="text-[12px]">Username</p>
            <input
              type="text"
              v-model="user.username"
              class="capitalize border-b border-[#e9e9e9] pb-2 outline-none"
            />
          </div>
          <div class="flex flex-col gap-2">
            <p class="text-[12px]">Email</p>
            <input
              type="text"
              v-model="user.email"
              class="border-b border-[#e9e9e9] pb-2 outline-none"
            />
          </div>
          <div class="flex flex-col gap-2">
            <p class="text-[12px]">Bio</p>
            <textarea
              id=""
              cols="10"
              rows="5"
              class="outline-none border border-[#e9e9e9] p-2"
              v-model="user.bio"
              >{{ user.bio }}</textarea
            >
          </div>
          <button class="rounded-[10px] bg-green text-[#fff] py-3 w-[50%] md:w-[30%]">
            {{ updating ? "Updating..." : "Update Details" }}
          </button>
        </form>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import axios from "axios";
import TheHeader from "../components/TheHeader.vue";
import { useTitle } from "vue-page-title";
import ShareComponent from "../components/ShareComponent.vue";
import { useShareComponent } from "../../composables/utils/showHide";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import getData from "../../composables/Services/get/getData";
import putData from "../../composables/Services/put/putData";
const { title } = useTitle("Account Settings");
const { showShareComponent } = useShareComponent();
const toast = useToast();
const router = useRouter();
const loading = ref<boolean>(true);
const user = ref({
  username: "",
  email: "",
  bio: "",
});
const profilePic = ref("");
const updating = ref<boolean>(false);
const getUserData = () => {
  let token = localStorage.getItem("auth.linkbum");
  axios.defaults.headers.common["Authorization"] = `${token}`;
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
  updating.value = true;
  putData("api/user/me", form)
    .then((result) => {
      updating.value = false;
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
      updating.value = false;
      toast.error(
        err.response.data.username || err.response.data.email || err.response.data.error,
        {
          timeout: 3000,
        }
      );
    });
};

// const upload = async (e: Event) => {
//   let file = document.getElementById("profilePic")?.files[0];
//   const fileReader = new FileReader();
//   fileReader.readAsDataURL(file);
//   fileReader.onload = (e) => {
//     document.getElementById("userDP").src = e.target?.result;
//   };
//   let form = new FormData();
//   form.append("file", file);
//   await putData("api/user/me/profile-picture", form)
//     .then((result) => {
//       if (result.data.success) {
//         toast.success(result.data.message, {
//           timeout: 3000,
//         });
//         getUserData();
//       } else {
//         toast.success(result.data.message, {
//           timeout: 3000,
//         });
//       }
//     })
//     .catch((err) => {
//       toast.error(err.response.data.error, {
//         timeout: 3000,
//       });
//     });
// };
</script>
