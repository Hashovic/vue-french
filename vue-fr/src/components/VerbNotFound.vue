<template>
    <div>
        <h1 class="text-4xl font-light">
            404 - Verb Not Found :&lpar;
        </h1>
        <h3 class="text-xl font-light my-4">
            It doesn't appear that the verb <span class="italic font-[500]">{{ verb }}</span> is in our database. If it does exist,
            it will likely follow the regular conjugation rules for it's ending.
        </h3>
        
        <h3 v-for="(v, end) of regularVerbs" :key="v" class="text-lg font-light mb-2">
            <RouterLink 
                class="text-sky-700 dark:text-amber-500 hover:text-sky-800 dark:hover:text-amber-600"
                :to="{name: 'conjugation', params: {verb: v}}">{{ v }}
            </RouterLink> (regular -{{ end }} verb)
        </h3>
    </div>
</template>
<script setup>
  const props = defineProps({
    verb: String
  });

  const regularVerbs = {er: 'parler', ir: 'choisir', re: 'vendre'};
</script>