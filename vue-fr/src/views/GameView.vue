<template>
    <div>
        This is the game view
    </div>
    <div>{{ decoded }}</div>
</template>
<script setup>
    const props = defineProps({
        verbIn: String,
        options: String
    });

    function decode(str) {
        const obj = {};

        // match key + value parts
        const regex = /([t_fpPnN])([^t_fpPnN]*)/g;
        let match;
        while ((match = regex.exec(str)) !== null) {
            const key = match[1];
            const val = match[2];
            const num = Number(val);
            const len = val.length;
            
            switch (key) {
            case 't': obj.tp = (num >= 0 && num <= 1) ? num : 0; break;
            case '_': obj.vs = (num >= 0 && num <= 1) ? num : 0; break;
            case 'f': obj.fm = (num >= 0 && num <= 1) ? num : 0; break;

            case 'p': obj.prRad = 'pn-' + (len > 1 && !(['a','r','s'].includes(val)) ? 'r' : val); break;
            case 'P': obj.prCh = val.split('').map(parseInt); break;

            case 'n': obj.tnRad = 'tn-' + (len > 1 && !(['a','v','s'].includes(val)) ? 'v' : val); break;
            case 'N': obj.tnCh = val.split('').map(ch => parseInt(ch, 36)); break;
            }
        }
        return obj;
    }

    const decoded = decode(props.options);
</script>