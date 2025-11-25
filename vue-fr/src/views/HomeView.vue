<script setup>
import Modal from '@/components/Modal.vue';
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import LottieComponent from '@/components/LottieComponent.vue';
import { ref } from 'vue';
import iconJson from '@/assets/lottie/icons8-share.json';
import ClipboardButton from '@/components/Clipboard/ClipboardButton.vue';
import ClipboardModal from '@/components/Clipboard/ClipboardModal.vue';

const modT = ref(false);
const modC = ref(false);
const copyText = 'hashconj.com/practice/manger?opt=o123psP5nsN15H62A4E7B839CDFGI';
const copyText2 ='http://localhost:5173/practice/manger?opt=oprnvN'
// const playerRef = ref(null);

</script>

<template>
  <div>
    <p>This is the home page</p>
  </div>
  <Modal v-model="modT" @clicked="modT = true" @confirm="console.log('yippee!')" />
  <ClipboardButton text="Copy me!" />
  <ClipboardModal v-model="modC" button-text="Open" @clicked="modC = true" modalTitle="Share this preset" :modalCopy="copyText2" />

  <!-- <LottieComponent @click="playerRef.play()" ref="playerRef" :animation="iconJson" /> -->
</template>
