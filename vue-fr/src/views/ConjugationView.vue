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
        <div @click="toggleRare()" class="cursor-pointer rounded-full bg-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="size-7 m-1 hover:fill-amber-500 hover:stroke-amber-500 dark:stroke-gray-200 dark:fill-gray-200 stroke-gray-800 fill-gray-800" viewBox="0 0 32 32">
                <path d="M28.5 22.35l-10.999-6.35 10.999-6.351c0.231-0.131 0.385-0.375 0.385-0.655 0-0.414-0.336-0.75-0.75-0.75-0.142 0-0.275 0.040-0.388 0.108l0.003-0.002-11 6.35v-12.701c0-0.414-0.336-0.75-0.75-0.75s-0.75 0.336-0.75 0.75v0 12.7l-10.999-6.35c-0.11-0.067-0.243-0.106-0.385-0.106-0.414 0-0.75 0.336-0.75 0.75 0 0.28 0.154 0.524 0.381 0.653l0.004 0.002 10.999 6.351-10.999 6.35c-0.226 0.132-0.375 0.374-0.375 0.65 0 0.415 0.336 0.751 0.751 0.751 0 0 0 0 0.001 0h-0c0.138-0.001 0.266-0.037 0.378-0.102l-0.004 0.002 10.999-6.351v12.7c0 0.414 0.336 0.75 0.75 0.75s0.75-0.336 0.75-0.75v0-12.701l11 6.351c0.107 0.063 0.237 0.1 0.374 0.1 0.277 0 0.518-0.149 0.649-0.371l0.002-0.004c0.063-0.108 0.1-0.237 0.1-0.375 0-0.277-0.15-0.518-0.372-0.648l-0.004-0.002z"/>
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