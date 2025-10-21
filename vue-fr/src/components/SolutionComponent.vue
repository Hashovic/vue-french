<template>
    <div class="w-7/8 mx-auto">
        <h2 class="text-4xl font-light "><span class="font-medium text-sky-700 dark:text-amber-500">Summary: </span>{{ conj.verb }}</h2>
        <div class="flex flex-row pb-3">
            <div class="w-5/6 flex flex-col sm:flex-row ml-2">
                <h3 class="text-xl mr-4"><span class="font-medium">Translation: </span>{{ conj.translation }}</h3>
                <h3 class="text-xl mr-4"><span class="font-medium">Pronoun: </span><span class="text-sky-700 dark:text-amber-500">{{ pronoun }}</span></h3>
            </div>
        </div>
        <div class="grid grid-cols-[3fr_1fr] gap-4 mb-10">
            <div>
                <SolutionUnit v-for="(ans, tense) in formData" :key="tense" @inc-incorrect="addIncorrect" @inc-total="addTotal" :conj="conj" :tense="tense" :answer="ans" :incorrect="incorrect" />
            </div>
            <div class="grid grid-rows-[1fr_2fr_2fr] gap-5">
                <div class="border-1 text-6xl text-center border-gray-500/60 dark:border-gray-400/80 rounded-lg p-2 mb-2">
                    <div>
                        {{ (totalCount - incorrectCount) / totalCount * 100 | 0 }}%
                    </div>
                    <div>
                        {{ totalCount - incorrectCount }} / {{ totalCount }}
                    </div>
                    
                </div>
                <div class="border-1 border-gray-500/60 dark:border-gray-400/80 rounded-lg p-2 mb-2">
                    OTHER BIG BOX
                </div>
            </div>
        </div>
    </div>
    
</template>
<script setup>
    import { ref } from 'vue';
    import SolutionUnit from './SolutionUnit.vue';
    const incorrectCount = ref(0);
    const totalCount = ref(0);

    const props = defineProps({
        incorrect: Object,
        formData: Object,
        conj: Object,
        pronoun: String,
    });

    console.log(props.conj);

    console.log("Hello", props.incorrect);

    function addIncorrect() {
        incorrectCount.value += 1;
    }

    function addTotal(total=1) {
        totalCount.value += total;
    }


</script>