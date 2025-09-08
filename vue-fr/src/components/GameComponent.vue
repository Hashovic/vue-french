<template>
    <div v-if="conj" class="w-5/8 mx-auto">
        <h2 class="text-4xl font-light "><span class="font-medium text-sky-700 dark:text-amber-500">Verb: </span>{{ conj.verb }}</h2>
        <div class="flex flex-row pb-3">
            <div class="w-5/6 flex flex-col sm:flex-row ml-2">
                <h3 class="text-xl mr-4"><span class="font-medium">Translation: </span>{{ conj.translation }}</h3>
                <h3 class="text-xl mr-4"><span class="font-medium">Pronoun: </span><span class="text-sky-700 dark:text-amber-500">{{ pronoun }}</span></h3>
            </div>
        </div>
        <form v-if="conj" class="grid grid-cols-1 py-1 gap-y-2">
            <GameUnit
                v-for="tense in showOrder"
                :tense="tense"
                :has-secondary="conj?.[secondaryEquivalents?.[tense]] ? true : false"
                :pronoun="pronoun"
            />
        </form>
    </div>
</template>
<script setup>
    import { verbathonTenses, allTensesIdList, tenseCheckList, secondaryEquivalents } from '@/utils/tenseLists';
    import GameUnit from '@/components/GameUnit.vue';
    import { ref } from 'vue';

    const props = defineProps({
        options: Object,
        verb: String,
        conj: Object,
        pronoun: String
    });

    let showOrder = [];

    switch (props.options.tnRad){
        case 'tn-v':
            showOrder = verbathonTenses; break;
        case 'tn-a': 
            showOrder = allTensesIdList; break;
        case 'tn-s':
            showOrder = props.options.tnCh.map(x => tenseCheckList.find(y => y.shortId === x).id); break;
        default:
            showOrder = verbathonTenses; break;
    }
</script>