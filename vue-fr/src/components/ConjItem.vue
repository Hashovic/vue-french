<template>
    <div class="">
        <h3 class="pl-4 text-lg font-medium">{{ title }}</h3>
        <ul class="border-2 border-gray-300 dark:border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600/30">
            <li v-for="conj in list" :key="conj.form_id" class="pl-2">
                <!-- <div>
                    <strong v-if="hasPronoun">{{ conj.pronoun }}</strong><span v-else>{{ conj.pronoun }}</span>
                </div> -->
                <div>
                    {{ conj.pattern }}<span v-if="conj.secondary">, {{ conj.secondary }}</span>
                </div>
            </li>
        </ul>
    </div>
</template>
<script setup>
    import { computed } from 'vue';

    const props = defineProps(['title', 'pattern', 'conjugations', 'secondary']);
    const isImperatif = computed(() => (props.pattern === 'imperatif' || props.pattern === 'passe_imperatif'));
    const hasPronoun = computed(()=> !isImperatif.value); // Imperatif does not have pronouns, so we don't show them
    const nullPlaceHolder = '---'; // Placeholder for null values

    const list = computed(() => {
        return props.conjugations.map(conj => {
            let pronoun = conj.pronoun + ' ';
            let conjPattern = conj[props.pattern];
            let conjSecondary = props.secondary ? conj[props.secondary] : null;
            
            if (conjPattern?.[0].match(/[aeiou]/) && conj.form_id == 1) {
                pronoun = 'j\'';
            };

            return {
                pronoun: conjPattern && hasPronoun.value 
                    ? pronoun :
                    (conjPattern ? `(${conj.pronoun}) ` : ''),
                pattern: conjPattern ? (isImperatif.value && !conjSecondary ? conjPattern + '!' : conjPattern) : nullPlaceHolder,
                secondary: conjSecondary && conjPattern ? (isImperatif.value ? conjSecondary + '!': conjSecondary) : null,
            };
        })
    });
    
</script>
