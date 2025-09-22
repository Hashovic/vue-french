<template>
    <!-- <div>
        This is the game view
    </div>
    <div>{{ decoded }}</div> -->
    <GameComponent v-if="singleConj" :options="decoded" :verb="verbIn" :conj="singleConj" :pronoun="pronoun"/>
</template>
<script setup>
    import { decode, getRandomElement, checkNotDefective} from '@/utils/helper.js';
    import GameComponent from '@/components/GameComponent.vue';
    import { onMounted, ref } from 'vue';

    const props = defineProps({
        verbIn: String,
        options: String
    });

    const decoded = decode(props.options);
    const validVerb = ref('');
    const singleConj = ref(null);
    const pronoun = ref('');
    const validPronouns = checkNotDefective(props.verbIn);
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
            console.log(singleConj.value);
        }
        catch {
            validVerb.value = 'server-down';
            return;
        }
    }

    onMounted(() => {
        fetchConjugation(props.verbIn, formId, decoded.fp, decoded.vs, feminine);
    });
</script>