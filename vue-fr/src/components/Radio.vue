<template>
    <div>
        <label
            class="flex w-full items-center rounded-lg px-3 py-2 dark:hover:bg-gray-600/80 hover:bg-slate-200/65 focus:bg-slate-200/65 active:bg-slate-200/65 cursor-pointer"
            :for="radioLabel"
        >
            <input 
                :name="grName" :id="radioLabel"
                type="radio" class="peer h-5 w-5 shadow hover:shadow-md cursor-pointer appearance-none rounded-full border dark:border-gray-200 dark:checked:border-gray-100 border-slate-300 checked:border-slate-400"
                @click="$emit('setActive', label)"
            >
            <span class="relative bg-slate-800 dark:bg-slate-200 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transform -translate-x-4">
            </span>
            <span class="ml-2 dark:text-gray-200 text-slate-600 text-sm">{{ label }}</span>
        </label>
    </div>
</template>
<script setup>
    import { ref } from 'vue';

    const props = defineProps({
        label: String,
        grName: String,
    });

    const radioLabel = ref(props.label.replace(/\s+/g, '-').toLowerCase() + '-radio');

</script>