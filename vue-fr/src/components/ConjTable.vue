<template>
    <div class="flex flex-col mb-[14px]">
        <h3 class="text-2xl justify-center text-center my-2 text-sky-700 dark:text-amber-500">{{ title }}</h3>
        <div class="flex gap-4">
          <div>
            <div class="mt-7">
              <div class="px-1 border-2 rounded-lg border-gray-300 dark:border-gray-200 font-bold text-right" >
                <div>je</div>
                <div>tu</div>
                <div>il/elle/on</div>
                <div>nous</div>
                <div>vous</div>
                <div>ils/elles</div>
              </div>
            </div>
          </div>
          <div class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-content-center">
            <ConjItem
              v-for="(pattern, title) in filteredPatterns"
              :key="title"
              :title="title"
              :pattern="pattern"
              :conjugations="props.conjugations"
              :secondary="props.secondary[pattern]"
            />
          </div>
        </div>
    </div>
</template>
<script setup>
    import ConjItem from '@/components/ConjItem.vue';
    import { computed } from 'vue';
    import { useStorage } from '@vueuse/core';

    const props = defineProps(['title', 'patterns', 'conjugations', 'rare', 'secondary']);

    const showRare = useStorage('showRare', true);
    const filteredPatterns = computed(() => {
        return showRare.value ? props.patterns : Object.fromEntries(
            Object.entries(props.patterns).filter(([key, value]) => !props.rare.has(value))
        );
    });

</script>