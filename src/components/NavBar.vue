<script lang="ts" setup>
import { ref, type Ref } from 'vue';
import { RouterLink } from 'vue-router';

const tags = [
    { name: 'Home', routeName: 'home' },
    { name: 'Ranking', routeName: 'ranking' },
    { name: 'Reward Summary', routeName: 'rewardSummary' },
];

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
                    <img src="/src/assets/alegra.png" class="h-8"
                        alt="Alegra Logo" />
                    <span class="self-center">Imagenes del mundo</span>
                </a>
            </div>
            <button @click="toggle" aria-label="Toggle menu"
                class="text-4xl absolute right-6 top-4 cursor-pointer md:hidden flex items-center justify-between">
                <i :class="[isNavVisible ? 'bi bi-x' : 'bi bi-list']" ></i>
            </button>
            <ul class="hidden md:flex gap-5 ml-10">
                <li v-for="(tag, idx) in tags" :key="idx" class="text-xl hover:text-hoverPrimary duration-300">
                    <RouterLink :to="{ name: tag.routeName }" class="hover:text-primaryDark">{{ tag.name }}</RouterLink>
                </li>
            </ul>
        </div>
        <div class="flex items-center mt-2">
            <a href="#" class="hover:text-primaryDark px-4 py-2 border border-primary rounded-lg mr-4">
                INGRESAR
            </a>
            <a href="#" class="hover:text-white bg-primary text-white px-4 py-2 rounded-lg">
                EMPIEZA GRATIS
            </a>

        </div>
        <ul :class="[isNavVisible ? 'left-0' : 'left-[-100%]']"
            class="md:hidden bg-white w-full absolute top-14 left-0 px-6 pb-10 duration-500">
            <li v-for="(tag, idx) in tags" :key="idx" class="my-6 text-xl hover:text-hoverPrimary duration-300">
                <RouterLink :to="{ name: tag.routeName }" class="hover:text-primaryDark">{{ tag.name }}</RouterLink>
            </li>

        </ul>
    </nav>
</template>

