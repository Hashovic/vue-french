<template>
    <div>
        <form id="practice-form" @submit.prevent="submitForm">
            <input
                type="text"
                id="verb-input"
                placeholder="Enter verb"
                autocomplete="off"
                spellcheck="false"
                class="border-2 border-gray-300 p-2 rounded w-full mb-2"
                v-model="chosenVerb"
            >
            <div class="flex flex-col md:flex-row justify-between w-full lg:w-2/3">
                <Checkbox
                    v-for="(item, i) in defaultsCheckList"
                    :key="i"
                    :label="item.label"
                    :id="item.id"
                    v-model="chosenDefaultsCheckList"
                />
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-7 gap-2 gap-y-4 mb-4">
                <div class="col-span-2">
                    <div class="grid-rows-[6fr_1fr] grid-flow-col h-full">
                        <div>
                            <h3 class="text-lg mb-1">Pronoun(s):</h3>
                            <RadioRadio
                                :radioList1="pronounRadioList1"
                                :radioList2="pronounRadioList2"
                                grName1="pronounsRadioRadio1"
                                grName2="pronounsRadioRadio2"
                                v-model:radioPicked1="chosenPronounRadio1"
                                v-model:radioPicked2="chosenPronounRadio2"
                            />
                        </div>
                        <div class="flex lg:mt-10 lg:pr-10 justify-center">
                            <button type="submit" class="text-lg cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600/80 border-1 border-gray-400 dark:border-gray-200 rounded-lg px-5 mr-10">
                                Start
                            </button>
                            <button 
                                class="text-lg text-red-500 cursor-pointer hover:bg-red-600/20 border-1 border-red-500 rounded-lg px-5"
                                @click.prevent="clearSelections"
                            >
                                Clear Selections
                            </button>
                        </div>
                    </div>
                </div>
                <div class="lg:col-span-5">
                    <h3 class="text-lg mb-1">Tense(s):</h3>
                    <RadioCheck
                        :radioList="tenseRadioList"
                        :checkList="tenseCheckList"
                        grName="tensesRadioCheck"
                        v-model:radioPicked="chosenTenseRadio"
                        v-model:checkPicked="chosenTenseChecks"
                    />
                </div>
            </div>
        </form>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import Checkbox from '@/components/Checkbox.vue';
import RadioCheck from '@/components/RadioCheck.vue';
import RadioRadio from '@/components/RadioRadio.vue';
import { useStorage } from '@vueuse/core';
import { useRouter } from 'vue-router';
import { encode } from '@/utils/helper.js';
import { allTensesIdList, allButRareTensesIdList, verbathonTenses, tenseCheckList } from '@/utils/tenseLists';

const router = useRouter();
const defaultsCheckList = ref([{label: 'Vous Singular When Agreement', id: 'vs'}, {label: 'Assume Feminine Where Applicable', id:'fm'}, {label: 'Try Pronomial Form', id: 'fp'}]);

const pronounRadioList1 = ref([
    { id: 'pn-r',   label: 'Random', allowsChoose: false },
    { id: 'pn-s',   label: 'Select', allowsChoose: true }
]);

const pronounRadioList2 = ([
    {label: 'Je',   id: "1"},
    {label: 'Tu',   id: "2"},
    {label: 'Il',   id: "3"},
    {label: 'On',   id: "4"},
    {label: 'Elle', id: "5"},
    {label: 'Nous', id: "6"},
    {label: 'Vous', id: "7"},
    {label: 'Ils',  id: "8"},
    {label: 'Elles',id: "9"},
]);

const tenseRadioList = ref([
    { id: 'tn-a',   label: 'All',               allowsChecks: false,    setChecked: allTensesIdList},
    { id: 'tn-R',   label: 'All But Rare',      allowsChecks: false,    setChecked: allButRareTensesIdList},
    { id: 'tn-v',   label: 'Verbathon!',        allowsChecks: false,    setChecked: verbathonTenses},
    { id: 'tn-s',   label: 'Select',            allowsChecks: true }
]);

const chosenDefaultsCheckList = useStorage('chosen-defaults-checklist', []);
const chosenPronounRadio1 = useStorage('chosen-pronoun-radio-1', '');
const chosenPronounRadio2 = useStorage('chosen-pronoun-radio-2', '');
const chosenTenseRadio = useStorage('chosen-tense-radio', '');
const chosenTenseChecks = useStorage('chosen-tense-checks', []);
const chosenVerb = useStorage('chosen-verb', '');

const clearSelections = () => {
    chosenDefaultsCheckList.value = [];
    chosenPronounRadio1.value = '';
    chosenPronounRadio2.value = '';
    chosenTenseRadio.value = '';
    chosenTenseChecks.value = [];
    chosenVerb.value = '';
};

const submitForm = () => {
    const res = chosenVerb.value.trim();
    
    if (!res.length || !chosenPronounRadio1.value.length || !chosenTenseRadio.value.length) {
        alert('Please fill out all informtion');
        return;
    }

    if (chosenPronounRadio1.value === 'pn-s' && !chosenPronounRadio2.value.length) {
        alert('Please select at least one pronoun');
        return;
    }

    if (chosenTenseRadio.value === 'tn-s' && !chosenTenseChecks.value.length) {
        alert('Please select at least one tense');
        return;
    }

    const match = res.match(/^(se\s+|s\')?\s*(?<verb>\w+)/i);
    const options = {
        fp:     res.match(/^(se\s|s\')/i) ? 1 : 0 || chosenDefaultsCheckList.value.includes('fp') ? 1 : 0,
        vs:     chosenDefaultsCheckList.value.includes('vs') ? 1 : 0,
        fm:     chosenDefaultsCheckList.value.includes('fm') ? 1 : 0,
        prRad1: chosenPronounRadio1.value,
        prRad2: chosenPronounRadio2.value,
        tnRad:  chosenTenseRadio.value,
        tnCh:   chosenTenseChecks.value.map(t => tenseCheckList.find(item => item.id === t)?.shortId)
    }

    router.push({
        name: 'practice',
        params: { verb: match.groups.verb },
        query: { opt: encode(options) }
    });
};

</script>1