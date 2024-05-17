<script lang="ts" setup>
import { ref, type Ref } from 'vue';
import { RouterLink } from 'vue-router';

const tags = [
    { name: 'Home', routeName: 'home' },
    { name: 'Ranking', routeName: 'ranking' },
    { name: 'Sellers', routeName: 'sellers' },
    { name: 'Billing', routeName: 'billing' },
];

const isNavVisible: Ref<boolean> = ref(false);

const toggle = () => {
    isNavVisible.value = !isNavVisible.value;
};
</script>

<template>
    <nav class="bg-gray-900 text-white py-4 md:flex items-center justify-between px-6">
        <div class="logo text-2xl font-bold text-white">
            <a href="https://www.alegra.com/" class="flex items-center space-x-3">
                <img src="https://www.appdegestion.com/app/54_alegra/logo/54_alegra.png" class="h-8"
                    alt="Imagenes del mundo Logo" />
                <span class="self-center">ImagenesDelMundo</span>
            </a>
        </div>
        <button @click="toggle" aria-label="Toggle menu"
            class="text-4xl absolute right-6 top-3 cursor-pointer md:hidden">
            <i :class="[isNavVisible ? 'bi bi-x' : 'bi bi-list']"></i>
        </button>
        <ul :class="[isNavVisible ? 'left-0' : 'left-[-100%]']"
            class="md:flex gap-5 md:static absolute bg-gray-900 w-full md:w-auto top-14 px-6 md:px-0 pb-10 md:pb-0 duration-500">
            <li v-for="(tag, idx) in tags" :key="idx" class="my-6 mx-3 md:my-0 text-xl hover:text-green-400 duration-500">
                <RouterLink :to="{ name: tag.routeName }">
                    {{ tag.name }}
                </RouterLink>
            </li>
            <!-- <li class="my-6 md:my-0 text-xl hover:text-green-400 duration-500">
                Login / Logout
            </li> -->
        </ul>
    </nav>
</template>
