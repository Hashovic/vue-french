<template>
    <div>
        <form id="game-form" @submit.prevent="submitForm">
            <input
                type="text"
                id="verb-input"
                placeholder="Enter verb:"
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
                    <h3 class="text-lg mb-1">Pronoun(s):</h3>
                    <RadioCheck
                        :radioList="pronounRadioList"
                        :checkList="pronounCheckList"
                        grName="pronounsRadioCheck"
                        v-model:radioPicked="chosenPronounRadio"
                        v-model:checkPicked="chosenPronounChecks"
                    />
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
            <div>
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
        </form>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import Checkbox from '@/components/Checkbox.vue';
import RadioCheck from '@/components/RadioCheck.vue';
import { useStorage } from '@vueuse/core';
import { useRouter } from 'vue-router';
import { encode } from '@/utils/helper.js';
import { allTensesIdList, allButRareTensesIdList, verbathonTenses, tenseCheckList } from '@/utils/tenseLists';

const router = useRouter();
const defaultsCheckList = ref([{label: 'Vous Singular When Agreement', id: 'vs'}, {label: 'Assume Feminine Where Applicable', id:'fm'}, {label: 'Try Pronomial Form', id: 'fp'}]);

const pronounCheckList = ([
    {label: 'Je',   id: "1"},
    {label: 'Tu',   id: "2"},
    {label: 'Il/On',id: "3"},
    {label: 'Elle', id: "4"},
    {label: 'Nous', id: "5"},
    {label: 'Vous', id: "6"},
    {label: 'Ils',  id: "7"},
    {label: 'Elles',id: "8"},
]);

const pronounRadioList = ref([
    { id: 'pn-a',   label: 'All',   allowsChecks: false, setChecked: pronounCheckList.map(item => item.id) },
    { id: 'pn-r',   label: 'Random (1)',allowsChecks: false },
    { id: 'pn-s',   label: 'Select',allowsChecks: true }
]);

const tenseRadioList = ref([
    { id: 'tn-a',   label: 'All',               allowsChecks: false,    setChecked: allTensesIdList},
    { id: 'tn-v',   label: 'Verbathon!',        allowsChecks: false,    setChecked: verbathonTenses},
    { id: 'tn-s',   label: 'Select',            allowsChecks: true }
]);

const chosenDefaultsCheckList = useStorage('chosen-defaults-checklist', []);
const chosenPronounRadio = useStorage('chosen-pronoun-radio', '');
const chosenPronounChecks = useStorage('chosen-pronoun-checks', []);
const chosenTenseRadio = useStorage('chosen-tense-radio', '');
const chosenTenseChecks = useStorage('chosen-tense-checks', []);
const chosenVerb = useStorage('chosen-verb', '');

const clearSelections = () => {
    chosenDefaultsCheckList.value = [];
    chosenPronounRadio.value = '';
    chosenPronounChecks.value = [];
    chosenTenseRadio.value = '';
    chosenTenseChecks.value = [];
    chosenVerb.value = '';
};

const submitForm = () => {
    const res = chosenVerb.value.trim();
    
    if (!res.length || !chosenPronounRadio.value.length || !chosenTenseRadio.value.length) {
        alert('Please fill out all informtion');
        return;
    }

    if (chosenPronounRadio.value === 'pn-s' && !chosenPronounChecks.value.length) {
        alert('Please select at least one pronoun');
        return;
    }

    if (chosenTenseRadio.value === 'tn-s' && !chosenTenseChecks.value.length) {
        alert('Please select at least one tense');
        return;
    }

    const match = res.match(/^(se\s+|s\')?\s*(?<verb>\w+)/i);

    const options = {
        fp: res.match(/^(se\s|s\')/i) ? 1 : 0 || chosenDefaultsCheckList.value.includes('fp') ? 1 : 0,
        vs: chosenDefaultsCheckList.value.includes('vs') ? 1 : 0,
        fm: chosenDefaultsCheckList.value.includes('fm') ? 1 : 0,
        prRad: chosenPronounRadio.value,
        prCh: chosenPronounChecks.value,
        tnRad: chosenTenseRadio.value,
        tnCh: chosenTenseChecks.value.map(t => tenseCheckList.find(item => item.id === t)?.shortId)
    }

    router.push({
        name: 'game',
        params: { verb: match.groups.verb },
        query: { opt: encode(options) }
    });
};

</script>1