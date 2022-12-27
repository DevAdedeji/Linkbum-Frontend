<template>
  <header class="h-[10vh]">
    <div class="flex items-center justify-between w-[90%] mx-auto">
      <div class="logo flex items-center justify-center">
        <router-link :to="{ name: 'Home' }" class="py-2">
          <img src="../assets/tree.png" class="w-[40px] h-[50px]" alt="" />
        </router-link>
      </div>
    </div>
  </header>
</template>
