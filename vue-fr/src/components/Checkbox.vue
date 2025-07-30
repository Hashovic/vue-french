<template>
    <div>
        <label
            role="button"
            class="flex w-full items-center rounded-lg px-3 py-2 dark:hover:bg-gray-600/80 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 cursor-pointer"
        >
            <input
                :id="checkboxLabel"
                type="checkbox"
                class="peer h-5 w-5 cursor-pointer appearance-none rounded shadow hover:shadow-md border border-slate-300 dark:checked:bg-amber-500 dark:checked:border-amber-500 checked:bg-sky-600 checked:border-sky-600 relative"
            />
            <span class="relative opacity-0 text-gray-100 dark:text-gray-800 peer-checked:opacity-100 transform -translate-x-[18px] pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="4" stroke="currentColor" class="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
            </span>
            <!-- <span
                class="relative opacity-0 peer-checked:opacity-100 transform -translate-x-[17px] pointer-events-none"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-white stroke-white" viewBox="0 0 20 20"
                stroke="currentColor" fill="currentColor" stroke-width="1">
                <path fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"></path>
                </svg>
            </span> -->
            <span class="ml-2 dark:text-gray-200 text-slate-600 text-sm">{{ label }}</span>
        </label>
    </div>
</template>
<script setup>
    import { ref } from 'vue';

    const props = defineProps({
        label: String
    });

    const checkboxLabel = ref(props.label.replace(/\s+/g, '-').toLowerCase());

</script>