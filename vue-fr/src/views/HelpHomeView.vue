<template>
    <div class="flex mb-5 items-baseline justify-center flex-wrap border-2 p-4 rounded-2xl">
        <h1 class="flex text-6xl overflow-hidden sm:text-7xl font-mono tracking-widest">
            HELP
        </h1>
    </div>
    <div class="flex flex-col gap-y-8 justify-center items-center">
	<div class="border-2 rounded-xl font-mono border-gray-500/70 max-w-2xl p-4 mx-auto">
	    <p class="text-base/8">
		Bienvenue! Welcome to the help page! If you have any suggestions, want
		new conjugations or found errors in the conjugations, feel free to submit
		an issue below. All issue submissions are completely confidential and are
		very helpful for improving the quality of the site.
	    </p>
	</div>
	<div class="flex justify-center w-full sm:w-2/3 lg:w-1/2 mb-4">
	    <AddIssue @added="submissionConfirmation" />
	</div>
    </div>
</template>
<script setup>
    import AddIssue from '@/components/AddIssue.vue';

    const submissionConfirmation = () => alert("Issue added successfully");
</script>
