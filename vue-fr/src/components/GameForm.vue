<template>
    <div>
        <form id="game-form" @submit.prevent="submitForm">
            <input
                type="text"
                placeholder="Enter verb:"
                class="border-2 border-gray-300 p-2 rounded w-full mb-2"
                v-model="chosenVerb"
            >
            <div>Chosen Radio: {{ chosenPronounRadio }}</div>
            <div>Chosen Checks: {{ chosenPronounChecks }}</div>
            <div>Chosen Example Radio: {{ chosenRadioExample }}</div>
            <div>Chosen Example Check: {{ chosenCheckExample }}</div>
            <div class="grid grid-cols-7 gap-2 gap-y-4 mb-4">
                <Radio
                    v-for="(item, i) in exampleRadioList"
                    :key="i"
                    :label="item.label"
                    :id="item.id"
                    grName="anythingRadio"
                    v-model="chosenRadioExample"
                />
                <Checkbox
                    v-for="(item, i) in exampleCheckList"
                    :key="i"
                    :label="item"
                    v-model="chosenCheckExample"
                />
                <RadioCheck
                    class="col-span-2"
                    :radioList="pronounRadioList"
                    :checkList="pronounCheckList"
                    grName="pronounsRadioCheck"
                    v-model:radioPicked="chosenPronounRadio"
                    v-model:checkPicked="chosenPronounChecks"
                />
            </div>
            <button type="submit" class="text-lg cursor-pointer hover:bg-gray-600/80 border-1 border-gray-200 rounded-lg px-5">
                Start
            </button>
        </form>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import Checkbox from '@/components/Checkbox.vue';
import Radio from '@/components/Radio.vue';
import RadioCheck from '@/components/RadioCheck.vue';

const exampleRadioList = ref([{label: 'Example 1', id: 'example 1'}, {label: 'Example 2', id: 'example 2'}, {label: 'Example 3', id: 'ExAmPle 3'}]);
const exampleCheckList = ref(['ex1', 'ex2', 'ex3', 'ex4'])

const pronounRadioList = ref([
    { id: 'pronoun-select-all' ,label: 'All', allowsChecks: false },
    { id: 'pronoun-select-rand' ,label: 'Random', allowsChecks: false },
    { id: 'pronoun-select' ,label: 'Select', allowsChecks: true }
]);
const pronounCheckList = ref(['Je', 'Tu', 'Il/On', 'Elle', 'Nous', 'Vous', 'Ils', 'Elles']);

const chosenRadioExample = ref('');
const chosenCheckExample = ref([]);
const chosenPronounRadio = ref('');
const chosenPronounChecks = ref([]);
const chosenVerb = ref('');

const submitForm = () => {
    console.log('Yippee!');
};

</script>