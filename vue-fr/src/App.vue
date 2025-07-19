<template>
  <div class="selection:bg-green-200 dark:selection:bg-gray-500/50">
    <NavbarItem />
    <div class="px-4 py-1 bg-white dark:bg-[#202020] dark:text-[#DBDBDB]">
      <main class="my-4 mx-auto max-w-7xl pt-16">
        <RouterView />
      </main>
    </div>
  </div>
  
  
</template>
<script setup>
  import NavbarItem from '@/components/NavbarItem.vue';
</script>