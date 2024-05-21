<script setup lang="ts"></script>

<template>
  <div
    class="transition duration-300 transform hover:-translate-y-1 max-w-md bg-background border border-gray-100 rounded-lg shadow-lg relative overflow-hidden flex flex-col animate-pulse"
  >
    <div class="h-64 bg-gray-200"></div>
    <div class="absolute bottom-0 left-0 right-0 p-3 flex flex-col">
      <div class="flex justify-end mt-auto">
        <div class="inline-flex items-center px-3 py-2 bg-gray-300 rounded-lg"></div>
      </div>
      <div class="bg-gray-300 mt-1 rounded-lg text-sm font-semibold p-1 h-6 w-3/4"></div>
    </div>
  </div>
</template>
<style scoped></style>
