<script lang="ts" setup>
import { useSellersStore } from '@/stores/Sellers';
import { onMounted } from 'vue';
import { ImageSearchServiceInstance } from '@/services/ImageService';
import { type Ref, ref } from 'vue';
import ImageCard from '@/components/ImageCard.vue'
import MainLayout from '@/layout/MainLayout.vue';
import SkeletonImageCard from '@/components/skeletons/SkeletonImageCard.vue';
// import { PointsServiceInstance } from '@/services/FireBaseService'
const sellerStore = useSellersStore()
const isLoading = ref(true);

const props = defineProps({
    query: String,
});
let results: Ref = ref([])

onMounted(async () => {
    // const hola = await PointsServiceInstance.getPoints()
    // console.log(hola);

    if (!props.query) {
        console.error('La consulta no puede estar vacía');
        return;
    }
    await sellerStore.getSellers()
    console.log(props.query)
    setTimeout(() => {
        isLoading.value = false;
    }, 2000)
    //results.value = await ImageSearchServiceInstance.searchImages(props!.query, sellerStore.numberOfSellers)
})
const items = [
    {
        "kind": "customsearch#result",
        "title": "El perro: 9788423681563: DORLING KINDERSLEY ... - Amazon.com",
        "htmlTitle": "El perro: 9788423681563: DORLING KINDERSLEY ... - Amazon.com",
        "link": "https://m.media-amazon.com/images/I/71q6GwXwAHL._AC_UF1000,1000_QL80_.jpg",
        "displayLink": "www.amazon.com",
        "snippet": "71q6GwXwAHL._AC_UF1000, ...",
        "htmlSnippet": "71q6GwXwAHL._AC_UF1000, ...",
        "mime": "image/jpeg",
        "fileFormat": "image/jpeg",
        "image": {
            "contextLink": "https://www.amazon.com/El-perro-Varios/dp/8423681564",
            "height": 1000,
            "width": 794,
            "byteSize": 67256,
            "thumbnailLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpz7Q7TVl5BE57JDDdLJvvwWdZJZR5eTAt1ib3IzoJ4wbJsAnINKC8ytE&s",
            "thumbnailHeight": 149,
            "thumbnailWidth": 118
        }
    },
    {
        "kind": "customsearch#result",
        "title": "Perro Salado",
        "htmlTitle": "<b>Perro</b> Salado",
        "link": "https://images.squarespace-cdn.com/content/v1/595241f4bebafb07c9d72b38/1692911969178-1N4V2T5WHEJNA1VBT28R/Perro.Salado_LJM_051_copy1.jpg",
        "displayLink": "www.perrosalado.com",
        "snippet": "Perro.Salado_LJM_051_copy1.jpg",
        "htmlSnippet": "<b>Perro</b>.Salado_LJM_051_copy1.jpg",
        "mime": "image/jpeg",
        "fileFormat": "image/jpeg",
        "image": {
            "contextLink": "https://www.perrosalado.com/",
            "height": 1667,
            "width": 2500,
            "byteSize": 998388,
            "thumbnailLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAZSARkOnnJ8hBiyqwyeq8x3B43ZSM9zEN0b0wYnLRXf-TBsogTeYP6gU&s",
            "thumbnailHeight": 100,
            "thumbnailWidth": 150
        }
    },
    {
        "kind": "customsearch#result",
        "title": "The 8 main dog sounds | Affinity Foundation",
        "htmlTitle": "The 8 main dog sounds | Affinity Foundation",
        "link": "https://static.fundacion-affinity.org/cdn/farfuture/PVbbIC-0M9y4fPbbCsdvAD8bcjjtbFc0NSP3lRwlWcE/mtime:1643275542/sites/default/files/los-10-sonidos-principales-del-perro.jpg",
        "displayLink": "www.fundacion-affinity.org",
        "snippet": "The 8 main dog sounds | Affinity Foundation",
        "htmlSnippet": "The 8 main dog sounds | Affinity Foundation",
        "mime": "image/jpeg",
        "fileFormat": "image/jpeg",
        "image": {
            "contextLink": "https://www.fundacion-affinity.org/en/dogs-cats-and-people/i-have-pet/8-main-dog-sounds",
            "height": 867,
            "width": 1300,
            "byteSize": 87282,
            "thumbnailLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSAnFGQrdYUSr0eW2E4yA4fjGFMxqggwEiFUx-sqnD1__FXyAmUJL_sA&s",
            "thumbnailHeight": 100,
            "thumbnailWidth": 150
        }
    },
    {
        "kind": "customsearch#result",
        "title": "Wall Art Print | Perro tecnica splash | Europosters",
        "htmlTitle": "Wall Art Print | <b>Perro</b> tecnica splash | Europosters",
        "link": "https://storage.googleapis.com/pod_public/1300/153633.jpg",
        "displayLink": "www.europosters.eu",
        "snippet": "Wall Art Print | Perro tecnica splash | Europosters",
        "htmlSnippet": "Wall Art Print | <b>Perro</b> tecnica splash | Europosters",
        "mime": "image/jpeg",
        "fileFormat": "image/jpeg",
        "image": {
            "contextLink": "https://www.europosters.eu/marketplace/perro-tecnica-splash-v111573",
            "height": 1300,
            "width": 1300,
            "byteSize": 362104,
            "thumbnailLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlEnSsgJd-yLzwpCDU1Y0TTo5epgg71nuUpZXDDp5NSuxM3Hdae4Bt5hA&s",
            "thumbnailHeight": 150,
            "thumbnailWidth": 150
        }
    },
    {
        "kind": "customsearch#result",
        "title": "El Perro (Me Encanta Mi Mascota) (Spanish Edition): Carr, Aaron ...",
        "htmlTitle": "El <b>Perro</b> (Me Encanta Mi Mascota) (Spanish Edition): Carr, Aaron ...",
        "link": "https://m.media-amazon.com/images/I/619utTw7tcL._AC_UF1000,1000_QL80_.jpg",
        "displayLink": "www.amazon.com",
        "snippet": "El Perro (Me Encanta Mi Mascota) (Spanish Edition): Carr, Aaron ...",
        "htmlSnippet": "El <b>Perro</b> (Me Encanta Mi Mascota) (Spanish Edition): Carr, Aaron ...",
        "mime": "image/jpeg",
        "fileFormat": "image/jpeg",
        "image": {
            "contextLink": "https://www.amazon.com/perro-Dog-Encanta-Mascota-Spanish/dp/161913182X",
            "height": 897,
            "width": 1000,
            "byteSize": 104880,
            "thumbnailLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQluUkmJzGjp070oarbyswOmjowy0_DBcrsA3RcIzCsMRUas59K13MhfhY&s",
            "thumbnailHeight": 134,
            "thumbnailWidth": 149
        }
    }
]
</script>
<template>
    <MainLayout>
        <h1 class="text-2xl p-4 m-2 font-semibold text-textPrimary">Choose the best result for your search: {{ query }}
        </h1>
        <div class="container my-12 mx-auto px-4 md:px-12">
            <div class="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <template v-if="isLoading">
                    <SkeletonImageCard v-for="n in 8" :key="n" />
                </template>
                <template v-else>
                    <ImageCard v-for="(item, idx) in items" :key="idx" :image="item"
                        :seller="sellerStore.sellers && sellerStore.sellers[idx]"></ImageCard>
                </template>
            </div>
        </div>
    </MainLayout>
</template>
