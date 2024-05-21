<!-- SkeletonSellerList.vue -->
<template>
  <ul class="divide-y divide-gray-300 bg-white">
    <li v-for="n in 5" :key="n" class="flex items-center py-4 px-6 animate-pulse">
      <span class="text-darkBlue text-lg font-medium mr-4 bg-gray-200 rounded h-6 w-6"></span>
      <div class="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
      <div class="flex-1">
        <div class="flex items-center justify-between mb-2">
          <div class="h-4 bg-gray-200 rounded w-1/3"></div>
          <div class="h-4 bg-gray-200 rounded w-10"></div>
        </div>
        <div class="flex justify-between mb-1">
          <div class="h-4 bg-gray-200 rounded w-1/4"></div>
          <div class="h-4 bg-gray-200 rounded w-10"></div>
        </div>
        <div class="w-full bg-lightGray rounded-full h-2.5 relative">
          <div class="bg-gray-200 h-2.5 rounded-full w-1/2"></div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts"></script>

<style scoped></style>
