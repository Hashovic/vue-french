<template>
  <div class="selection:bg-green-200 m-4">
    <h2 class="text-4xl font-light"><span class="font-medium">Verb: </span>{{ verb_ref }}</h2>
    <div class="flex flex-col sm:flex-row justify-start selection:bg-blue-200">
      <h3 class="text-xl mr-4"><span class="font-medium">Translation: </span>{{ translation_ref }}</h3>
      <h3 class="text-xl"><span class="font-medium">Conjugates like: </span>{{ conj_like_ref }}</h3>
    </div>
    <div 
      v-if="conjugations.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
      <ConjItem
        v-for="(pattern, title) in patterns"
        class="hover:bg-gray-100"
        :key="title"
        :title="title"
        :pattern="pattern"
        :conjugations="conjugations"
      />
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import ConjItem from './components/ConjItem.vue';

// form_id, verb, translation, conj_like, pronoun, present, present_secondary, future_proche, imperatif,
// imperatif_secondary, passe_simple, passe_compose, imparfait, imparfait_secondary, pres_subj, pres_subj_secondary, futur_simple,
// futur_simple_secondary, conditionnel, conditionnel_secondary, plus_que_parfait, passe_subj, passe_conditionnel, futur_anterieur
const patterns = {
  'Present': 'present',
  'Futur Proche': 'future_proche',
  'Impératif': 'imperatif',
  'Passé Simple': 'passe_simple',
  'Passé Composé': 'passe_compose',
  'Imparfait': 'imparfait',
  'Présent du Subjonctif': 'pres_subj',
  'Futur Simple': 'futur_simple',
  'Conditionnel': 'conditionnel',
  'Plus-que-parfait': 'plus_que_parfait',
  'Passé du Subjonctif': 'passe_subj',
  'Passé Conditionnel': 'passe_conditionnel',
  'Futur Antérieur': 'futur_anterieur'
}

const verb_ref = ref('');
const translation_ref = ref('');
const conj_like_ref = ref('');
const conjugations = ref([]);

onMounted(async () => {
  const res = await fetch('http://localhost:8080/api/all/parler?fp=1');
  const data = await res.json();

  const {verb, translation, conj_like} = data[0];
  verb_ref.value = verb;
  translation_ref.value = translation;
  conj_like_ref.value = conj_like; 
  conjugations.value = data;
});

</script>