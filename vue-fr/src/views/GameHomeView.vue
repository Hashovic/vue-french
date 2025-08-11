<template>
  <p>This is the game home page</p>
  <GameForm />
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 mt-4">
    <Checkbox
        v-for="(item, i) in items"
        :key="i"
        :label="item"
    />
  </div>
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 mt-4">
    <Radio
      v-for="(item, i) in radios"
      :key="i"
      :label="item"
      grName="framework"
    />
  </div>
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 mt-4">
    <RadioCheck
      grName="frameworks"
      :radioList="[{label: 'All', allowsChecks: false}, {label: 'Random', allowsChecks: false}, {label: 'Select', allowsChecks: true}]"
      :checkList="['React', 'Vue', 'Angular']"
    />
  </div>
</template>
<script setup>
    import { ref } from 'vue';
    import GameForm from '@/components/GameForm.vue';

    import Checkbox from '@/components/Checkbox.vue';
    import Radio from '@/components/Radio.vue';
    import RadioCheck from '@/components/RadioCheck.vue';

    const items = ref(['Reacts', 'Vues']);
    const radios = ref(['HTML', 'CSS', 'JavaScript', 'Python', 'Ruby', 'Java', 'C#', 'PHP', 'Go', 'Swift', 'Angular']);

</script>