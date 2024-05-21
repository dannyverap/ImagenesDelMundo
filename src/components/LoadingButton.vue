<script setup lang="ts">
import { defineProps, computed } from 'vue';
import SpiningAnimation from "@/components/SpiningAnimation.vue";

const props = defineProps<{
    isLoading: boolean;
    text: string;
    onClick: () => void;
    disabled?: boolean;
}>();

const isButtonDisabled = computed(() => props.isLoading || props.disabled);
</script>

<template>
    <button :disabled="isButtonDisabled" @click="props.onClick"
        class="w-full bg-primary text-white px-4 py-2 rounded-md transition duration-300 shadow-md flex items-center justify-center"
        :class="{ 'opacity-50 cursor-not-allowed': isButtonDisabled }">
        <span v-if="!props.isLoading">
            {{ props.text }}
        </span>
        <SpiningAnimation v-else></SpiningAnimation>
    </button>
</template>
