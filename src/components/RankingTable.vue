<script setup lang="ts">
import { usePointsStore } from '@/stores/Points';
import { useSellerStore } from '@/stores/Seller';
import { computed, onMounted } from 'vue';

const pointsStore = usePointsStore()
const sellerStore = useSellerStore()

onMounted(() => {
    sellerStore.getSellers()
})

const sortedSellers = computed(() => {
    if (!sellerStore.sellers) return [];

    return sellerStore.sellers.slice().sort((a, b) => {
        const pointsA = a.id && pointsStore.getPointsFromSellerID(a.id);
        const pointsB = b.id && pointsStore.getPointsFromSellerID(b.id);

        if (typeof pointsA !== 'undefined' && typeof pointsB !== 'undefined') {
            return pointsB - pointsA;
        }
        return 0;
    });
});
</script>

<template>
    <div class="bg-white shadow-md rounded-md overflow-hidden max-w-lg mx-auto mt-16">
        <div class="bg-gray-100 py-2 px-4">
            <h2 class="text-xl font-semibold text-gray-800">Top Sellers</h2>
        </div>
        <ul class="divide-y divide-gray-200">
            <li v-for="(seller, idx) in sortedSellers" :key="idx" class="flex items-center py-4 px-6">
                <span class="text-gray-700 text-lg font-medium mr-4">{{ idx + 1 }}</span>
                <img class="w-12 h-12 rounded-full object-cover mr-4"
                    :src="'https://randomuser.me/api/portraits/women/' + (idx + 12) + '.jpg'" alt="User avatar">
                <div class="flex-1">
                    <div class="flex items-center justify-between ">
                        <h3 class="text-lg font-medium text-gray-800">{{ seller.name }}</h3>
                        <i v-if="pointsStore.winner_id == seller.id" style="font-size: 1.5rem; color: gold;"
                            class="bi bi-trophy-fill">Winner!</i>
                    </div>
                    <p class="text-gray-600 text-base">{{ seller.id && pointsStore.getPointsFromSellerID(seller.id) }}
                        points</p>

                </div>
            </li>
        </ul>
    </div>
</template>
