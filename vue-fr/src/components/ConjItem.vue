<template>
    <div class="border-2 border-gray-300">
        <h3 class="pl-4">{{ title }}</h3>
        <ul>
            <li v-for="conj in conjugations" :key="conj.form_id" class="pl-6">
                <strong>{{ conj[pattern] ? conj.pronoun : nullPlaceHolder }}</strong> {{ conj[pattern] }}
            </li>
        </ul>
    </div>
</template>
<script setup>
    defineProps(['title', 'pattern', 'conjugations']);

    const nullPlaceHolder = '---'; // Placeholder for null values
</script>
