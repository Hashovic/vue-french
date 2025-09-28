<script setup>
import Modal from '@/components/Modal.vue';
import { ref } from 'vue';

const modT = ref(false);

</script>

<template>
  <div>
    <p>This is the home page</p>
  </div>
  <Modal v-model="modT" @clicked="modT = true" @confirm="console.log('yippee!')" />
</template>
