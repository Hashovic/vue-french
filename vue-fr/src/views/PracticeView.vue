<template>
    <PracticeComponent v-if="validVerb === 'valid' && singleConj && !complete" @completed="showSolution" :options="decoded" :verb="verbIn" :conj="singleConj" :pronoun="pronoun"/>
    <SolutionComponent v-else-if="validVerb === 'valid' && singleConj" :incorrect="completedIncorrect" :formData="completedAnswers" :conj="singleConj" :pronoun="pronoun"/>
    <div v-else-if="validVerb === 'not-found'">
        <VerbNotFound :verb="props.verbIn" />
    </div>
    <div v-else-if="validVerb === 'server-down'">
        <ServerDown />
    </div>
</template>
<script setup>
    import { decode, getRandomElement, checkNotDefective} from '@/utils/helper.js';
    import PracticeComponent from '@/components/PracticeComponent.vue';
    import { onMounted, ref } from 'vue';
    import SolutionComponent from '@/components/SolutionComponent.vue';
    import VerbNotFound from '@/components/VerbNotFound.vue';
    import ServerDown from '@/components/ServerDown.vue';
    const API_BASE = import.meta.env.VITE_API_BASE_URL;

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
    let feminine = 0;

    switch (decoded.prRad1){
        case 'pn-r':
            const random = getRandomElement(validPronouns);
            pronoun.value = random.pronoun;
            formId = random.formId;
            feminine = random.fm || decoded.fm;
            break;
        case 'pn-s':
            const selected = decoded.prRad2;
            const found = validPronouns.find(p => p.id === Number(selected));
            if (found){
                pronoun.value = found.pronoun;
                formId = found.formId;
                feminine = found.fm || decoded.fm;
            }
            else {
                console.log(validPronouns);
                const random = getRandomElement(validPronouns);
                console.log(random);
                pronoun.value = random.pronoun;
                formId = random.formId;
                feminine = random.fm || decoded.fm;
            }    
            break;
        default:
            pronoun.value = 'je';
            formId = '1';
            feminine = decoded.fm;
            break;
    }

    async function fetchConjugation(v, formId, fp, vs, fm) {
        try {
	    const url = `${API_BASE}/api/single/${v}/${formId}?fp=${fp}&vp=${Number(vs) ? 0 : 1}&fm=${fm}`;
            const res = await fetch(url);
            const resData = await res.json();       
            if (!resData.ok) {
                validVerb.value = 'not-found';
                return;
            }
            validVerb.value = 'valid';
            singleConj.value = resData.data;
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
    }

    onMounted(() => {
        fetchConjugation(props.verbIn, formId, decoded.fp, decoded.vs, feminine);
    });
</script>
