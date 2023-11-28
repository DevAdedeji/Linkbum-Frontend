import { ref } from "vue";
let showPassword = ref<boolean>(true);
export const usePassword = () => {
  const togglePassword = ()=>{
    showPassword.value = !showPassword.value;
  }
  return {showPassword, togglePassword};
};


const showShareComponent = ref<boolean>(false)
export const useShareComponent = () =>{
  const toggleShareComponent = ()=>{
    showShareComponent.value = !showShareComponent.value
  }
  return {showShareComponent, toggleShareComponent}
}