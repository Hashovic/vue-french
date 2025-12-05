<template>
    <div v-if="conj" class="w-5/8 mx-auto">
        <h2 class="text-4xl font-light "><span class="font-medium text-sky-700 dark:text-amber-500">Verb: </span>{{ conj.verb }}</h2>
        <div class="flex flex-row pb-3">
            <div class="w-5/6 flex flex-col sm:flex-row ml-2">
                <h3 class="text-xl mr-4"><span class="font-medium">Translation: </span>{{ conj.translation }}</h3>
                <h3 class="text-xl mr-4"><span class="font-medium">Pronoun: </span><span class="text-sky-700 dark:text-amber-500">{{ pronoun }}</span></h3>
            </div>
        </div>
        <form v-if="conj" @submit.prevent="checkCompleted" class="grid grid-cols-1 py-1 gap-y-2">
            <PracticeUnit
                v-for="(ans, tense) in formData"
                :tense="tense"
                :ans="ans"
                :has-secondary="checkSecondary(tense) ? true : false"
                :pronoun="pronoun"
            />
             <Modal v-model="modalToggle" button-text="Submit Answers" modal-title="Confirmation"
                :modal-body="modalMsg"
                button-text-close="Cancel" button-text-confirm="Confirm" @clicked="checkCompleted" @confirm="checkAnswers"
             />
        </form>
    </div>
