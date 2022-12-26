import { ref } from "vue";
let showPassword = ref<boolean>(true);
export const usePassword = () => {
  const togglePassword = ()=>{
    showPassword.value = !showPassword.value;
  }
  return {showPassword, togglePassword};
};

