<template>
    <button
        type="button"
        class="w-full cursor-pointer mx-auto my-4 bg-sky-700 hover:bg-sky-800 text-white font-bold py-2 px-4 rounded dark:bg-amber-500 dark:hover:bg-amber-600 transition-colors outline-none disabled:opacity-50 disabled:pointer-events-none"
        @click="isOpen = true"
    >
        Submit
    </button>
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
        class="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 shadow-2xs rounded-xl pointer-events-auto transition-all duration-300"
        >
        <!-- Header -->
        <div class="flex justify-between items-center py-3 px-4 border-b border-gray-200 dark:border-neutral-700">
            <h3 id="modal-label" class="font-bold text-gray-800 dark:text-white">
            Modal title
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
        <div class="p-4">
            <p class="text-gray-800 dark:text-neutral-400">
            This is a wider card with supporting text below as a natural lead-in to additional content.
            </p>
        </div>

        <!-- Footer -->
        <div class="flex justify-end items-center gap-x-2 py-3 px-4 border-t border-gray-200 dark:border-neutral-700">
            <button
            type="button"
            class="cursor-pointer py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white hover:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700"
            @click="isOpen = false"
            >
            Close
            </button>
            <button
            type="button"
            class="cursor-pointer py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700"
            @click="handleSave"
            >
            Save changes
            </button>
        </div>
        </div>
    </div>
    </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';

const isOpen = ref(false)
const modalRef = ref(null);

const { activate, deactivate } = useFocusTrap(modalRef, {
  escapeDeactivates: true,
  allowOutsideClick: true,
  onDeactivate: () => isOpen.value = false,
})

watch(isOpen, async (open) => {
  if (open){
    await nextTick();
    activate()
}
  else deactivate()
})

function handleSave() {
  console.log('Save clicked')
  isOpen.value = false
}
</script>
