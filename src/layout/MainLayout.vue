<script lang="ts" setup>
import NavBar from '@/components/NavBar.vue'
import FooterBar from '@/components/FooterBar.vue'
</script>
<template>
  <div class="flex flex-col h-screen">
    <NavBar class="sticky top-0 z-50" />
    <div class="flex-grow">
      <slot />
    </div>
    <FooterBar class="sticky bottom-0 z-50" />
  </div>
</template>
