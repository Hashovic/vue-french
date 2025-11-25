<template>
  <DotLottieVue ref="playerRef" :data="JSON.stringify(animation)"
    :style="`width: ${size}px; height: ${size}px`" />
</template>
<script setup>
    import { DotLottieVue } from '@lottiefiles/dotlottie-vue';
    import { ref } from 'vue';
    const playerRef = ref(null);

    const props = defineProps({
        animation: { type: Object, required: true },
        size: { type: Number, default: 128 }
    })

    function getPlayer() {
        return playerRef.value?.getDotLottieInstance();
    }

    function play(){
        getPlayer()?.play();
    }

    defineExpose({
        play,
    });
</script>