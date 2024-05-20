<script setup lang="ts">
</script>
<template>
    <tr v-for="n in 5" :key="n" class="animate-pulse">
        <td class="px-6 py-4 whitespace-nowrap">
            <div class="h-4 bg-gray-200 rounded"></div>
        </td>
        <td class="px-6 py-4">
            <div class="h-4 bg-gray-200 rounded"></div>
        </td>
        <td class="px-6 py-4">
            <div class="h-4 bg-gray-200 rounded"></div>
        </td>
        <td class="px-6 py-4">
            <div class="h-4 bg-gray-200 rounded"></div>
        </td>
        <td class="px-6 py-4">
            <div class="h-4 bg-gray-200 rounded"></div>
        </td>
    </tr>
</template>
<style scoped></style>