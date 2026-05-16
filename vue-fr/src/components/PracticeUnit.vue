<template>
    <div class="grid md:grid-cols-[1fr_3fr] py-1 pl-3 pr-2 not-md:text-lg items-center rounded-lg border-2 border-gray-300 dark:border-gray-600">
        <p class="md:text-lg text-xl not-md:my-2">{{ label }}</p>
        <div v-if="!isImperatif" class="grid md:grid-cols-2 gap-2 items-baseline">
            <div class="relative">
                <span class="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none select-none">
                    {{ childPronoun }}
                </span>
		<input type="text" :id="`${tense}${hasSecondary ? '-0':''}`" @input="e => handleInput(e, val => ans.primary = val)" v-model="ans.primary" autocomplete="off" spellcheck="false" class="border-1 p-2 pl-12 w-full border-gray-500/60 dark:border-gray-400/80 rounded" />
            </div>
            <div v-if="hasSecondary" class="relative">
                <span class="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none select-none">
                    {{ childPronoun }}
                </span>
                <input type="text" :id="`${tense}-1`" v-model="ans.secondary" autocomplete="off" spellcheck="false" class="border-1 p-2 pl-12 w-full border-gray-500/60 dark:border-gray-400/80 rounded" />
            </div>
        </div>
        <div v-else class="grid grid-flow-col grid-rows-3 md:grid-cols-2 gap-2 items-baseline">
            <div v-for="(_ , impPronoun) in ans.primary" :key="impPronoun" class="flex items-baseline">
		<input type="text" :id="`${tense}-${impPronoun}${hasSecondary ? '-0': ''}`"  :placeholder="`(${impPronoun})`" v-model="ans.primary[impPronoun]" autocomplete="off" spellcheck="false" class="border-1 p-2 w-full border-gray-500/60 dark:border-gray-400/80 rounded" />
                <span class="text-xl pl-2">{{ans.secondary && Object.hasOwn(ans.secondary, impPronoun) ? ',' : '!'}}</span>
            </div>
            
            <div v-if="hasSecondary" v-for="(_ , impPronoun) in ans.primary" :key="impPronoun">
                <div v-if="ans.secondary[impPronoun] !== undefined" class="flex items-baseline">
		    <input type="text" :id="`${tense}-${impPronoun}-1`" :placeholder="`(${impPronoun})`" v-model="ans.secondary[impPronoun]" autocomplete="off" spellcheck="false" class="border-1 p-2 w-full border-gray-500/60 dark:border-gray-400/80 rounded" /><span class="text-xl pl-2">!</span>
                </div>
                <div v-else></div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { tenseCheckList } from '@/utils/tenseLists';
    import { frenchAccentMap, checkImperatif, normalizeAccent } from '@/utils/helper';
    import { ref, watch } from 'vue';
    
    const props = defineProps({
        tense: String,
        ans: Object,
        hasSecondary: Boolean,
        pronoun: String,
    });

    const childPronoun = ref(props.pronoun);

    // Adds cool je to j' behavior
    watch(() => props.ans.primary, (newV, oldV) => {
        if(props.pronoun !== 'je' || props.ans.primary === null || (newV?.[0] === oldV?.[0])) return;

        if ("aeiou".includes(normalizeAccent(newV[0]))) {
            childPronoun.value = "j'";
            return;
        }

        childPronoun.value = props.pronoun;
    });

    const isImperatif = checkImperatif(props.tense);
    const label = tenseCheckList.find(x => x.id === props.tense).label;

    // Adds accented characters from key patterns
    function handleInput(event, updateModel) {
        const el = event.target
        const pos = el.selectionStart
        const before = el.value.slice(0, pos)
        const after = el.value.slice(pos)

        for(const [pattern, replacement] of Object.entries(frenchAccentMap)){
            if (before.endsWith(pattern)) {
                const newVal = before.slice(0, -2) + replacement + after
                updateModel(newVal);
                // put cursor right after the inserted character
                requestAnimationFrame(() => {
                    el.selectionStart = el.selectionEnd = pos - 1
                })

                return;
            }
        }
    }

</script>
