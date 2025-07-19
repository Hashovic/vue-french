<template>
  <div>
    <h2 class="text-4xl font-light "><span class="font-medium dark:text-amber-500">Verb: </span>{{ verb_ref }}</h2>
    <div class="flex flex-col sm:flex-row justify-start">
      <h3 class="text-xl mr-4"><span class="font-medium">Translation: </span>{{ translation_ref }}</h3>
      <h3 class="text-xl mr-4"><span class="font-medium">Conjugates like: </span>{{ conj_like_ref }}</h3>
      <h3 class="text-xl mr-4"><span class="font-medium">Past Participle: </span>{{ past_participle_ref }}</h3>
    </div>
    <div v-if="conjugations.length > 0" class="flex flex-col">
      <div class="flex flex-col">
        <ConjTable
          v-for="(patterns, tense) in tenses"
          :key="tense"
          :title="tense"
          :patterns="patterns"
          :conjugations="conjugations"
          :rare="rareTenses"
        />
      </div>
    </div>
  </div>
  
</template>
<script setup>
  import { ref, onMounted, watch, computed } from 'vue';
  import ConjTable from '@/components/ConjTable.vue';

  const props = defineProps({
    verbIn: String,
    forcePronomial: String,
  });

  const tenses = {
    "Indicatif": {
      'Present': 'present',
      'Imparfait': 'imparfait',
      'Passé Simple': 'passe_simple',
      'Futur Simple': 'futur_simple',
  },
    "Compound Tenses": {
      'Futur Proche': 'future_proche',
      'Passé Composé': 'passe_compose',
      'Plus-que-parfait': 'plus_que_parfait',
      'Futur Antérieur': 'futur_anterieur',
      'Passé Antérieur': 'passe_anterieur',
  },
    "Subjunctive": {
      'Présent du Subjonctif': 'pres_subj',
      'Passé du Subjonctif': 'passe_subj',
      'Subjonctif Imparfait': 'subj_imparfait',
      'PQP du Subjonctif': 'plus_que_parfait_subj',
  },
    "Conditional": {
      'Conditionnel': 'conditionnel',
      'Passé Conditionnel': 'passe_conditionnel',
      'Passé Conditionnel II': 'passe_conditionnel_II',
    },
    "Imperative": {
      'Impératif': 'imperatif',
      'Passe Impératif': 'passe_imperatif',
    }
  };

  const rareTenses = new Set([
    'passe_anterieur',
    'subj_imparfait',
    'passe_imperatif',
    'passe_conditionnel_II',
    'plus_que_parfait_subj'
  ]);

  const verb_ref = ref('');
  const translation_ref = ref('');
  const conj_like_ref = ref('');
  const past_participle_ref = ref('');
  const conjugations = ref([]);

  async function fetchConjugation(v, fp) {
    const url = `http://localhost:8080/api/all/${v}?fp=${fp}`;
    const res = await fetch(url);
    const data = await res.json();

    const {verb, translation, conj_like, past_participle} = data[2]; // using the 3rd element as many verbs like falloir don't have a first
    verb_ref.value = verb;
    translation_ref.value = translation;
    conj_like_ref.value = conj_like;
    past_participle_ref.value = past_participle;
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