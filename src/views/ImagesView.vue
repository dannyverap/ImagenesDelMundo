<script lang="ts" setup>
import { useSellersStore } from '@/stores/Sellers'
import { onMounted } from 'vue'
import { ImageSearchServiceInstance } from '@/services/ImageService'
import { type Ref, ref } from 'vue'
import ImageCard from '@/components/ImageCard.vue'
import MainLayout from '@/layout/MainLayout.vue'
import SkeletonImageCard from '@/components/skeletons/SkeletonImageCard.vue'
import router from '@/router'
import { useToast } from 'vue-toastification'

const toast = useToast()

const sellerStore = useSellersStore()
const isLoading = ref(true)

const props = defineProps({
  query: String
})
let images: Ref = ref([])

onMounted(async () => {
  if (!props.query) {
    toast.warning("Search can't be empty")
    router.push({ name: 'home' })

    return
  }
  await sellerStore.getSellers()
  images.value = await ImageSearchServiceInstance.searchImages(
    props!.query,
    sellerStore.numberOfSellers
  )
  isLoading.value = false
})
</script>

<template>
  <MainLayout>
    <h1 class="text-2xl p-4 m-2 font-semibold text-textPrimary">
      Choose the best result for your search: {{ query }}
    </h1>
    <div class="container my-12 mx-auto px-4 md:px-12">
      <div class="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <template v-if="isLoading">
          <SkeletonImageCard v-for="n in 8" :key="n" />
        </template>
        <template v-else>
          <ImageCard
            v-for="(image, idx) in images"
            :key="idx"
            :image="image"
            :seller="sellerStore.sellers && sellerStore.sellers[idx]"
          ></ImageCard>
        </template>
      </div>
    </div>
  </MainLayout>
</template>
