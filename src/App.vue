<script setup lang="ts">
</script>
<template>
  <div class="w-full h-screen">
    <Transition name="fade">
      <RouterView />
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
