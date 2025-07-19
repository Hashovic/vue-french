<template>
  <main>
    <p>This is the conjugation home page</p>
  </main>
  <form @submit.prevent="goToVerb">
    <input
      type="text"
      placeholder="Enter a verb to conjugate"
      class="border-2 border-gray-300 p-2 rounded w-full"
      v-model="search">
  </form>
</template>
<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();
    const search = ref('');

    const goToVerb = () => {
        let res = search.value.trim();
        const match = res.match(/^(se\s+|s\')?\s*(?<verb>\w+)/i);
        console.log(match.groups.verb)
        
        const regex = new RegExp("^(se\s|s\')");
        let tryPronomial = res.match(/^(se\s|s\')/i) ? 1 : 0;
        console.log(tryPronomial);

        if (res.length) {
            router.push({ name: 'conjugation', params: { verb: match.groups.verb }, query: {fp: tryPronomial} });
        }
    };

</script>