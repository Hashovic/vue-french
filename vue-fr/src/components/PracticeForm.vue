<template>
    <div>
        <form id="practice-form" @submit.prevent="submitForm(0)">
            <PracticeSearchBar v-model="chosenVerb" />
            <div class="isolate flex flex-col md:flex-row justify-between w-full lg:w-7/8 appearance-none">
                <Checkbox
                    v-for="(item, i) in defaultsCheckList"
                    :key="i"
                    :label="item.label"
                    :id="item.id"
                    v-model="chosenDefaultsCheckList"
                />
            </div>
            <div class="flex flex-col lg:grid lg:grid-cols-[minmax(0,2fr)_minmax(0,5fr)] gap-2 gap-y-4 mb-4">
                <div class="col-start-1 col-end-2 row-start-1 row-end-2 isolate">
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
                <div class="col-start-2 col-end-3 row-start-1 row-end-3 isolate">
                    <h3 class="text-lg mb-1">Tense(s):</h3>
                    <RadioCheck
                        :radioList="tenseRadioList"
                        :checkList="tenseCheckList"
                        grName="tensesRadioCheck"
                        v-model:radioPicked="chosenTenseRadio"
                        v-model:checkPicked="chosenTenseChecks"
                    />
                </div>
                <div class="lg:self-start col-start-1 row-start-2 row-end-3 flex lg:mt-10 lg:pr-6 justify-center">
                    <button type="submit" class="text-4xl not-lg:py-2 lg:text-xl cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600/80 border-1 border-gray-400 dark:border-gray-200 rounded-lg px-5 mr-10">
                        Start
                    </button>
                    <ClipboardModal
                        button-text="Share"
                        v-model="shareModalToggle"
                        @clicked="submitForm(1)"
                        modalTitle="Share this preset" :modalCopy="shareURL"
                        custom-button-classes="flex justify-between text-4xl not-lg:py-2 lg:text-xl cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600/80 border-1 border-gray-400 dark:border-gray-200 rounded-lg px-5"
                    />
                </div>
            </div>
            <div class="flex mt-10 md:mt-4 justify-center md:justify-end">
                <Modal v-model="modalToggle" button-text="Clear Selections" modal-title="Confirmation"
                    :modal-body="'Are you sure you want to clear your current selections? All selected options will be lost.'"
                    button-text-close="Cancel" button-text-confirm="Confirm" @clicked="modalToggle = true" @confirm="clearSelections"
                    :customButtonClasses="'text-xl not-sm:py-2 outline-red-400 text-red-500 cursor-pointer hover:bg-red-600/20 border-1 border-red-500 rounded-lg px-5'"
                />
            </div>
        </form>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import Checkbox from '@/components/Checkbox.vue';
import RadioCheck from '@/components/RadioCheck.vue';
import RadioRadio from '@/components/RadioRadio.vue';
import Modal from '@/components/Modals/Modal.vue';
import { useRouter } from 'vue-router';
import { encode, normalizeVerbInput } from '@/utils/helper.js';
import { allTensesIdList, allButRareTensesIdList, verbathonTenses, tenseCheckList } from '@/utils/tenseLists';
import ClipboardModal from './Clipboard/ClipboardModal.vue';
import PracticeSearchBar from './PracticeSearchBar.vue';
import {
    chosenDefaultsCheckList, chosenPronounRadio1, chosenPronounRadio2,
    chosenTenseRadio, chosenTenseChecks, chosenVerb, clearSelections 
} from '@/stores/preferences.js';

const router = useRouter();
const defaultsCheckList = ref([
    {label: 'Vous Singular When Agreement', id: 'vs'},
    {label: 'Assume Feminine Where Applicable', id:'fm'},
    {label: 'Try Pronomial Form', id: 'fp'},
    {label: 'Show Conjugated-Like', id: 'cl'}
]);
const modalToggle = ref(false);
const shareModalToggle = ref(false);
const shareURL = ref('');

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

const submitForm = (isShare=0) => {
    const res = normalizeVerbInput(chosenVerb.value);
    
    if (!res.verb.length || !chosenPronounRadio1.value.length || !chosenTenseRadio.value.length) {
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

    const options = {
        fp:     res.fp || chosenDefaultsCheckList.value.includes('fp') ? 1 : 0,
        vs:     chosenDefaultsCheckList.value.includes('vs') ? 1 : 0,
        fm:     chosenDefaultsCheckList.value.includes('fm') ? 1 : 0,
        cl:     chosenDefaultsCheckList.value.includes('cl') ? 1 : 0,
        prRad1: chosenPronounRadio1.value,
        prRad2: chosenPronounRadio2.value,
        tnRad:  chosenTenseRadio.value,
        tnCh:   chosenTenseChecks.value.map(t => tenseCheckList.find(item => item.id === t)?.shortId)
    }

    if (isShare) {
        const routeLocation = router.resolve({
            name: 'share',
            params: {
                verb: res.verb,
                options: encode(options)
            },
        });

        shareURL.value = window.location.origin + routeLocation.href;
        shareModalToggle.value = true;
    }
    else{
        router.push({
            name: 'practice',
            params: { verb: res.verb },
            query: { opt: encode(options) }
        });
    }
};

</script>1