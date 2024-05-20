<script setup lang="ts">
import { ref } from 'vue';
import type { ImageItem } from '@/interfaces/IImage';
import type { ISeller } from '@/interfaces/ISeller';
import router from '@/router';
import { usePointsStore } from '@/stores/Points';
import ConfirmModal from '@/components/ConfirmModal.vue';
import { useToast } from 'vue-toastification';

const pointStore = usePointsStore();
const toast = useToast();

defineProps({
    image: Object as () => ImageItem,
    seller: Object as () => Partial<ISeller>
});

const showModal = ref(false);
const selectedSellerId = ref<number | null>(null);

const pickFavorite = (id: number) => {
    selectedSellerId.value = id;
    showModal.value = true;
};

const handleConfirm = async () => {
    if (selectedSellerId.value !== null) {
        await pointStore.addSellerPoint(selectedSellerId.value);
        toast.success("Thanks for your vote")
        router.push(`/`);
        showModal.value = false;
    }
};

const handleCancel = () => {
    showModal.value = false;
};

</script>
<template>
    <div
        class="transition duration-300 transform hover:-translate-y-1 max-w-md bg-background border border-gray-400 rounded-lg shadow-lg relative overflow-hidden flex flex-col">
        <img class="h-full w-full object-cover" :src="image && image.link" :alt="image?.title" />
        <div class="absolute bottom-0 left-0 right-0 p-3 flex flex-col">
            <div class="flex justify-end mt-auto">
                <button @click="seller?.id !== undefined && pickFavorite(seller.id)"
                    class="inline-flex items-center px-3 py-2 text-xs font-semibold text-center text-textSecondary bg-primaryDark rounded-lg transition duration-300 transform hover:scale-105 hover:bg-hoverPrimary hover:text-primaryDark"
                    title="Mark as Favorite">
                    <i class="bi bi-star-fill"></i>
                </button>
            </div>
            <p class="bg-gray-700 mt-1 bg-opacity-50 rounded-lg text-sm font-semibold text-textSecondary p-1">by: {{
                seller?.name }}</p>
        </div>
    </div>

    <ConfirmModal v-if="showModal" title="Confirm Favorite"
        message="Are you sure you want to vote for this image as your favorite?" :isVisible="showModal"
        @confirm="handleConfirm" @cancel="handleCancel" />
</template>
