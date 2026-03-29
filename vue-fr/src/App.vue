<template>
    <div class="min-h-screen flex flex-col selection:bg-sky-200/80 dark:selection:bg-gray-500/50">

	<NavbarItem />

	<div class="flex-grow px-4 py-1 bg-white dark:bg-[#202020] dark:text-[#DBDBDB]">
	    <main class="my-4 mx-auto lg:min-w-[85rem] max-w-[85rem] pt-16">
		<RouterView />
	    </main>
	</div>
	<footer class="font-mono text-center p-4 bg-gray-100 dark:bg-[#181818] dark:text-[#DBDBDB]">
	    © 2026 Hashim - Built with Vue
	</footer>
    </div>
</template>
<script setup>
  import NavbarItem from '@/components/NavbarItem.vue';
</script>
