<template>
    <div>
        <form id="game-form" @submit.prevent="submitForm">
            <input
                type="text"
                placeholder="Enter verb:"
                class="border-2 border-gray-300 p-2 rounded w-full mb-2"
                v-model="chosenVerb"
            >
            <div>Chosen: {{ chosen }}</div>
            <div class="grid grid-cols-7">
                <Radio
                    v-for="(item, i) in items"
                    :key="i"
                    :label="item"
                    v-model="chosen"
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

const chosenVerb = ref('');
const chosenItems = ref([]);
const chosen = ref('');
const items = ref(['React', 'Vue', 'Angular', 'Svelte']);

const submitForm = () => {
    console.log('Yippee!');
};

</script>