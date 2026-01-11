<template>
    <div
        v-if="isOpen"
        class="fixed inset-0 z-50 bg-black/50 overflow-y-auto"
        ref="modalRef"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-label"
    >
      <!-- Modal Wrapper -->
        <div class="sm:w-full sm:max-w-lg mx-4 sm:mx-auto mt-4">
            <div
                class="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 shadow-2xs rounded-xl pointer-events-auto transition-all duration-300"
            >
            <!-- Header -->
                <div class="flex justify-between items-center py-3 px-4 border-b border-gray-200 dark:border-neutral-700">
                    <h3 id="modal-label" class="font-bold text-gray-800 dark:text-white">
                        {{ modalTitle }} ({{ pageIndex + 1 }}/{{ modalInputs.length + 1 }})
                    </h3>
                    <button
                        type="button"
                        class="cursor-pointer size-8 inline-flex justify-center items-center rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-gray-800 dark:text-neutral-400"
                        aria-label="Close"
                        @click="isOpen = false"
                    >
                    <span class="sr-only">Close</span>
                    <svg class="shrink-0 size-[18px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 6L6 18M6 6l12 12" />
                    </svg>
                    </button>
                </div>

                <!-- Body -->
                <div class="p-4 text-base/7">
                    <div class="pl-2 mb-5">
                        {{ modalBodies[pageIndex] }}
                    </div>
                    <div v-if="pageIndex < modalInputs.length" class="flex items-baseline justify-evenly">
                        <div class="mr-5 select-none">
                            {{ modalInputs[pageIndex] }}
                        </div>
                        <form @submit.prevent="handleNext">
                            <input 
                                class="w-full appearance-none p-2 bg-transparent outline-0 rounded-lg border-2 border-gray-300 dark:border-gray-600"
                                :class="{'border-red-500': incorrect}"
                                :placeholder="incorrect ? 'Try again.' : 'Try it!'"
                                @input="e => handleInput(e, val => inputModel = val)"
                                v-model="inputModel"
                                autocomplete="off" 
                                spellcheck="false"
                                name="next-button"
                            >
                        </form>
                    </div>
                </div>

                <!-- Footer -->
                <div class="flex justify-end items-center gap-x-2 py-3 px-4 border-t border-gray-200 dark:border-neutral-700">
                    <button
                        v-if="pageIndex < modalInputs.length"
                        type="button"
                        class="cursor-pointer py-2 px-3 inline-flex items-center gap-x-2 text-sm bg-sky-700 hover:bg-sky-800 dark:bg-amber-500 dark:hover:bg-amber-600 duration-80 transition-colors text-white font-medium rounded-lg border border-transparent"
                        @click="handleNext"
                    >
                        {{ buttonTextNext }}
                    </button>
                    <button
                        v-else
                        type="button"
                        class="cursor-pointer py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white hover:bg-gray-200 duration-80 transition-colors dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700"
                        @click="isOpen = false"
                    >
                        {{ buttonTextClose }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, watch, nextTick } from 'vue';
    import { handleInput } from '@/utils/helper';
    import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';

    const modalRef = ref(null);
    const emit = defineEmits(['confirm', 'clicked']);
    const modalTitle = ref('Accent Tutorial');
    const modalBodies = ref([
        'Bonjour! Welcome to this quick tutorial on how to add accents. In this website there is no dedicated button for accents. Instead there are shortcuts you can use. For example, you can write the vowel follwed by a "/" (so something like "e/") to create an accent aigu. Try it with the example below:',
        'Pretty cool right! Here try another one. For an accent grave you can either use the backslash ( \\ ) or the backtick ( ` ) after the vowel.',
        'Good work! Here\'s another one you\'ll be using often. To form the cédille, simply add a comma after the c (so c,).',
        'Nice job! That\'s all for now, if you ever forget a shortcut or need to know more accents, just hit the info button up near the header to get more information. Bonne chance!'
    ]);
    const modalInputs = ref(['mangé', 'préfèré', 'français']);
    const pageIndex = ref(0);
    const inputModel = ref(null);
    const incorrect = ref(false);

    const isOpen = defineModel({default: false});

    defineProps({
        // Button close text
        buttonTextClose: {
            type: String,
            default: 'Close'
        },
        // Text for next button in modal
        buttonTextNext: {
            type: String,
            default: 'Next'
        },
    })

    const { activate, deactivate } = useFocusTrap(modalRef, {
        escapeDeactivates: false,
        onDeactivate: () => {
            isOpen.value = false;
            pageIndex.value = 0;
            inputModel.value = '';
        },
    })

    watch(isOpen, async (open) => {
    if (open){
        await nextTick();
        activate()
    }
        else deactivate()
    })

    watch(inputModel, () => {
        if (inputModel.value) incorrect.value = false;
    })

    function handleNext() {
        if(inputModel.value?.toLowerCase() === modalInputs.value[pageIndex.value]?.toLowerCase()){
            incorrect.value = false;
            pageIndex.value++;
        }
        else incorrect.value = true;

        inputModel.value = '';
    }

</script>
