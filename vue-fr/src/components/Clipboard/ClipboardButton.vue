
<template>
  <button @click="copyAndAnimate" class="appearance-none p-2 bg-transparent outline-0 cursor-pointer rounded-lg border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700">
    <div class="relative w-4 h-4">
      <Clippy
        class="icon [stroke-dashoffset:0] dark:stroke-gray-200"
        :class="{ 'clip-hide': copied }"
      />
      <Check
        class="icon [stroke-dashoffset:-50] dark:stroke-green-400"
        :class="{ 'check-show': copied }"
      />
    </div>
  </button>
</template>

<script setup>
    /*
     * Clipboard animation button
     * Original code by colebemis on CodeSandbox
     * https://codesandbox.io/p/sandbox/copy-to-clipboard-animation-qt8pf
     */
    import { ref, watch } from "vue";
    import { useClipboard } from "@vueuse/core";
    import Clippy from "./Clippy.vue";
    import Check from "./Check.vue";

    const props = defineProps({
        text: {
            type: String,
            required: true,
        },
        resetTime: {
            type: Number,
            default: 1200,
        }
    });

    // Use VueUse only for copying functionality
    const { copy } = useClipboard();

    const copied = ref(false);

    async function copyAndAnimate() {
        await copy(props.text);
        copied.value = true;
    }

    // Reset animation state after 1 second
    watch(copied, (val) => {
        if (val) setTimeout(() => (copied.value = false), props.resetTime);
    });
</script>

<style scoped>
    .icon {
        position: absolute;
        top: 0;
        left: 0;
        color: #57606a;
        width: 16px;
        height: 16px;
        stroke-dasharray: 50;
        transition: all 300ms ease-in-out;
    }

    .check-show {
        color: #2ea043;
        stroke-dashoffset: 0;
    }

    .clip-hide {
        stroke-dashoffset: -50;
    }

</style>
