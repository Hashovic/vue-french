<template>
    <div class="rounded-lg border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600/10">
        <div class="grid grid-cols-1">
            <Radio 
                v-for="(item, i) in radioList"
                :key="i"
                :label="item.label"
                :grName="grName"
                @set-active="(l) => activate(l)"
                :shouldDisable="shouldDisable"
            />
        </div>
        <ul class="ml-4">
            <li
                v-for="(item, i) in checkList"
                :key="i"
                >
                <Checkbox :label="item" :isDisabled="shouldDisable" />
            </li>    
        </ul>
    </div>
</template>
<script setup>
    import { ref } from 'vue';
    import Radio from '@/components/Radio.vue';
    import Checkbox from '@/components/Checkbox.vue';

    const props = defineProps({
        radioList: Array,   // array of objects {label, allowsChecks}
        checkList: Array,   // array of strings
        grName: String      // group name for radio buttons
    });

    const shouldDisable = ref(false);
    let active = '';

    function activate(label) {
        active = label;
        shouldDisable.value = !props.radioList.find(item => item.label === label).allowsChecks;
    }

</script>