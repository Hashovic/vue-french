<template>
  <div class="selection:bg-green-200 m-4 border-2">
    <h2 class="text-4xl font-light"><span class="font-medium">Verb: </span>{{ verb_ref }}</h2>
    <div class="flex flex-col sm:flex-row justify-start selection:bg-blue-200">
      <h3 class="text-xl mr-4"><span class="font-medium">Translation: </span>{{ translation_ref }}</h3>
      <h3 class="text-xl"><span class="font-medium">Conjugates like: </span>{{ conj_like_ref }}</h3>
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
  import { ref, onMounted } from 'vue';
  import ConjTable from './components/ConjTable.vue';

  // form_id, verb, translation, conj_like, pronoun, present, present_secondary, future_proche, imperatif,
  // imperatif_secondary, passe_simple, passe_compose, imparfait, imparfait_secondary, pres_subj, pres_subj_secondary, futur_simple,
  // futur_simple_secondary, conditionnel, conditionnel_secondary, plus_que_parfait, passe_anterieur, passe_subj, plus_que_parfait_subj,
  // passe_conditionnel, passe_conditionnel_II, futur_anterieur, subj_imparfait, passe_imperatif

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
      'Plus-que-parfait du Subjonctif': 'plus_que_parfait_subj',
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
  const conjugations = ref([]);

  onMounted(async () => {
    const res = await fetch('http://localhost:8080/api/all/commencer?fp=0');
    const data = await res.json();

    const {verb, translation, conj_like} = data[0];
    verb_ref.value = verb;
    translation_ref.value = translation;
    conj_like_ref.value = conj_like; 
    conjugations.value = data;
  });

</script>