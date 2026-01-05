<template>
    <div class="flex items-baseline text-6xl sm:text-7xl justify-center flex-wrap border-2 p-4 rounded-2xl">
        <h1 class="flex font-mono tracking-widest">
            CONJ
        </h1>
        <h1 class="hidden sm:flex font-mono tracking-widest">
            UGATION
        </h1>
    </div>
    <div class="flex mt-30 items-center justify-center">
        <ConjSearchBar custom-classes="border-2 text-2xl border-gray-300 p-2 rounded w-full" auto-text-size="text-lg" />
    </div>
</template>
<script setup>
    import ConjSearchBar from '@/components/ConjSearchBar.vue';

</script>