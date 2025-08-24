<template>
    <div class="rounded-lg border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600/10">
        <div class="grid grid-rows-3 grid-flow-col">
            <Radio 
                v-for="(item, i) in radioList"
                :key="i"
                :label="item.label"
                :id="item.id"
                :grName="grName"
                @set-active="(l) => activate(l)"
                v-model="radioPicked"
            />
        </div>
        <ul class="ml-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-rows-5 lg:grid-flow-col">
            <li
                v-for="(item, i) in checkList"
                :key="i"
                >
                <Checkbox
                    :label="item.label"
                    :id="item.id"
                    :isDisabled="shouldDisable"
                    v-model="checkPicked"
                />
            </li>    
        </ul>
    </div>
</template>
<script setup>
    import { ref } from 'vue';
    import Radio from '@/components/Radio.vue';
    import Checkbox from '@/components/Checkbox.vue';

    const props = defineProps({
        radioList: Array,   // array of objects {label, id?, allowsChecks, setChecked?}
        checkList: Array,   // array of objects {label, id?}`
        grName: String      // group name for radio buttons
    });

    const curRadio = ref([]);

    const radioPicked = defineModel('radioPicked', { type: String });
    const checkPicked = defineModel('checkPicked', { type: Array });

    const shouldDisable = ref(true);

    function activate(label) {
        curRadio.value = props.radioList.find(item => item.label === label);
        if (!curRadio.value) return;

        shouldDisable.value = !curRadio.value.allowsChecks;
        checkPicked.value = curRadio.value.setChecked || (curRadio.value.allowsChecks ? checkPicked.value : []);
    }
</script>