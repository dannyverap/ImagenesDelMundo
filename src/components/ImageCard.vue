<script setup lang="ts">
import type { ImageItem } from '@/interfaces/IImage';
import type { ISeller } from '@/interfaces/ISeller';
import router from '@/router';
import { usePointsStore } from '@/stores/Points';

const pointStore = usePointsStore();

defineProps({
    image: Object as () => ImageItem,
    seller: Object as () => Partial<ISeller>
});

const pickFavorite = async (id: number) => {
    const confirmation = window.confirm('Are you sure you want to vote for this image as your favorite?');
    if (confirmation) {
        await pointStore.addSellerPoint(id)
        router.push(`/`);
    }
}

</script>
<template>
    <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
        <img class="rounded-t-lg h-40 sm:h-48 w-full object-cover" :src="image && image.link" :alt="image?.title" />
        <div class="p-5">
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">by: {{ seller?.name }}</p>
            <div class="flex justify-end">
                <button @click="seller?.id !== undefined && pickFavorite(seller.id)"
                    class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Vote as favorite
                </button>
            </div>
        </div>
    </div>

</template>