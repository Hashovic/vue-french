<template>
    <div>
        <label
            role="button"
            class="flex w-full items-center rounded-lg px-3 py-2 dark:hover:bg-gray-600/80 hover:bg-slate-200/65 focus:bg-slate-200/65 active:bg-slate-200/65 cursor-pointer"
            :class="{'opacity-50 pointer-events-none': isDisabled}"
        >
            <input
                :id="checkboxLabel"
                type="checkbox"
                :disabled="isDisabled"
                :value="checkboxLabel"
                v-model="checked"
                class="peer h-5 w-5 cursor-pointer appearance-none rounded shadow hover:shadow-md border border-slate-300 dark:checked:bg-amber-500 dark:checked:border-amber-500 checked:bg-sky-600 checked:border-sky-600 relative"
            />
            <span class="relative opacity-0 text-gray-100 dark:text-gray-800 peer-checked:opacity-100 transform -translate-x-[17px] pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="5" stroke="currentColor" class="size-[14px]">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
            </span>
            <span class="ml-2 dark:text-gray-200 text-slate-600 text-sm">{{ label }}</span>
        </label>
    </div>
</template>
<script setup>
    const checked = defineModel({type: Array});
    const props = defineProps({
        id: String,
        label: String,
        isDisabled: {type: Boolean, default: false},
    });

    const checkboxLabel = (props.id) ?? (props.label ?? '').replace(/\s+/g, '-').toLowerCase();
</script>