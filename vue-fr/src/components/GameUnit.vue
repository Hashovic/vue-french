<template>
    <div class="grid grid-cols-[1fr_3fr] py-1 pl-3 pr-2 items-center rounded-lg border-2 border-gray-300 dark:border-gray-600">
        <p class="text-lg">{{ label }}</p>
        <div v-if="!isImperatif" class="grid grid-cols-2 gap-2 items-baseline">
            <div class="relative">
                <span class="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none select-none">
                    {{ pronoun }}
                </span>
                <input type="text" v-model="ans.primary" spellcheck="false" class="border-1 p-2 pl-12 w-full border-gray-500/60 dark:border-gray-400/80 rounded" />
            </div>
            <div v-if="hasSecondary" class="relative">
                <span class="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none select-none">
                    {{ pronoun }}
                </span>
                <input type="text" v-model="ans.secondary" spellcheck="false" class="border-1 p-2 pl-12 w-full border-gray-500/60 dark:border-gray-400/80 rounded" />
            </div>
        </div>
        <div v-else class="grid grid-flow-col grid-rows-3 grid-cols-2 gap-2 items-baseline">
            <div v-for="(_ , impPronoun) in ans.primary" :key="impPronoun" class="flex items-baseline">
                <input type="text" :placeholder="`(${impPronoun})`" v-model="ans.primary[impPronoun]" spellcheck="false" class="border-1 p-2 w-full border-gray-500/60 dark:border-gray-400/80 rounded" />
                <span class="text-xl pl-2">{{hasSecondary ? "," : "!"}}</span>
            </div>

            <div v-if="hasSecondary" v-for="(_ , impPronoun) in ans.secondary" :key="impPronoun" class="flex items-baseline">
                <input type="text" :placeholder="`(${impPronoun})`" v-model="ans.secondary[impPronoun]" spellcheck="false" class="border-1 p-2 w-full border-gray-500/60 dark:border-gray-400/80 rounded" /><span class="text-xl pl-2">!</span>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { tenseCheckList } from '@/utils/tenseLists';

    const props = defineProps({
        tense: String,
        ans: Object,
        hasSecondary: Boolean,
        pronoun: String,
    });


    const isImperatif = props.tense === 'imperatif' || props.tense === 'passe_imperatif';
    const label = tenseCheckList.find(x => x.id === props.tense).label;

</script>