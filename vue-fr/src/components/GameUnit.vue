<template>
    <div class="grid grid-cols-[1fr_3fr] py-1 pl-3 pr-2 items-center rounded-lg border-2 border-gray-300 dark:border-gray-600">
        <p class="text-xl">{{ label }}</p>
        <div v-if="!isImperatif" class="grid grid-cols-2 gap-2 items-baseline">
            <div class="relative">
                <span class="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none select-none">
                    {{ pronoun }}
                </span>
                <input type="text" spellcheck="false" class="border-1 p-2 pl-12 w-full border-gray-500/60 dark:border-gray-400/80 rounded" />
            </div>
            <div v-if="hasSecondary" class="relative">
                <span class="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none select-none">
                    {{ pronoun }}
                </span>
                <input type="text" spellcheck="false" class="border-1 p-2 pl-12 w-full border-gray-500/60 dark:border-gray-400/80 rounded" />
            </div>
        </div>
        <div v-else class="grid grid-flow-col grid-rows-3 grid-cols-2 gap-2 items-baseline">
            <div class="flex items-baseline">
                <input type="text" placeholder="(tu)" spellcheck="false" class="border-1 p-2 w-full border-gray-500/60 dark:border-gray-400/80 rounded" />
                <span class="text-xl pl-2">{{hasSecondary ? "," : "!"}}</span>
            </div>
            <div class="flex items-baseline">
                <input type="text" placeholder="(nous)" spellcheck="false" class="border-1 p-2 w-full border-gray-500/60 dark:border-gray-400/80 rounded" />
                <span class="text-xl pl-2">{{hasSecondary ? "," : "!"}}</span>
            </div>
            <div class="flex items-baseline">
                <input type="text" placeholder="(vous)" spellcheck="false" class="border-1 p-2 w-full border-gray-500/60 dark:border-gray-400/80 rounded" />
                <span class="text-xl pl-2">{{hasSecondary ? "," : "!"}}</span>
            </div>

            <div v-if="hasSecondary" class="flex items-baseline">
                <input type="text" placeholder="(tu)" spellcheck="false" class="border-1 p-2 w-full border-gray-500/60 dark:border-gray-400/80 rounded" /><span class="text-xl pl-2">!</span>
            </div>
            <div v-if="hasSecondary" class="flex items-baseline">
                <input type="text" placeholder="(nous)" spellcheck="false" class="border-1 p-2 w-full border-gray-500/60 dark:border-gray-400/80 rounded" /><span class="text-xl pl-2">!</span>
            </div>
            <div v-if="hasSecondary" class="flex items-baseline">
                <input type="text" placeholder="(vous)" spellcheck="false" class="border-1 p-2 w-full border-gray-500/60 dark:border-gray-400/80 rounded" /><span class="text-xl pl-2">!</span>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { tenseCheckList } from '@/utils/tenseLists';

    const props = defineProps({
        hasSecondary: Boolean,
        tense: String,
        pronoun: String,
    });

    const label = tenseCheckList.find(x => x.id === props.tense).label;

    const isImperatif = props.tense === 'imperatif' || props.tense === 'passe_imperatif';
    
</script>