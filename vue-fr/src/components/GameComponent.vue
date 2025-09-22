<template>
    <div v-if="conj" class="w-5/8 mx-auto">
        <h2 class="text-4xl font-light "><span class="font-medium text-sky-700 dark:text-amber-500">Verb: </span>{{ conj.verb }}</h2>
        <div class="flex flex-row pb-3">
            <div class="w-5/6 flex flex-col sm:flex-row ml-2">
                <h3 class="text-xl mr-4"><span class="font-medium">Translation: </span>{{ conj.translation }}</h3>
                <h3 class="text-xl mr-4"><span class="font-medium">Pronoun: </span><span class="text-sky-700 dark:text-amber-500">{{ pronoun }}</span></h3>
            </div>
        </div>
        <form v-if="conj" @submit.prevent="check" class="grid grid-cols-1 py-1 gap-y-2">
            <GameUnit
                v-for="(ans, tense) in formData"
                :tense="tense"
                :ans="ans"
                :has-secondary="checkSecondary(tense) ? true : false"
                :pronoun="pronoun"
            />
            <button type="submit" class="w-full cursor-pointer mx-auto my-4 bg-sky-700 hover:bg-sky-800 text-white font-bold py-2 px-4 rounded dark:bg-amber-500 dark:hover:bg-amber-600 transition-colors">Submit Answers</button>
        </form>
    </div>
</template>
<script setup>
    import { verbathonTenses, allTensesIdList, tenseCheckList, secondaryEquivalents } from '@/utils/tenseLists';
    import GameUnit from '@/components/GameUnit.vue';
    import { reactive } from 'vue';

    const props = defineProps({
        options: Object,
        verb: String,
        conj: Object,
        pronoun: String
    });

    const checkSecondary = (t) => {
        if(checkImperatif(t)) {
            return Object.keys(formData[t].secondary).length > 0;
        }
        return Object.hasOwn(formData[t], 'secondary');
    };
    const checkImperatif = (t) => t === 'imperatif' || t === 'passe_imperatif';

    let showOrder = [];

    switch (props.options.tnRad){
        case 'tn-v':
            showOrder = verbathonTenses; break;
        case 'tn-a': 
            showOrder = allTensesIdList; break;
        case 'tn-s':
            showOrder = props.options.tnCh.map(x => tenseCheckList.find(y => y.shortId === x).id); break;
        default:
            showOrder = verbathonTenses; break;
    }

    const formData = reactive({});
    
    showOrder.forEach(tense => {
        if(checkImperatif(tense)){
            formData[tense] = { primary: {tu: "", nous: "", vous: "" } };
            if(tense === 'imperatif'){
                formData[tense].secondary = {};
                if(props.conj['tu_form_imperatif_secondary']) formData[tense].secondary['tu'] = "";
                if(props.conj['nous_form_imperatif_secondary']) formData[tense].secondary['nous'] = "";
                if(props.conj['vous_form_imperatif_secondary']) formData[tense].secondary['vous'] = "";
            }
            return;
        }

        formData[tense] = { primary: "" };
        if(props.conj?.[secondaryEquivalents[tense]]){
            formData[tense].secondary = "";
        }
    });

    function check(){
        if(!props.conj) return;
        
        console.log(formData);
    }
</script>