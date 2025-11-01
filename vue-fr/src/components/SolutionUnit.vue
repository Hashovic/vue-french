<template>
    <div class="text-lg mb-2">{{ label }}</div>
    <div>
       <div v-if="!isImperatif">
            <div v-if="!hasSecondary" class="grid grid-cols-2 gap-4">
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
            <div v-else-if="!primaryIncorrect && !secondaryIncorrect" class="grid grid-cols-2 gap-4">
                <div class="border-2 rounded-lg p-2 mb-2 border-green-500 dark:border-green-600 hover:bg-green-500/10 hover:dark:bg-green-600/15">
                    {{ answer.primary }}
                </div>
                <div class="border-2 rounded-lg p-2 mb-2 border-green-500 dark:border-green-600 hover:bg-green-500/10 hover:dark:bg-green-600/15">
                    {{ answer.secondary }}
                </div>
            </div>
            <div v-else class="grid grid-cols-2 gap-4">
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
                <div class="border-2 rounded-lg p-2 mb-2 row-start-2"
                    :class="secondaryIncorrect ? 'border-red-500 dark:border-red-500 hover:bg-red-200/40 dark:hover:bg-red-600/15'
                    : 'border-green-500 dark:border-green-600 hover:bg-green-500/10 hover:dark:bg-green-600/15'"
                >
                    {{ answer.secondary }}
                </div>
                <div class="border-2 border-gray-500/60 dark:border-gray-400/80 rounded-lg p-2 mb-2 row-start-2"
                    :class="secondaryIncorrect ? 'italic' : 'hidden' "
                >
                    {{ conj[secondaryEquivalents[tense]] }}
                </div> 

            </div>
        </div> 
        <div v-else>
            <div v-for="(isIncorrect, pronoun) in imperatifIncorrect" :key="pronoun"
                :class="(hasSecondary && Object.hasOwn(answer.secondary, pronoun)) ? 'mb-5' : ''"
            >
                <div v-if="!hasSecondary || !Object.hasOwn(answer.secondary, pronoun)" class="grid grid-cols-2 gap-4">
                    <div class="border-2 rounded-lg p-2 mb-2"
                        :class="isIncorrect.indexOf('p') >= 0 ? 'border-red-500 dark:border-red-500 hover:bg-red-200/40 dark:hover:bg-red-600/15'
                        : 'border-green-500 dark:border-green-600 hover:bg-green-500/10 hover:dark:bg-green-600/15'"
                    >
                        {{ answer.primary[pronoun] }}
                    </div>
                    <div class="border-2 border-gray-500/60 dark:border-gray-400/80 rounded-lg p-2 mb-2"
                        :class="isIncorrect.indexOf('p') >= 0 ? 'italic' : 'hidden' "
                    >
                        {{ conj[imperatifEquivalents[tense][pronoun]] }}
                    </div>   
                </div>
                <div v-else-if="isIncorrect.indexOf('p') < 0 && isIncorrect.indexOf('s') < 0" class="grid grid-cols-2 gap-4">
                    <div class="border-2 rounded-lg p-2 mb-2 border-green-500 dark:border-green-600 hover:bg-green-500/10 hover:dark:bg-green-600/15">
                        {{ answer.primary[pronoun] }}
                    </div>
                    <div class="border-2 rounded-lg p-2 mb-2 border-green-500 dark:border-green-600 hover:bg-green-500/10 hover:dark:bg-green-600/15">
                        {{ answer.secondary[pronoun] }}
                    </div>
                </div>
                <div v-else class="grid grid-cols-2 gap-x-4">
                    <div class="border-2 rounded-lg p-2 mb-2"
                        :class="isIncorrect.indexOf('p') >= 0 ? 'border-red-500 dark:border-red-500 hover:bg-red-200/40 dark:hover:bg-red-600/15'
                        : 'border-green-500 dark:border-green-600 hover:bg-green-500/10 hover:dark:bg-green-600/15'"
                    >
                        {{ answer.primary[pronoun] }}
                    </div>
                    <div class="border-2 border-gray-500/60 dark:border-gray-400/80 rounded-lg p-2 mb-2"
                        :class="isIncorrect.indexOf('p') >= 0 ? 'italic' : 'hidden' "
                    >
                        {{ conj[imperatifEquivalents[tense][pronoun]] }}
                    </div> 
                    <div class="border-2 rounded-lg p-2 mb-2 row-start-2"
                        :class="isIncorrect.indexOf('s') >= 0 ? 'border-red-500 dark:border-red-500 hover:bg-red-200/40 dark:hover:bg-red-600/15'
                        : 'border-green-500 dark:border-green-600 hover:bg-green-500/10 hover:dark:bg-green-600/15'"
                    >
                        {{ answer.secondary[pronoun] }}
                    </div>
                    <div class="border-2 border-gray-500/60 dark:border-gray-400/80 rounded-lg p-2 mb-2 row-start-2"
                        :class="isIncorrect.indexOf('s') >= 0 ? 'italic' : 'hidden' "
                    >
                        {{ conj[imperatifEquivalents['imperatif_secondary'][pronoun]] }}
                    </div>
                </div>
            </div>
        </div> 
    </div>
</template>
<script setup>
    import { tenseCheckList, imperatifEquivalents, secondaryEquivalents } from '@/utils/tenseLists';
    import { checkImperatif } from '@/utils/helper';
    import { ref } from 'vue';

    const props = defineProps({
        tense: String,
        answer: Object,
        incorrect: Object,
        conj: Object,
    });

    const emit = defineEmits(['incIncorrect', 'incTotal']);

    console.log(props.answer);


    const isImperatif = checkImperatif(props.tense);
    const primaryIncorrect = ref(false); 
    const hasSecondary = Object.hasOwn(props.answer, 'secondary');
    const secondaryIncorrect = ref(false);
    const imperatifIncorrect = ref({});

    if (isImperatif) {
        imperatifIncorrect.value["tu"] = props.incorrect.get(props.tense)?.['primary']?.includes('tu') ? 'p': '';
        imperatifIncorrect.value["nous"] = props.incorrect.get(props.tense)?.['primary']?.includes('nous') ? 'p': '';
        imperatifIncorrect.value["vous"] = props.incorrect.get(props.tense)?.['primary']?.includes('vous') ? 'p': '';
        emit('incTotal', 3);

        if(hasSecondary) {
            for(const pronoun of Object.keys(props.answer.secondary)) {
                imperatifIncorrect.value[pronoun] += (props.incorrect.get(props.tense)?.['secondary']?.includes(pronoun) ? 's' : '');
                emit('incTotal');
            }
        }

        Object.values(imperatifIncorrect.value).forEach(v => v.indexOf('p') >= 0 ? emit('incIncorrect') : null);
        Object.values(imperatifIncorrect.value).forEach(v => v.indexOf('s') >= 0 ? emit('incIncorrect') : null);
    }
   else {
        primaryIncorrect.value = props.incorrect.get(props.tense)?.indexOf('p') >= 0 ? true : false;
        if(hasSecondary) {
            secondaryIncorrect.value = props.incorrect.get(props.tense)?.indexOf('s') >= 0 ? true : false;
        }

        if (primaryIncorrect.value) emit('incIncorrect');
        if (secondaryIncorrect.value) emit('incIncorrect');
        emit('incTotal', hasSecondary ? 2 : 1);
    }
    
    const label = tenseCheckList.find(x => x.id === props.tense).label;

</script>