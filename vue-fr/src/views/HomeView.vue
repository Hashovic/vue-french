<template>
    <div class="flex items-baseline justify-center flex-wrap border-2 p-4 rounded-4xl">
        <h1 class="flex text-8xl sm:text-9xl font-mono tracking-widest">
            <span
                v-for="(c,i) in hash"
                :class="{'motion-safe:bg-sky-500/70 motion-safe:dark:bg-red-500/70': (curIndex === i)}"
            >{{ c }}</span>
        </h1>
        <h1 class="flex text-8xl sm:text-9xl font-mono tracking-widest">
            <span
                v-for="(c,i) in conj"
                :class="{'motion-safe:bg-sky-500/70 motion-safe:dark:bg-red-500/70': (curIndex === i + hash.length)}"
            >{{ c }}</span>
        </h1>
        <h3 class="text-2xl hidden md:block">.com</h3>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 md:gap-40 p-2 items-baseline mt-10 mb-20 flex-wrap">
        <RouterLink 
            class="rounded-xl border-2 hover:bg-gray-500/20 border-gray-500/70 text-center font-mono text-5xl p-7"
            :to="{name: 'conjugation-home'}"
        >Conjugation</RouterLink> 
        <RouterLink 
            class="rounded-xl border-2 hover:bg-gray-500/20 border-gray-500/70 text-center font-mono mt-10 text-5xl p-7"
            :to="{name: 'practice-home'}"
        >Practice</RouterLink> 
    </div>
    <div>
        <h2 class="text-center text-2xl">Bienvenue!</h2>
        <p>
            Bonjour &agrave; tous! 
        </p>
    </div>
</template>

<script setup>
    import { ref, watch, onMounted, onUnmounted } from "vue";

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const nums = "0123456789";
    const symbols = "!@#$%&?";

    const allChars = letters + nums + symbols;

    const hashText = 'HASH';
    const conjText = 'CONJ';

    const hash = ref(hashText);
    const conj = ref(conjText);
    const curIndex = ref(0);
    
    // selects a random char from allChars
    function randomChar() {
        const index = Math.floor(Math.random() * allChars.length);
        return allChars[index];
    }


    let intervalId;
    let convergeIntervalId;

    // clears intervals
    function endIntervals() {
        clearInterval(intervalId);
        clearInterval(convergeIntervalId);
    }

    // sets up two intervals
    onMounted(() => {
        // changes characters in hash and conj randomly gradually convering to "HASH CONJ"
        intervalId = setInterval(() => {
            const len = (curIndex.value - hash.value.length);
            const conjLen = (len > 0 ? len : 0)
            hash.value = hashText.slice(0, curIndex.value) + hash.value.slice(curIndex.value).split('').map(_ => randomChar()).join('');
            conj.value = conjText.slice(0, conjLen) + conj.value.slice(conjLen).split('').map(_ => randomChar()).join('');
        }, 85);

        // increments curIndex
        convergeIntervalId = setInterval(() => {
            curIndex.value++;
        }, 260);
    });

    // If index reaches end of both words stop the intervals
    watch(curIndex, (cur) => {
        if(cur > (hash.value.length + conj.value.length)) endIntervals();
    })

    // If unmounted end the intervals
    onUnmounted(() => {
        endIntervals();
    });
</script>

