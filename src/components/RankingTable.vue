<script setup lang="ts">
import { PointsServiceInstance } from '@/services/PointsService';
import { usePointsStore } from '@/stores/Points';
import { useSellersStore } from '@/stores/Sellers';
import { computed, ref, onMounted } from 'vue';

const pointsStore = usePointsStore();
const sellerStore = useSellersStore();

const hoveredSellerId = ref<number | null>(null);
const threshold = PointsServiceInstance.POINTS_THRESHOLD;

onMounted(() => {
  sellerStore.getSellers();
});

const calculateProgressPercentage = (value: number | undefined) => {
  if (value) {
    const ratio = value / threshold;
    return ratio >= 1 ? "100%" : `${ratio * 100}%`;
  }
  return "0%";
};

const sortedSellers = computed(() => {
  if (!sellerStore.sellers) return [];

  return sellerStore.sellers.slice().sort((a, b) => {
    const pointsA = a.id ? pointsStore.getPointsFromSellerID(a.id) ?? 0 : 0;
    const pointsB = b.id ? pointsStore.getPointsFromSellerID(b.id) ?? 0 : 0;

    return pointsB - pointsA;
  });
});

const getPoints = (sellerId: number | undefined): number => {
  if (sellerId) {
    return pointsStore.getPointsFromSellerID(sellerId) ?? 0;
  }
  return 0;
};

const isWinner = (sellerId: number | undefined): boolean => {
  return pointsStore.winner_id === sellerId;
};

const pointsToWin = (points: number): number => {
  return points >= threshold ? 0 : threshold - points;
};

const awardPrize = () => {
  if (pointsStore.winner_id !== null) {
    alert(`Prize awarded to seller with ID: ${pointsStore.winner_id}`);
    // Logic to award prize (e.g., API call)
  }
};

const resetRanking = () => {
  pointsStore.resetCompetition();
};
</script>
<template>
  <div class="bg-background shadow-md rounded-md overflow-hidden max-w-lg mx-auto mt-16">
    <div class="bg-lightGray py-2 px-4 flex justify-between items-center">
      <h2 class="text-xl font-semibold text-darkBlue">Top Sellers</h2>
      <button @click="resetRanking"
        class="bg-primary hover:bg-primaryDark text-white px-4 py-2 rounded-md transition duration-300">Reset
        Ranking</button>
    </div>
    <ul class="divide-y divide-gray-300 bg-white">
      <li v-for="(seller, idx) in sortedSellers" :key="idx" class="flex items-center py-4 px-6"
        @mouseenter="hoveredSellerId = seller.id ?? null" @mouseleave="hoveredSellerId = null">
        <span class="text-darkBlue text-lg font-medium mr-4">{{ idx + 1 }}</span>
        <img class="w-12 h-12 rounded-full object-cover mr-4"
          :src="'https://randomuser.me/api/portraits/women/' + seller.id + '.jpg'" alt="User avatar">
        <div class="flex-1">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-medium text-darkBlue">{{ seller.name }}</h3>
            <i v-if="isWinner(seller.id)" class="text-2xl text-primary bi bi-trophy-fill"> Winner!</i>
          </div>
          <div class="flex justify-between mb-1">
            <span class="text-base text-darkBlue">{{ getPoints(seller.id) }} points</span>
            <span class="text-sm font-medium text-primary">{{ calculateProgressPercentage(getPoints(seller.id))
              }}</span>
          </div>
          <div class="w-full bg-lightGray rounded-full h-2.5 relative">
            <div class="bg-primary h-2.5 rounded-full transition-width duration-300"
              :style="{ width: calculateProgressPercentage(getPoints(seller.id)) }"></div>
            <div v-if="hoveredSellerId === seller.id"
              class="absolute bg-background text-textPrimary inset-0 flex items-center justify-center text-sm bg-darkBlue bg-opacity-75 rounded-md p-1">
              <span>{{ pointsToWin(getPoints(seller.id)) }} points to win</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="bg-lightGray py-2 px-4 flex justify-center ">
      <button v-if="sortedSellers.length && isWinner(sortedSellers[0].id)" @click="awardPrize"
        class="bg-primary hover:bg-primaryDark text-white px-4 py-2 rounded-md transition duration-300">Award
        Prize</button>
    </div>
  </div>
</template>