<script lang="ts" setup>
import { ref, onMounted, type Ref } from 'vue'
import { useRouter } from 'vue-router'

let searchQuery: Ref<string> = ref('')
const router = useRouter()

const phrases = ['Beautiful landscapes', 'Trips', 'Machu picchu', 'Alegra']
let phraseIndex: Ref<number> = ref(0)
let charIndex: Ref<number> = ref(0)
let currentPhrase: Ref<string> = ref('')

const typePhrase = () => {
  if (charIndex.value < phrases[phraseIndex.value].length) {
    currentPhrase.value += phrases[phraseIndex.value][charIndex.value]
    charIndex.value++
    setTimeout(typePhrase, 100)
  } else {
    setTimeout(erasePhrase, 1000)
  }
}

const erasePhrase = () => {
  if (charIndex.value > 0) {
    currentPhrase.value = currentPhrase.value.slice(0, -1)
    charIndex.value--
    setTimeout(erasePhrase, 50)
  } else {
    phraseIndex.value = (phraseIndex.value + 1) % phrases.length
    setTimeout(typePhrase, 500)
  }
}

onMounted(() => {
  typePhrase()
})

const searchImages = () => {
  if (searchQuery.value.trim() !== '') {
    router.push(`/search/${searchQuery.value}`)
  }
}
</script>

<template>
  <div
    class="min-h-[calc(100vh-12vh)] flex items-center justify-center bg-[rgba(255, 255, 255, 0.8)]"
  >
    <div
      class="bg-[#A5DFD3] bg-opacity-90 p-8 rounded-lg shadow-lg text-center w-11/12 md:w-3/4 lg:max-w-2xl"
    >
      <h1 class="text-3xl md:text-4xl font-bold text-[#2E3A46] mb-6">
        Discover the image you Love!
      </h1>
      <form @submit.prevent="searchImages" class="relative z-30 text-base text-[#2E3A46]">
        <input
          required
          v-model="searchQuery"
          :placeholder="currentPhrase"
          type="text"
          class="mt-2 shadow-md focus:outline-none rounded-2xl py-3 px-6 block w-full text-[#2E3A46] transition duration-300 ease-in-out transform hover:scale-105"
        />
        <button
          type="submit"
          class="mt-4 bg-[#09a79d] text-white font-semibold py-3 px-6 rounded-2xl shadow-md hover:bg-[#0d4957] focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
        >
          Search
        </button>
      </form>
    </div>
  </div>
</template>
