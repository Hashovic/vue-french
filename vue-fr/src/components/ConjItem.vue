<template>
    <div class="">
        <h3 class="pl-4 text-lg">{{ title }}</h3>
        <ul class="border-2 border-gray-300 hover:bg-gray-100">
            <li v-for="conj in conjugations" :key="conj.form_id" class="pl-6">
                <strong v-if="conj[pattern] && hasPronoun">{{ conj.pronoun }}</strong><strong v-else-if="!conj[pattern]">{{ nullPlaceHolder }}</strong> {{ conj[pattern] }}
            </li>
        </ul>
    </div>
</template>
<script setup>
    const props = defineProps(['title', 'pattern', 'conjugations']);
    
    const hasPronoun = (props['pattern'] !== 'imperatif')
    const nullPlaceHolder = '---'; // Placeholder for null values
</script>
