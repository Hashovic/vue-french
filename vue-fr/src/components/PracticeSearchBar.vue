<template>
    <div class="w-full sm:w-1/2 lg:w-1/3 mb-4">
        <!-- <p>{{ description ?? 'Search:' }}</p> -->
        <form
            @submit.prevent="selectVerb()"
        >
            <input
                type="text"
                ref="inputRef"
                spellcheck="false"
                placeholder="Enter a verb to conjugate"
                class="border-2 outline-none focus:border-sky-500 dark:focus:border-amber-500 transition-colors duration-100 border-gray-300 p-2 rounded w-full"
                v-model="search"
                @focus="hasFocus = true"
                @blur="hasFocus = false"
                @keydown="onKeyDown"
                @input="handleInput"
            >
        </form>
        <ul v-if="hasFocus" class="z-10 rounded-lg absolute bg-[#eeeeee] dark:bg-gray-800 w-36 text-md">
            <RouterLink 
                v-for="(vb, i) in computedList" 
                class="block"
                :class="{'bg-gray-300 dark:bg-gray-700 rounded-lg': (i === highlightIndex)}"
                :key="vb"
                @mouseenter="highlightIndex = i; usedMouse = true"
                @mousedown.prevent="selectVerb()"
                :to="{name: 'conjugation', params: {verb: vb}}"
            >
                <li class="py-1 pl-2">
                    {{ vb }}
                </li>
            </RouterLink>
        </ul>
    </div>
</template>
<script setup>
    import { ref, computed, watch } from 'vue';
    import { useRoute } from 'vue-router';
    import { normalizeAccent, getAutocomplete } from '@/utils/helper.js';

    const props = defineProps({description: String});
    const model = defineModel();
    const route = useRoute();
    const search = ref(model.value);
    const autoVerbList = ref([]);
    const hasFocus = ref(false);
    const highlightIndex = ref(-1);
    const currentInput = ref('');
    const usedMouse = ref(false);
    const inputRef = ref(null);

    // Creates a relevant list of autocomplete verbs depending on search term and cache
    const computedList = computed(() => {
        const normalizedSearchTerm = normalizeAccent(currentInput.value.trim());
        const len = normalizedSearchTerm.length;
        if(len > 1){
            return autoVerbList.value.filter((verbObj) => normalizeAccent(verbObj.verb).startsWith(normalizedSearchTerm))
                .slice(0,10)
                .map(verbObj => verbObj.verb);
        }
        return [];
    });

    // Watches the model value in case it changes making it the new source of truth
    watch(() => model.value, () => {
        search.value = model.value;
        currentInput.value = search.value;
    })

    // Resets the highlight index when the list changes
    watch(() => computedList.value, () => highlightIndex.value = -1);

    // After a key press in the input statement, checks whether or not anything is needed for the dropdown
    function onKeyDown(e){
        if(!computedList.value.length) return;
        const len = computedList.value.length;

        if(e.key === 'ArrowDown'){
            e.preventDefault();
            highlightIndex.value = (highlightIndex.value + 1);
            if(highlightIndex.value >= len) highlightIndex.value = -1;
        }

        if(e.key === 'ArrowUp'){
            e.preventDefault();
            highlightIndex.value = (highlightIndex.value - 1);
            if(highlightIndex.value < -1) highlightIndex.value = len - 1;
        }
    }

    // Update highlightIndex and currentInput with relevant values on input
    function handleInput() {
        highlightIndex.value = -1;
        currentInput.value = search.value;
        hasFocus.value = true;
    }

    // When the highlightIndex changes, search.value updates to the current highlightedIndex
    // or currentInput (if it's less than 0) unless mouse is used
    watch(() => highlightIndex.value, (cur) => {
        if(usedMouse.value){
            usedMouse.value = false;
            return;
        }
        if(cur >= 0) search.value = computedList.value[highlightIndex.value];
        else search.value = currentInput.value;
    })

    // Checks whether a new autocomplete is needed or if current cache is good
    watch(() => currentInput.value, async (newTerm, oldTerm, onCleanup) => {
        let cancelled = false;
        const normalizedNew = normalizeAccent(newTerm);
        const normalizedOld = normalizeAccent(oldTerm);

        onCleanup(() => cancelled = true);

        if(normalizedNew.length === 2 || (normalizedNew.length >= 2 && (normalizedNew.substring(0,2) !== normalizedOld.substring(0,2)))) {
            const res_auto = await getAutocomplete(search.value);
            if(!cancelled){
                autoVerbList.value = res_auto;
            }
        }
    });

    // Reset search value when new route is visited
    watch(() => route.fullPath,() => search.value = '');

    // Sets the current value of the search bar to the model and currentInput
    const selectVerb = () => {
        model.value = search.value;
        inputRef.value?.blur();
        highlightIndex.value = -1;
        currentInput.value = search.value;
    }

</script>