<template>
    <div class="w-full sm:w-1/2 lg:w-1/3">
        <p>{{ description ?? 'Search:' }}</p>
        <form @submit.prevent="goToVerb" class="mb-4">
            <input
            type="text"
            spellcheck="false"
            placeholder="Enter a verb to conjugate"
            class="border-2 border-gray-300 p-2 rounded w-full"
            v-model="search">
        </form>
    </div>
</template>
<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    const props = defineProps({description: String});
    const router = useRouter();
    const search = ref('');

    const goToVerb = () => {
        let res = search.value.trim();
        const match = res.match(/^(se\s+|s\')?\s*(?<verb>\w+)/i);
        const tryPronomial = res.match(/^(se\s|s\')/i) ? 1 : 0;

        if (res.length) {
            router.push({ name: 'conjugation', params: { verb: match.groups.verb }, query: {fp: tryPronomial} });
        }
    };

</script>