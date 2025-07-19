<template>
    <div class="">
        <h3 class="pl-4 text-lg font-medium">{{ title }}</h3>
        <ul class="border-2 border-gray-300 dark:border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600/30">
            <li v-for="conj in list" :key="conj.pronoun" class="pl-2">
                <strong v-if="hasPronoun">{{ conj.pronoun }}</strong><span v-else>{{ conj.pronoun }}</span>{{ conj.pattern }}
            </li>
        </ul>
    </div>
</template>
<script setup>
    import { ref } from 'vue';

    const {title, pattern, conjugations} = defineProps(['title', 'pattern', 'conjugations']);
    const isImperatif = pattern === 'imperatif' || pattern === 'passe_imperatif';
    const hasPronoun = !isImperatif; // Imperatif does not have pronouns, so we don't show them
    const nullPlaceHolder = '---'; // Placeholder for null values

    const list = ref([]);

    for(let conj of conjugations) {
        let pronoun = conj.pronoun + ' ';
        if (conj[pattern]?.[0].match(/[aeiou]/) && conj.form_id == 1) {
            pronoun = 'j\'';
        }; 

        list.value.push({
            pronoun: conj[pattern] && hasPronoun ? pronoun : conj[pattern] ? `(${conj.pronoun}) ` : '',
            pattern: conj[pattern] ? (isImperatif ? conj[pattern] + '!' : conj[pattern]) : nullPlaceHolder,
        });
    }
</script>