</template>
<script setup>
    import { verbathonTenses, allTensesIdList, allButRareTensesIdList, tenseCheckList, secondaryEquivalents, imperatifEquivalents } from '@/utils/tenseLists';
    import { checkImperatif } from '@/utils/helper';
    import PracticeUnit from '@/components/PracticeUnit.vue';
    import { ref, reactive } from 'vue';
    import Modal from './Modal.vue';

    const props = defineProps({
        options: Object,
        verb: String,
        conj: Object,
        pronoun: String
    });

    const modalToggle = ref(false);
    const modalMsg = ref('You haven\'t completed all avialable conjugations. Are you sure you want to submit?');
    const emit = defineEmits(['completed']);

    const checkSecondary = (t) => {
        if(checkImperatif(t)) {
            return Object.keys(formData[t]?.secondary ?? {}).length > 0;
        }
        return Object.hasOwn(formData[t], 'secondary');
    };

    let showOrder = [];

    switch (props.options.tnRad){
        case 'tn-v':
            showOrder = verbathonTenses; break;
        case 'tn-a': 
            showOrder = allTensesIdList; break;
        case 'tn-R':
            showOrder = allButRareTensesIdList; break;
        case 'tn-s':
            showOrder = props.options.tnCh.map(x => tenseCheckList.find(y => y.shortId === x).id); break;
        default:
            showOrder = verbathonTenses; break;
    }

    const formData = reactive({});

    // Sets up formData with all the tenses
    showOrder.forEach(tense => {
        if(checkImperatif(tense)){
            const pronounObj = {};
            for(const pronoun of Object.keys(imperatifEquivalents[tense])) {
                if(props.conj[imperatifEquivalents[tense][pronoun]]) pronounObj[pronoun] = "";
            }

            if (Object.keys(pronounObj).length === 0) return;
            formData[tense] = { primary: pronounObj };

            const secondaryPronounObj = {};
            if(tense === 'imperatif'){
                if(props.conj['tu_form_imperatif_secondary']) secondaryPronounObj['tu'] = "";
                if(props.conj['nous_form_imperatif_secondary']) secondaryPronounObj['nous'] = "";
                if(props.conj['vous_form_imperatif_secondary']) secondaryPronounObj['vous'] = "";
            }
            if(Object.keys(secondaryPronounObj).length > 0){
                formData[tense].secondary = secondaryPronounObj;
            }
            return;
        }

        formData[tense] = { primary: "" };
        if(props.conj?.[secondaryEquivalents[tense]]){
            formData[tense].secondary = "";
        }
    });

    // Checks if all fields were attempted
    function checkCompleted(){
        if(!props.conj) return;
        const uncompleted = new Set();
        
        for (const key in formData) {
            if (Object.hasOwn(formData, key)){
                if(checkImperatif(key)){
                    for (const impPronoun in formData[key].primary) {
                        if (Object.hasOwn(formData[key].primary, impPronoun)){
                            if(!formData[key].primary[impPronoun] || formData[key].primary[impPronoun].trim() === ''){
                                uncompleted.add(key);
                            }
                        }
                    }
                    if(key === 'imperatif' && formData[key].secondary){
                        for (const impPronoun in formData[key].secondary) {
                            if (Object.hasOwn(formData[key].secondary, impPronoun)){
                                if(!formData[key].secondary[impPronoun] || formData[key].secondary[impPronoun].trim() === ''){
                                    uncompleted.add(key);
                                }
                            }
                        }
                    }
                }
                else {
                    if(!formData[key].primary || formData[key].primary.trim() === ''){
                        uncompleted.add(key);
                    }
                    if(formData[key].secondary){
                        if(!formData[key].secondary || formData[key].secondary.trim() === ''){
                            uncompleted.add(key);
                        }
                    }
                }
            }
        }

        if(uncompleted.size > 0) modalToggle.value = true;
        else checkAnswers();
    }

    // Checks for answer correctness
    function checkAnswers(){
        const incorrect = new Map();

        for(const tense in formData) {
            if(checkImperatif(tense)){
                if(tense === 'imperatif' && formData[tense].secondary){
                    for(const impPronoun in formData[tense].primary) {
                        let primaryIncorrect = true;
                        let switched = false;
                        const primaryAns = formData[tense].primary[impPronoun].trim();
                        const secondaryAns = formData[tense].secondary[impPronoun].trim();
                        const primaryCorrect = props.conj[imperatifEquivalents[tense][impPronoun]]

                        if(primaryCorrect === primaryAns){
                            primaryIncorrect = false;
                        }
                        else if(primaryCorrect === secondaryAns){
                            primaryIncorrect = false;
                            switched = true;
                        }

                        const cur = incorrect.get(tense) ?? incorrect.set(tense, {}).get(tense);
                        Object.hasOwn(cur, 'primary') || (cur.primary = []);
                        if (primaryIncorrect) cur.primary.push(impPronoun);
                        if (switched){
                            Object.hasOwn(cur, 'switched') || (cur.switched = []);
                            cur.switched.push(impPronoun);
                        }
                    }
                    for(const impPronoun in formData[tense].secondary) {
                        let secondaryIncorrect = true;
                        let switched = false;
                        const primaryAns = formData[tense].primary[impPronoun].trim();
                        const secondaryAns = formData[tense].secondary[impPronoun].trim();
                        const secondaryCorrect = props.conj[imperatifEquivalents['imperatif_secondary'][impPronoun]];

                        if(secondaryCorrect === secondaryAns){
                            secondaryIncorrect = false;
                        }
                        else if(secondaryCorrect === primaryAns){
                            secondaryIncorrect = false;
                            switched = true;
                        }

                        const cur = incorrect.get(tense) ?? incorrect.set(tense, {}).get(tense);
                        Object.hasOwn(cur, 'secondary') || (cur.secondary = []);
                        if (secondaryIncorrect) cur.secondary.push(impPronoun);
                        if (switched){
                            Object.hasOwn(cur, 'switched') || (cur.switched = []);
                            cur.switched.push(impPronoun);
                        }
                    }
                }
                else{
                    for(const impPronoun in formData[tense].primary) {
                        if(formData[tense].primary[impPronoun].trim() !== props.conj[imperatifEquivalents[tense][impPronoun]]){
                            const cur = incorrect.get(tense) ?? incorrect.set(tense, {}).get(tense);
                            Object.hasOwn(cur, 'primary') || (cur.primary = []);
                            cur.primary.push(impPronoun);
                        }
                    }
                }
            }
            else {
                if(Object.hasOwn(formData[tense], 'secondary')){
                    let primaryIncorrect = true;
                    let secondaryIncorrect = true;
                    let switched = false;
                    const primaryAns = formData[tense].primary.trim();
                    const secondaryAns = formData[tense].secondary.trim();
                    const primaryCorrect = props.conj[tense];
                    const secondaryCorrect = props.conj[secondaryEquivalents[tense]];

                    if(primaryCorrect === primaryAns){
                        primaryIncorrect = false;
                    }
                    else if(primaryCorrect === secondaryAns){
                        primaryIncorrect = false;
                        switched = true;
                    }

                    if(secondaryCorrect === secondaryAns){
                        secondaryIncorrect = false;
                    }
                    else if(secondaryCorrect === primaryAns){
                        secondaryIncorrect = false;
                        switched = true;
                    }

                    if (primaryIncorrect)   (incorrect.get(tense) ?? incorrect.set(tense, []).get(tense)).push('p');
                    if (secondaryIncorrect) (incorrect.get(tense) ?? incorrect.set(tense, []).get(tense)).push('s');
                    if (switched)           (incorrect.get(tense) ?? incorrect.set(tense, []).get(tense)).push('w');
                }
                else {
                    if(formData[tense].primary.trim() !== props.conj[tense]){
                        const cur = incorrect.get(tense) ?? incorrect.set(tense, []).get(tense);
                        cur.push('p');
                    }
                }
            }
        }
        console.log("conj:", props.conj);
        console.log("incorrect:", incorrect);
        console.log("formData:", formData);
        emit('completed', incorrect, formData);
    }
</script>