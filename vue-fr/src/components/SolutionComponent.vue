<template>
    <div class="w-7/8 mx-auto">
        <h2 class="text-4xl font-light "><span class="font-medium text-sky-700 dark:text-amber-500">Summary: </span>{{ conj.verb }}</h2>
        <div class="flex flex-row pb-3">
            <div class="w-5/6 flex flex-col sm:flex-row ml-2">
                <h3 class="text-xl mr-4"><span class="font-medium">Translation: </span>{{ conj.translation }}</h3>
                <h3 class="text-xl mr-4"><span class="font-medium">Pronoun: </span><span class="text-sky-700 dark:text-amber-500">{{ pronoun }}</span></h3>
            </div>
        </div>
        <div class="grid grid-cols-[3fr_1fr] gap-4 mb-8">
            <div>
                <SolutionUnit v-for="(ans, tense) in formData" :key="tense" @inc-incorrect="addIncorrect" @inc-total="addTotal" :conj="conj" :tense="tense" :answer="ans" :incorrect="incorrect" />
                <button
                    type="button"
                    class="w-full cursor-pointer mx-auto my-5 bg-sky-700 hover:bg-sky-800 dark:bg-amber-500 dark:hover:bg-amber-600 text-white font-bold py-2 px-4 rounded transition-colors outline-none disabled:opacity-50 disabled:pointer-events-none"
                    @click="restart"
                >
                    Restart
                </button>
            </div>
            <div class="grid grid-rows-[1fr_2fr_2fr] gap-5">
                <div class="flex flex-col justify-between border-1 bg-gray-600/10 text-7xl text-center border-gray-500/60 dark:border-gray-400/80 rounded-lg px-2 pt-5 pb-7 my-2">
                    <div>
                        {{ (totalCount - incorrectCount) / totalCount * 100 | 0 }}%
                    </div>
                    <div>
                        {{ totalCount - incorrectCount }} / {{ totalCount }}
                    </div>
                    
                </div>
                <div class="border-1 bg-gray-600/10 border-gray-500/60 dark:border-gray-400/80 rounded-lg p-2 mb-2">
                    OTHER BIG BOX
                </div>
            </div>
        </div>
    </div>
    
</template>
<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import SolutionUnit from './SolutionUnit.vue';
    
    const router = useRouter();
    const incorrectCount = ref(0);
    const totalCount = ref(0);

    const props = defineProps({
        incorrect: Object,
        formData: Object,
        conj: Object,
        pronoun: String,
    });

    function restart() {
        router.push({name: 'practice-home'});
    }

    function addIncorrect() {
        incorrectCount.value += 1;
    }

    function addTotal(inc=1) {
        totalCount.value += inc;
    }


</script>