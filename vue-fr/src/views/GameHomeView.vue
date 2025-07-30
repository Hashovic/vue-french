<template>
  <p>This is the game home page</p>
  <form @submit.prevent="goToGame">
    <input
      type="text"
      placeholder="Enter a verb to conjugate"
      class="border-2 border-gray-300 p-2 rounded w-full"
      v-model="search">
  </form>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 mt-4">
    <Checkbox
        v-for="(item, i) in items"
        :key="i"
        :label="item"   
    />
  </div>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 mt-4">
    <Radio
      v-for="(item, i) in radios"
      :key="i"
      :label="item"
      grName="framework"
    />
  </div>
  
</template>
<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import Checkbox from '@/components/Checkbox.vue';
    import Radio from '@/components/Radio.vue';

    const router = useRouter();
    const search = ref('');
    const items = ref(['React', 'Vue']);
    const radios = ref(['HTML', 'CSS', 'JavaScript', 'Python', 'Ruby', 'Java', 'C#', 'PHP', 'Go', 'Swift']);

    const goToGame = () => {
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