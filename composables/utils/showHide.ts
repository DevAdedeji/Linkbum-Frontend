import { ref } from "vue";
let showPassword = ref<boolean>(true);
export const usePassword = () => {
  const togglePassword = ()=>{
    showPassword.value = !showPassword.value;
  }
  return {showPassword, togglePassword};
};


const showAddLinkComponent = ref<boolean>(false);
export const useAddLinkComponent = ()=>{
  const toggleAddLinkComponent = ()=>{
    showAddLinkComponent.value = !showAddLinkComponent.value
  }
  return {showAddLinkComponent, toggleAddLinkComponent};
}