<template>
  <header class="py-4">
    <div class="flex items-center justify-between w-[90%] mx-auto">
      <div class="logo">
        <h1 class="font-black text-3xl">
          Linkbum<span class="text-green text-5xl">.</span>
        </h1>
      </div>
      <div class="hidden md:flex items-center gap-5 font-bold text-[16px]">
        <router-link
          :to="{ name: 'login' }"
          class="border border-green rounded-[10px] h-[48px] flex items-center justify-center px-7 hover:bg-green hover:text-[#fff]"
          >Log in</router-link
        >
        <router-link
          :to="{ name: 'register' }"
          class="bg-green text-[#fff] rounded-[10px] h-[48px] flex items-center justify-center px-7 hover:border hover:border-green hover:text-[#000] hover:bg-transparent"
          >Sign Up</router-link
        >
      </div>
    </div>
  </header>
</template>
