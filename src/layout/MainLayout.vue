<script lang="ts" setup>
import NavBar from "@/components/NavBar.vue"

</script>
<template>
    <div class="flex">
        <div class="w-full h-screen">
            <NavBar />
            <slot />
        </div>
    </div>

</template>
