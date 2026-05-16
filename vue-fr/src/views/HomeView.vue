<template>
    <div
        class="flex items-baseline justify-center flex-wrap border-2 p-4 rounded-4xl"
    >
        <h1 class="flex text-8xl sm:text-9xl font-mono tracking-widest">
            <span
                v-for="(c, i) in hash"
                :class="{
                    'motion-safe:bg-sky-500/70 motion-safe:dark:bg-red-500/70':
                        curIndex === i,
                }"
                >{{ c }}</span
            >
        </h1>
        <h1 class="flex text-8xl sm:text-9xl font-mono tracking-widest">
            <span
                v-for="(c, i) in conj"
                :class="{
                    'motion-safe:bg-sky-500/70 motion-safe:dark:bg-red-500/70':
                        curIndex === i + hash.length,
                }"
                >{{ c }}</span
            >
        </h1>
        <h3 class="text-2xl hidden md:block">.com</h3>
    </div>
    <div
        class="grid grid-cols-1 md:grid-cols-2 md:gap-40 p-2 items-baseline mt-10 mb-20 flex-wrap"
    >
        <RouterLink
            class="rounded-xl border-2 hover:bg-gray-500/20 border-gray-500/70 text-center font-mono text-5xl p-7"
            :to="{ name: 'conjugation-home' }"
            >Conjugation</RouterLink
        >
        <RouterLink
            class="rounded-xl border-2 hover:bg-gray-500/20 border-gray-500/70 text-center font-mono mt-10 text-5xl p-7"
            :to="{ name: 'practice-home' }"
            >Practice</RouterLink
        >
    </div>
    <div
        class="border-2 rounded-xl font-mono border-gray-500/70 max-w-2xl p-4 mx-auto"
    >
        <h2 class="text-center text-2xl mb-4">Bienvenue!</h2>
        <p class="text-base/8">
            Bonjour &agrave; tous! Welcome to this site! If you're looking for a
            conjugation head to the conjugation page and if you want to test
            your knowledge, head over to the practice page. I've added the most
            used verbs out of the 5000 most common french words &lpar;around
            1100 verbs in total&rpar; so this should cover most conjugations.
            This site is far from perfect so if you notice an issue or want me
            to add a conjugation, just let me know on the help page. 
	    <br>
	    <br>
	    Feel free to check out the README.md file on the
            <a
                class="text-sky-600 hover:text-amber-500 dark:text-amber-500 dark:hover:text-fuchsia-600"
                target="_blank"
                title="Go to github page"
                href="https://github.com/Hashovic/vue-french"
                >github page</a
            >
            for this site if you want to know how this was made!
        </p>
    </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const nums = "0123456789";
const symbols = "!@#$%&?";

const allChars = letters + nums + symbols;

const hashText = "HASH";
const conjText = "CONJ";

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
        const len = curIndex.value - hash.value.length;
        const conjLen = len > 0 ? len : 0;
        hash.value =
            hashText.slice(0, curIndex.value) +
            hash.value
                .slice(curIndex.value)
                .split("")
                .map((_) => randomChar())
                .join("");
        conj.value =
            conjText.slice(0, conjLen) +
            conj.value
                .slice(conjLen)
                .split("")
                .map((_) => randomChar())
                .join("");
    }, 85);

    // increments curIndex
    convergeIntervalId = setInterval(() => {
        curIndex.value++;
    }, 260);
});

// If index reaches end of both words stop the intervals
watch(curIndex, (cur) => {
    if (cur > hash.value.length + conj.value.length) endIntervals();
});

// If unmounted end the intervals
onUnmounted(() => {
    endIntervals();
});
</script>
