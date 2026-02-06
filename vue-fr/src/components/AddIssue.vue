<template>
    <form
	@submit.prevent="validateIssue"
	name="issueForm"
	class="w-full flex gap-x-4"
    >
	<select
	    v-model="issueTypeInput" 
	    name="types"
	    id="cars"
	    class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
	>
	    <option disabled value="">
		Select Issue Type
	    </option>
	    <option value="conjugation">Conjugation</option>
	    <option value="recommendations">Recommendations</option>
	    <option value="website">Site</option>
	    <option value="other">Other</option>
	</select>
	<input
	    type="text"
	    name="addIssue"
	    v-model="issueInput"
	    spellcheck="false"
	    autocomplete="off"
	    placeholder="Enter Issue"
	    class="border-2 border-gray-300 p-2 rounded w-full"
	>
	<button
	    type="submit"
	    class="cursor-pointer p-2 rounded-xl border-2 hover:bg-gray-500/20 border-gray-500/70 text-center font-mono"
	>
	    Submit
	</button>
    </form>
</template>
<script setup>
    import { ref } from 'vue';
    import { addIssue } from '@/utils/helper.js';

    const issueInput = ref("");
    const issueTypeInput = ref("");

    const emit = defineEmits(['added']);

    // Checks for valid input
    function validateIssue() {
	if (issueInput.value && issueTypeInput.value){
	    addIssue(issueTypeInput, issueInput);
	    emit('added');
	}
	else alert("Please complete all fields");
    }
</script>
