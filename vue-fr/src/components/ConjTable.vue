<template>
    <div class="flex flex-col">
        <h3 class="text-2xl justify-center text-center underline underline-offset-2 my-2">{{ title }}</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-content-center">  
          <ConjItem
            v-for="(pattern, title) in patterns"
            :key="title"
            :title="title"
            :pattern="pattern"
            :conjugations="conjugations"
          />
        </div>
    </div>
</template>
<script setup>
    import ConjItem from './ConjItem.vue';
    defineProps(['title', 'patterns', 'conjugations']);

</script>