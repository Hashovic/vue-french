<template>
    <div class="">
        <h3 class="pl-4 text-lg font-medium">{{ title }}</h3>
        <ul class="border-2 border-gray-300 dark:border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600/30">
            <li v-for="conj in list" :key="conj.form_id" class="pl-2">
                <!-- <div>
                    <strong v-if="hasPronoun">{{ conj.pronoun }}</strong><span v-else>{{ conj.pronoun }}</span>
                </div> -->
                <div>
                    {{ conj.pattern }}
                </div>
            </li>
        </ul>
    </div>
</template>
 <!-- grid grid-cols-[3.5rem_1fr] -->
<script setup>
    import { computed } from 'vue';

    const props = defineProps(['title', 'pattern', 'conjugations']);
    const isImperatif = computed(() => (props.pattern === 'imperatif' || props.pattern === 'passe_imperatif'));
    const hasPronoun = computed(()=> !isImperatif.value); // Imperatif does not have pronouns, so we don't show them
    const nullPlaceHolder = '---'; // Placeholder for null values

    const list = computed(() => {
        return props.conjugations.map(conj => {
            let pronoun = conj.pronoun + ' ';
            if (conj[props.pattern]?.[0].match(/[aeiou]/) && conj.form_id == 1) {
                pronoun = 'j\'';
            };

            return {
                pronoun: conj[props.pattern] && hasPronoun.value 
                    ? pronoun :
                    (conj[props.pattern] ? `(${conj.pronoun}) ` : ''),
                pattern: conj[props.pattern] ? (isImperatif.value ? conj[props.pattern] + '!' : conj[props.pattern]) : nullPlaceHolder,
            };
        })
    })    
    
</script>
