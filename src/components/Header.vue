<template>
  <header class="lg:py-4">
    <div class="flex items-center justify-between w-[90%] mx-auto">
      <div class="logo">
        <router-link :to="{ name: 'Home' }">
          <h1 class="font-black text-xl lg:text-3xl">
            Linkbum<span class="text-green text-5xl">.</span>
          </h1>
        </router-link>
      </div>
    </div>
  </header>
</template>
