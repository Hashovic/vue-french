<template>
    <div class="text-lg mb-2">{{ label }}</div>
    <div>
       <div v-if="!isImperatif">
            <div v-if="!hasSecondary" class="grid lg:grid-cols-2 gap-4">
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
                    :class="(isSwitched ? !primaryIncorrect : primaryIncorrect) ? 'border-red-500 dark:border-red-500 hover:bg-red-200/40 dark:hover:bg-red-600/15'
                    : 'border-green-500 dark:border-green-600 hover:bg-green-500/10 hover:dark:bg-green-600/15'"
                >
                    {{ answer.primary }}
                </div>
                <div class="border-2 border-gray-500/60 dark:border-gray-400/80 rounded-lg p-2 mb-2 col-start-2"
                    :class="[primaryIncorrect ? 'italic' : 'hidden', isSwitched ? 'row-start-2' : 'row-start-1']"
                >
                    {{ conj[tense] }}
                </div>
                <div class="border-2 rounded-lg p-2 mb-2 row-start-2"
                    :class="(isSwitched ? !secondaryIncorrect : secondaryIncorrect) ? 'border-red-500 dark:border-red-500 hover:bg-red-200/40 dark:hover:bg-red-600/15'
                    : 'border-green-500 dark:border-green-600 hover:bg-green-500/10 hover:dark:bg-green-600/15'"
                >
                    {{ answer.secondary }}
                </div>
                <div class="border-2 border-gray-500/60 dark:border-gray-400/80 rounded-lg p-2 mb-2 col-start-2"
                    :class="[secondaryIncorrect ? 'italic' : 'hidden', isSwitched ? 'row-start-1' : 'row-start-2']"
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
                        :class="isIncorrect.includes('p') ? 'border-red-500 dark:border-red-500 hover:bg-red-200/40 dark:hover:bg-red-600/15'
                        : 'border-green-500 dark:border-green-600 hover:bg-green-500/10 hover:dark:bg-green-600/15'"
                    >
                        {{ answer.primary[pronoun] }}
                    </div>
                    <div class="border-2 border-gray-500/60 dark:border-gray-400/80 rounded-lg p-2 mb-2"
                        :class="isIncorrect.includes('p') ? 'italic' : 'hidden' "
                    >
                        {{ conj[imperatifEquivalents[tense][pronoun]] }}
                    </div>   
                </div>
                <div v-else-if="!isIncorrect.includes('p') && !isIncorrect.includes('s')" class="grid grid-cols-2 gap-4">
                    <div class="border-2 rounded-lg p-2 mb-2 border-green-500 dark:border-green-600 hover:bg-green-500/10 hover:dark:bg-green-600/15">
                        {{ answer.primary[pronoun] }}
                    </div>
                    <div class="border-2 rounded-lg p-2 mb-2 border-green-500 dark:border-green-600 hover:bg-green-500/10 hover:dark:bg-green-600/15">
                        {{ answer.secondary[pronoun] }}
                    </div>
                </div>
                <div v-else class="grid grid-cols-2 grid-rows-2 gap-x-4">
                    <div class="border-2 rounded-lg p-2 mb-2 row-start-1 col-start-1"
                        :class="(isImpSwitched.includes(pronoun) ? !isIncorrect.includes('p') : isIncorrect.includes('p')) ? 'border-red-500 dark:border-red-500 hover:bg-red-200/40 dark:hover:bg-red-600/15'
                        : 'border-green-500 dark:border-green-600 hover:bg-green-500/10 hover:dark:bg-green-600/15'"
                    >
                        {{ answer.primary[pronoun] }}
                    </div>
                    <div class="border-2 border-gray-500/60 dark:border-gray-400/80 rounded-lg p-2 mb-2 col-start-2"
                        :class="[isIncorrect.includes('p') ? 'italic' : 'hidden', isSwitched ? 'row-start-2' : 'row-start-1']"
                    >
                        {{ conj[imperatifEquivalents[tense][pronoun]] }}
                    </div> 
                    <div class="border-2 rounded-lg p-2 mb-2 row-start-2 col-start-1"
                        :class="(isImpSwitched.includes(pronoun) ? !isIncorrect.includes('s') : isIncorrect.includes('s')) ? 'border-red-500 dark:border-red-500 hover:bg-red-200/40 dark:hover:bg-red-600/15'
                        : 'border-green-500 dark:border-green-600 hover:bg-green-500/10 hover:dark:bg-green-600/15'"
                    >
                        {{ answer.secondary[pronoun] }}
                    </div>
                    <div class="border-2 border-gray-500/60 dark:border-gray-400/80 rounded-lg p-2 mb-2 col-start-2"
                        :class="[isIncorrect.includes('s') ? 'italic' : 'hidden', isSwitched ? 'row-start-1' : 'row-start-2']"
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

    const isImperatif = checkImperatif(props.tense);
    const primaryIncorrect = ref(false);
    const isSwitched = ref(false); 
    const hasSecondary = Object.hasOwn(props.answer, 'secondary');
    const secondaryIncorrect = ref(false);
    const imperatifIncorrect = ref({});
    const isImpSwitched = ref([]);

    if (isImperatif) {
        imperatifIncorrect.value["tu"] = props.incorrect.get(props.tense)?.['primary']?.includes('tu') ? 'p': '';
        imperatifIncorrect.value["nous"] = props.incorrect.get(props.tense)?.['primary']?.includes('nous') ? 'p': '';
        imperatifIncorrect.value["vous"] = props.incorrect.get(props.tense)?.['primary']?.includes('vous') ? 'p': '';
        emit('incTotal', 3);

        if(hasSecondary) {
            for(const pronoun of Object.keys(props.answer.secondary)) {
                imperatifIncorrect.value[pronoun] += (props.incorrect.get(props.tense)?.['secondary']?.includes(pronoun) ? 's' : '');
                isImpSwitched.value.push(props.incorrect.get(props.tense)?.['switched']?.includes(pronoun) ? true : false);
                emit('incTotal');
            }
        }

        Object.values(imperatifIncorrect.value).forEach(v => v.includes('p') ? emit('incIncorrect') : null);
        Object.values(imperatifIncorrect.value).forEach(v => v.includes('s') ? emit('incIncorrect') : null);
    }
   else {
        primaryIncorrect.value = props.incorrect.get(props.tense)?.includes('p') ? true : false;
        if(hasSecondary) {
            secondaryIncorrect.value = props.incorrect.get(props.tense)?.includes('s') ? true : false;
        }
        isSwitched.value = props.incorrect.get(props.tense)?.includes('w') ? true : false;

        if (primaryIncorrect.value) emit('incIncorrect');
        if (secondaryIncorrect.value) emit('incIncorrect');
        emit('incTotal', hasSecondary ? 2 : 1);
    }
    const label = tenseCheckList.find(x => x.id === props.tense).label;

</script>