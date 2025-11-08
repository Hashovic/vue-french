<template>
    <div class="rounded-lg border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600/10">
        <div class="grid grid-cols-2 grid-rows-2 grid-flow-col mb-2">
            <Radio 
                v-for="(item, i) in radioList1"
                :key="i"
                :label="item.label"
                :id="item.id"
                :grName="grName1"
                @set-active="(l) => activate(l)"
                v-model="radioPicked1"
            />
        </div>
        <ul class="ml-2 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[3fr_3fr_3fr_1fr] lg:grid-rows-3 lg:grid-flow-col">
            <li
                v-for="(item, i) in radioList2"
                :key="i"
                >
                <Radio 
                    :label="item.label"
                    :id="item.id"
                    :grName="grName2"
                    :is-disabled="shouldDisable"
                    v-model="radioPicked2"
                />
            </li>    
        </ul>
    </div>
</template>
<script setup>
    import { ref, watch } from 'vue';
    import Radio from '@/components/Radio.vue';

    const props = defineProps({
        radioList1: Array,  // array of objects {label, id?, allowsChoose: bool}
        radioList2: Array,  // array of objects {label, id?}
        grName1: String,    // group name for radio buttons
        grName2: String     // group name for radio buttons
    });

    const curRadio1 = ref([]);

    const radioPicked1 = defineModel('radioPicked1', { type: String });
    const radioPicked2 = defineModel('radioPicked2', { type: String });
    const shouldDisable = ref(props.radioList1.length > 0 && props.radioList1.find(rad => rad.id == radioPicked1.value)?.allowsChoose ? false : true);

    watch(radioPicked1, (newVal) => {
        if (!newVal){
            shouldDisable.value = true;
            radioPicked2.value = '';
        }
    });

    function activate(label) {
        curRadio1.value = props.radioList1.find(item => item.label === label);
        if (!curRadio1.value) return;

        shouldDisable.value = !curRadio1.value.allowsChoose;
        radioPicked2.value  = (curRadio1.value.allowsChoose ? radioPicked2.value : '');
    }
</script>