<script setup lang="ts">
import type { ImageItem } from '@/interfaces/IImage';
import type { ISeller } from '@/interfaces/ISeller';

defineProps({
    image: Object as () => ImageItem,
    seller: Object as () => Partial<ISeller>
});

const pickFavorite = (id: string) => {
    const confirmation = window.confirm('Are you sure you want to vote for this image as your favorite?');
    if (confirmation) {
        console.log("favorite seller id:", id)
    }
}

</script>
<template>
    <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
            <img class="rounded-t-lg" :src="image && image.link" alt="" />
        </a>
        <div class="p-5">
            <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ image?.title }}</h5>
            </a>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Seller: {{ seller?.name }}</p>
            <a @click="seller?.id !== undefined && pickFavorite(seller.id)"
                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Vote as favorite
                <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
            </a>
        </div>
    </div>

</template>