<script lang="ts" setup>
import { type Ref, ref } from 'vue';
import { useRouter } from 'vue-router';

let searchQuery: Ref<string> = ref("");

const router = useRouter();

const searchImages = () => {
    if (searchQuery.value.trim() !== "") {
        router.push(`/search/${searchQuery.value}`);
    }
};
</script>

<template>
    <form onsubmit="event.preventDefault()"
        style="background:linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1684487747385-442d674962f2) no-repeat center;background-size:cover"
        class="py-80 px-1 md:px-8 text-center relative text-white font-bold text-2xl md:text-3xl overflow-auto">
        <h1 class="pb-8">Search the image you want!</h1>
        <div class="w-11/12 md:w-3/4 lg:max-w-3xl m-auto">
            <div class="relative z-30 text-base text-black">
                <input required v-model="searchQuery" type="text" placeholder="..." @keyup.enter="searchImages"
                    class="mt-2 shadow-md focus:outline-none rounded-2xl py-3 px-6 block w-full" />
            </div>
        </div>
    </form>
</template>
