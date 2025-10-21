<template>
    <div class="text-lg mb-2">{{ label }}</div>
    <div>
       <div v-if="!isImperatif" class="grid grid-cols-2 gap-4">
            <div class="border-2 rounded-lg p-2 mb-2"
                :class="primaryIncorrect ? 'border-red-500 dark:border-red-500 hover:bg-red-200/40 dark:hover:bg-red-600/15'
                : 'border-green-500 dark:border-green-600 hover:bg-green-500/10 hover:dark:bg-green-600/15'"
            >
                {{ answer.primary }}
            </div>
            <div class="border-2 border-gray-500/60 dark:border-gray-400/80 rounded-lg p-2 mb-2"
                :class="primaryIncorrect ? 'italic' : 'hidden' "
            >
                {{ conj[tense] }}
            </div>
        </div> 
        <div v-else v-for="(isIncorrect, pronoun) in imperatifIncorrect" :key="pronoun" class="grid grid-cols-2 gap-4">
            <div class="border-2 rounded-lg p-2 mb-2"
                :class="isIncorrect ? 'border-red-500 dark:border-red-500 hover:bg-red-200/40 dark:hover:bg-red-600/15'
                : 'border-green-500 dark:border-green-600 hover:bg-green-500/10 hover:dark:bg-green-600/15'"
            >
                {{ answer.primary[pronoun] }}
            </div>
            <div class="border-2 border-gray-500/60 dark:border-gray-400/80 rounded-lg p-2 mb-2"
                :class="isIncorrect ? 'italic' : 'hidden' "
            >
                {{ conj[imperatifEquivalents[tense][pronoun]] }}
            </div>
        </div> 
    </div>
</template>
<script setup>
    import { tenseCheckList, imperatifEquivalents } from '@/utils/tenseLists';
    import { checkImperatif } from '@/utils/helper';
    import { ref } from 'vue';

    const props = defineProps({
        tense: String,
        answer: Object,
        incorrect: Object,
        conj: Object,
    });

    const emit = defineEmits(['incIncorrect', 'incTotal']);


    const isImperatif = checkImperatif(props.tense);
    let primaryIncorrect = false;
    let secondaryIncorrect = false;
    const imperatifIncorrect = ref({});

    if (isImperatif) {
        imperatifIncorrect.value["tu"] = props.incorrect.get(props.tense)?.['primary']?.includes('tu');
        imperatifIncorrect.value["nous"] = props.incorrect.get(props.tense)?.['primary']?.includes('nous');
        imperatifIncorrect.value["vous"] = props.incorrect.get(props.tense)?.['primary']?.includes('vous');

        Object.values(imperatifIncorrect.value).forEach(v => v === true ? emit('incIncorrect') : null);
        emit('incTotal', Object.values(imperatifIncorrect.value).length);
    }
   else {
        primaryIncorrect = props.incorrect.get(props.tense)?.indexOf('p') >= 0;
        if (primaryIncorrect) emit('incIncorrect');
        emit('incTotal');
    }
    
    const label = tenseCheckList.find(x => x.id === props.tense).label;

</script>