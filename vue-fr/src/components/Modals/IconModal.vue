<template>
    <svg @click="isOpen = true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="cursor-pointer size-8">
        <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
    </svg>
    <div
        v-if="isOpen"
        class="fixed inset-0 z-50 bg-black/50 overflow-y-auto"
        ref="modalRef"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-label"
    >
    <!-- Modal wrapper -->
        <div class="w-full sm:max-w-lg mx-3 sm:mx-auto mt-4">
            <div
                class="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 shadow-2xs rounded-xl pointer-events-auto transition-all duration-300 flex flex-col max-h-[60vh]"
            >
                <!-- Header -->
                <div class="flex justify-between items-center py-3 px-4 border-b border-gray-200 dark:border-neutral-700 shrink-0">
                    <h3 id="modal-label" class="font-bold text-gray-800 dark:text-white">
                        {{ modalTitle }}
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
                <div class="px-4 py-3 overflow-y-auto grow">
                    <slot>
                        This is the modal body
                    </slot>
                 </div>

                <!-- Footer -->
                <div class="flex justify-end items-center gap-x-2 py-3 px-4 border-t border-gray-200 dark:border-neutral-700 shrink-0">
                    <button
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
    import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';

    const modalRef = ref(null);
    const emit = defineEmits(['confirm', 'clicked']);
    const isOpen = defineModel({default: false});

    defineProps({
        // Title for modal
        modalTitle: {
            type: String,
            default: 'Modal Title'
        },
        // Content for modal
        modalBody: {
            type: String,
            default: 'This is the modal body content.'
        },
        // Text for closing button in modal
        buttonTextClose: {
            type: String,
            default: 'Close'
        },
    })

    // Focus trap deatils
    const { activate, deactivate } = useFocusTrap(modalRef, {
        escapeDeactivates: true,
        allowOutsideClick: true,
        onDeactivate: () => isOpen.value = false,
    })

    // Changes open or closed state based on isOpen
    watch(isOpen, async (open) => {
        if (open){
            await nextTick();
            activate()
        }
        else deactivate()
    })
</script>
