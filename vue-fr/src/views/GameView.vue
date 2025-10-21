<template>
    <GameComponent v-if="singleConj && !complete" @completed="showSolution" :options="decoded" :verb="verbIn" :conj="singleConj" :pronoun="pronoun"/>
    <SolutionComponent v-else-if="singleConj" :incorrect="completedIncorrect" :formData="completedAnswers" :conj="singleConj" :pronoun="pronoun"/>
</template>
<script setup>
    import { decode, getRandomElement, checkNotDefective} from '@/utils/helper.js';
    import GameComponent from '@/components/GameComponent.vue';
    import { onMounted, ref } from 'vue';
    import SolutionComponent from '@/components/SolutionComponent.vue';

    const props = defineProps({
        verbIn: String,
        options: String
    });

    const decoded = decode(props.options);
    const validVerb = ref('');
    const singleConj = ref(null);
    const pronoun = ref('');
    const complete = ref(false);
    const validPronouns = checkNotDefective(props.verbIn);
    const completedIncorrect = ref(null);
    const completedAnswers = ref(null);

    let formId = 0;
    let feminine = false;

    switch (decoded.prRad){
        case 'pn-r':
            const random = getRandomElement(validPronouns);
            pronoun.value = random.pronoun;
            formId = random.formId;
            feminine = random.fm || decoded.fm;
            break;
        default:
            pronoun.value = 'je';
            formId = '1';
            feminine = decoded.fm;
            break;
    }

    async function fetchConjugation(v, formId, fp, vs, fm) {
        try {
            const url = `http://localhost:8080/api/single/${v}/${formId}?fp=${fp}&vp=${Number(vs) ? 0 : 1}&fm=${fm}`;
            const res = await fetch(url);

            if (!res.ok) {
                validVerb.value = 'not-found';
                return;
            }
            validVerb.value = 'valid';
            singleConj.value = await res.json();
        }
        catch {
            validVerb.value = 'server-down';
            return;
        }
    }

    function showSolution(incorrect, formData) {
        complete.value = true;
        completedIncorrect.value = incorrect;
        completedAnswers.value = formData;
        console.log('User answers:', completedAnswers.value);
    }

    onMounted(() => {
        fetchConjugation(props.verbIn, formId, decoded.fp, decoded.vs, feminine);
    });
</script>