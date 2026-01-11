<template>
    <div class="lg:w-7/8 mx-auto">
        <h2 class="text-4xl font-light "><span class="font-medium text-sky-700 dark:text-amber-500">Summary: </span>{{ conj.verb }}</h2>
        <div class="flex flex-row pb-3">
            <div class="w-5/6 flex flex-col sm:flex-row ml-2">
                <h3 class="text-xl mr-4"><span class="font-medium">Translation: </span>{{ conj.translation }}</h3>
                <h3 class="text-xl mr-4"><span class="font-medium">Pronoun: </span><span class="text-sky-700 dark:text-amber-500">{{ pronoun }}</span></h3>
            </div>
        </div>
        <div class="grid lg:grid-cols-[3fr_1fr] gap-4 mb-8">
            <div class="lg:row-start-1 lg:col-start-2 flex flex-col justify-start gap-10 self-start border-1 bg-gray-600/10 text-7xl text-center border-gray-500/60 dark:border-gray-400/80 rounded-lg px-2 pt-5 pb-7 my-2">
                <div>
                    {{ percentage }}%
                </div>
                <div>
                    {{ totalCount - incorrectCount }} / {{ totalCount }}
                </div>
                <div class="italic text-base">
                    <p v-if="percentage === 100">perfect score!</p>
                    <p v-else-if="percentage >= 80">wow that's pretty good</p>
                    <p v-else-if="percentage >= 60">keep practicing, you got this!</p>
                    <p v-else-if="percentage >= 40">progress is progress, keep it up!</p>
                    <p v-else-if="percentage > 0">hey, at least it’s not zero</p>
                    <p v-else>you can only get better from here :&rpar;</p>
                </div>
            </div>
            <div>
                <SolutionUnit v-for="(ans, tense) in formData" :key="tense" @inc-incorrect="addIncorrect" @inc-total="addTotal" :conj="conj" :tense="tense" :answer="ans" :incorrect="incorrect" />
                <button
                    type="button"
                    class="w-full not-md:text-xl cursor-pointer mx-auto my-5 bg-sky-700 hover:bg-sky-800 dark:bg-amber-500 dark:hover:bg-amber-600 text-white font-bold py-2 px-4 rounded transition-colors outline-none disabled:opacity-50 disabled:pointer-events-none"
                    @click="restart"
                >
                    Restart
                </button>
            </div>
        </div>
    </div>
    
</template>
<script setup>
    import { ref, computed } from 'vue';
    import { useRouter } from 'vue-router';
    import SolutionUnit from './SolutionUnit.vue';
    
    const router = useRouter();
    const incorrectCount = ref(0);
    const totalCount = ref(0);

    const percentage = computed(() => Math.round((totalCount.value - incorrectCount.value) / totalCount.value * 100));

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