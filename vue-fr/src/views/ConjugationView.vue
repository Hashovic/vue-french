<template>
  <SearchBar v-if="validVerb !== 'server-down'" />
  <div v-if="validVerb === 'valid'">
    <h2 class="text-4xl font-light "><span class="font-medium text-sky-700 dark:text-amber-500">Verb: </span>{{ verb_ref }}</h2>
    <div class="flex flex-row">
      <div class="w-5/6 flex flex-col sm:flex-row ml-2">
        <h3 class="text-xl mr-4"><span class="font-medium">Translation: </span>{{ translation_ref }}</h3>
        <h3 class="text-xl mr-4"><span class="font-medium">Conjugates like: </span>{{ conj_like_ref }}</h3>
        <h3 class="text-xl mr-4"><span class="font-medium">Past Participle: </span>{{ past_participle_ref }}</h3>
        <div class="mr-4">
          <RouterLink v-if="conjugations.length > 0 && reflexivity_ref" :to="{name: 'conjugation', params: {verb: props.verbIn}, query: {fp: (props.forcePronomial == 0 ? 1 : 0)}}">
            <h3 class="text-lg dark:hover:text-fuchsia-600 hover:text-amber-500">
              <span class="font-medium">Pronomial</span>
            </h3>
          </RouterLink>
          <h3 v-else class="text-lg mr-4 text-gray-300 dark:text-gray-600"><span class="font-medium">Pronomial</span></h3>     
        </div>
        
      </div>
      <div class="w-1/6 flex justify-left sm:justify-end items-center">
        <div @click="toggleRare()" class="cursor-pointer rounded-full">
        <svg v-if="!useRare" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-10">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-10">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        </div>
      </div>
    </div>
    <div>
      <div v-if="conjugations.length > 0" class="flex flex-col">
        <div class="flex flex-col">
          <ConjTable
            v-for="(patterns, tense) in tenses"
            :key="tense"
            :title="tense"
            :patterns="patterns"
            :conjugations="conjugations"
            :rare="rareTenses"
            :secondary="secondaryEquivalents"
          />
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="validVerb === 'not-found'">
    <VerbNotFound :verb="props.verbIn" />
  </div>
  <div v-else-if="validVerb === 'server-down'">
    <ServerDown />
  </div>
  
</template>
<script setup>
  import { ref, onMounted, watch} from 'vue';
  import { useStorage, useToggle } from '@vueuse/core';
  import ConjTable from '@/components/ConjTable.vue';
  import VerbNotFound from '@/components/VerbNotFound.vue';
  import ServerDown from '@/components/ServerDown.vue';
  import SearchBar from '@/components/ConjSearchBar.vue';
  import { tenses, rareTenses, secondaryEquivalents } from '@/utils/tenseLists.js';

  const props = defineProps({
    verbIn: String,
    forcePronomial: String,
  });

  const useRare = useStorage('showRare', true);
  const toggleRare = useToggle(useRare);

  const validVerb = ref('');
  const verb_ref = ref('');
  const translation_ref = ref('');
  const conj_like_ref = ref('');
  const past_participle_ref = ref('');
  const reflexivity_ref = ref('');
  const conjugations = ref([]);

  async function fetchConjugation(v, fp) {
    let data = [];
    try {
      const url = `http://localhost:8080/api/all/${v}?fp=${fp}`;
      const res = await fetch(url);

      if (!res.ok) {
        validVerb.value = 'not-found';
        return;
      }
      validVerb.value = 'valid';
      data = await res.json();
    }
    catch {
      validVerb.value = 'server-down';
      return;
    }    

    //  using the 3rd element as many verbs like falloir don't have a first
    const {verb, translation, conj_like, past_participle, reflexivity} = data[2]; 
    verb_ref.value = verb;
    translation_ref.value = translation;
    conj_like_ref.value = conj_like;
    past_participle_ref.value = past_participle;
    reflexivity_ref.value = (reflexivity === 'pnr' || reflexivity === 'pr');
    conjugations.value = data;
  }

  onMounted(() => {
    fetchConjugation(props.verbIn, props.forcePronomial);
  });
  
  watch(() => props.verbIn,
    (newVerb) => {
      fetchConjugation(newVerb, '0');
    }
  );

  watch(() => props.forcePronomial,
    (newFp) => {
      fetchConjugation(props.verbIn, newFp);
    }
  );
</script>