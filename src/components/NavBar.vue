<script lang="ts" setup>
import router from '@/router';
import { useAuthStore } from '@/stores/Auth';
import { ref, type Ref } from 'vue';
import { RouterLink } from 'vue-router';

const authStore = useAuthStore()

const tags = [
    { name: 'Home', routeName: 'home' },
    { name: 'Ranking', routeName: 'ranking' },
    { name: 'Reward Summary', routeName: 'rewardSummary' },
];

const handleLogout = () => {
    authStore.logout()
    router.push({ name: "home" });

}
const isNavVisible: Ref<boolean> = ref(false);

const toggle = () => {
    isNavVisible.value = !isNavVisible.value;
};
</script>

<template>
    <nav class="min-h-7vh bg-white text-textPrimary py-4 md:flex items-center justify-between px-6 shadow-md">
        <div class="flex items-center">
            <div class="logo text-2xl font-bold">
                <a href="https://www.alegra.com/" class="flex items-center space-x-3">
                    <img src="/src/assets/alegra.png" class="h-8" alt="Alegra Logo" />
                    <span class="self-center">Imagenes del mundo</span>
                </a>
            </div>
            <button @click="toggle" aria-label="Toggle menu"
                class="text-4xl absolute right-6 top-4 cursor-pointer md:hidden flex items-center justify-between">
                <i :class="[isNavVisible ? 'bi bi-x' : 'bi bi-list']"></i>
            </button>
            <ul class="hidden md:flex gap-5 ml-10">
                <li v-for="(tag, idx) in tags" :key="idx" class="text-xl hover:text-hoverPrimary duration-300">
                    <RouterLink :to="{ name: tag.routeName }" class="hover:text-primaryDark">{{ tag.name }}</RouterLink>
                </li>
            </ul>
        </div>
        <div v-if="authStore.isAuthenticated" class="flex items-center justify-end mt-2">
            <button @click="handleLogout"
                class="hover:text-primaryDark px-4 py-2 border border-primary rounded-lg mr-4">
                Logout </button>
        </div>
        <div v-else class="flex items-center mt-2">
            <RouterLink :to="{ name: 'login' }"
                class="hover:text-primaryDark px-4 py-2 border border-primary rounded-lg mr-4">
                Log In </RouterLink>
            <RouterLink :to="{ name: 'signup' }" class="hover:text-white bg-primary text-white px-4 py-2 rounded-lg">
                Begin for Free </RouterLink>
        </div>
        <ul :class="[isNavVisible ? 'left-0' : 'left-[-100%]']"
            class="md:hidden bg-white w-full absolute top-14 left-0 px-6 pb-10 duration-500">
            <li v-for="(tag, idx) in tags" :key="idx" class="my-6 text-xl hover:text-hoverPrimary duration-300">
                <RouterLink :to="{ name: tag.routeName }" class="hover:text-primaryDark">{{ tag.name }}</RouterLink>
            </li>

        </ul>
    </nav>
</template>
