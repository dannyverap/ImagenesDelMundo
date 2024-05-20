<script setup lang="ts">
import { computed, toRefs } from 'vue';

const props = defineProps({
    title: String,
    message: String,
    isVisible: Boolean,
    type: {
        type: String,
        default: 'default', // default, danger, etc.
    },
});

const { type } = toRefs(props);

const titleClass = computed(() => {
    return type.value === 'danger' ? 'text-red-600' : 'text-darkBlue';
});

const confirmClass = computed(() => {
    return type.value === 'danger' ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-primary hover:bg-primaryDark text-white';
});
</script>

<template>
    <transition name="modal">
        <div class="fixed inset-0 flex items-center justify-center z-50" v-if="isVisible">
            <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
                <h3 :class="['text-lg font-semibold mb-4', titleClass]"> {{ title }}</h3>
                <p class="text-gray-700 mb-6">{{ message }}</p>
                <div class="flex justify-end space-x-4">
                    <button @click="$emit('cancel')"
                        class="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md transition duration-300">
                        Cancel
                    </button>
                    <button @click="$emit('confirm')"
                        :class="[confirmClass, 'px-4 py-2 rounded-md transition duration-300']">
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    </transition>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.5s;
}

.modal-enter,
.modal-leave-to {
    opacity: 0;
}
</style>
