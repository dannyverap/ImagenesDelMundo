<script setup lang="ts">
import { ref } from 'vue'
import ConfirmModal from '@/components/UI/ConfirmModal.vue'
import { PointsServiceInstance } from '@/services/PointsService'
import { usePointsStore } from '@/stores/Points'
import { useSellersStore } from '@/stores/Sellers'
import { computed, onMounted } from 'vue'
import SkeletonCompetitionTable from './skeletons/SkeletonCompetitionTable.vue'
import { useInvoicesStore } from '@/stores/Invoices'
import type { IInvoice } from '@/interfaces/IInvoice'
import { InvoiceCreatorInstance } from '@/utils/CreateInvoiceHelper'
import { useToast } from 'vue-toastification'
import LoadingButton from '@/components/UI/LoadingButton.vue'

const pointsStore = usePointsStore()
const sellerStore = useSellersStore()
const invoices = useInvoicesStore()

const isLoading = ref(true)
const buttonClicked = ref(false)
const hoveredSellerId = ref<number | null>(null)
const threshold = PointsServiceInstance.POINTS_THRESHOLD
const isAwardingPrize = ref(false)
const showModal = ref(false)
const showResetModal = ref(false)
const toast = useToast()

onMounted(async () => {
  await sellerStore.getSellers()
  isLoading.value = false
})

const calculateProgressPercentage = (value: number | undefined) => {
  if (value) {
    const ratio = value / threshold
    return ratio >= 1 ? '100%' : `${ratio * 100}%`
  }
  return '0%'
}

const sortedSellers = computed(() => {
  if (!sellerStore.sellers) return []

  return sellerStore.sellers.slice().sort((a, b) => {
    const pointsA = a.id ? pointsStore.getPointsFromSellerID(a.id) ?? 0 : 0
    const pointsB = b.id ? pointsStore.getPointsFromSellerID(b.id) ?? 0 : 0

    return pointsB - pointsA
  })
})

const getPoints = (sellerId: number | undefined): number => {
  if (sellerId) {
    return pointsStore.getPointsFromSellerID(sellerId) ?? 0
  }
  return 0
}

const isWinner = (sellerId: number | undefined): boolean => {
  return pointsStore.winner_id === sellerId
}

const pointsToWin = (points: number): number => {
  return points >= threshold ? 0 : threshold - points
}

const awardPrize = () => {
  showModal.value = true
}

const handleConfirm = async () => {
  isAwardingPrize.value = true
  showModal.value = false
  await generateInvoice()
  isAwardingPrize.value = false
}

const handleCancel = () => {
  showModal.value = false
  toast.info('Award prize canceled')
}

const getDefauldata = () => {
  if (pointsStore.winner_id) {
    return InvoiceCreatorInstance.createDefaultInvoice(
      pointsStore.winner_id,
      pointsStore.totalPoints
    )
  }
  return undefined
}

const generateInvoice = async () => {
  try {
    if (pointsStore.winner_id && !pointsStore.prize_awarded) {
      let invoiceData: IInvoice = getDefauldata()!
      const success = await invoices.createInvoice(invoiceData)
      if (success) {
        pointsStore.setPrizeAwarded(pointsStore.winner_id)
        toast.success('Invoice successfully created')
      } else {
        toast.error('Error creating the invoice')
      }
    }
  } catch (error) {
    toast.error('An unexpected error occurred')
  }
}

const confirmResetCompetition = () => {
  showResetModal.value = true
}

const handleResetConfirm = () => {
  buttonClicked.value = true
  pointsStore.resetCompetition()
  buttonClicked.value = false
  showResetModal.value = false
  toast.success('Competition has been reset')
}

const handleResetCancel = () => {
  showResetModal.value = false
  toast.info('Reset competition canceled')
}
</script>

<template>
  <div class="bg-background shadow-md rounded-md overflow-hidden max-w-lg mx-auto mt-16">
    <div class="bg-lightGray py-2 px-4 flex justify-between items-center">
      <h2 class="text-xl font-semibold text-darkBlue">Competitors</h2>
      <div class="p-2">
        <LoadingButton
          :isLoading="buttonClicked"
          text="Resest Competition"
          @click="confirmResetCompetition"
        />
      </div>
    </div>

    <TransitionGroup class="divide-y divide-gray-300 bg-white" name="list" tag="ul">
      <template v-if="isLoading">
        <SkeletonCompetitionTable />
      </template>
      <template v-else>
        <li
          v-for="(seller, idx) in sortedSellers"
          :key="seller.id"
          class="flex items-center py-4 px-6"
          @mouseenter="hoveredSellerId = seller.id ?? null"
          @mouseleave="hoveredSellerId = null"
        >
          <span class="text-darkBlue text-lg font-medium mr-4">{{ idx + 1 }}</span>
          <img
            class="w-12 h-12 rounded-full object-cover mr-4"
            :src="'https://randomuser.me/api/portraits/women/' + seller.id + '.jpg'"
            alt="User avatar"
          />
          <div class="flex-1">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-medium text-darkBlue">{{ seller.name }}</h3>
              <i v-if="isWinner(seller.id)" class="text-2xl text-primary bi bi-trophy-fill">
                Winner!</i
              >
            </div>
            <div class="flex justify-between mb-1">
              <span class="text-base text-darkBlue">{{ getPoints(seller.id) }} points</span>
              <span class="text-sm font-medium text-primary">{{
                calculateProgressPercentage(getPoints(seller.id))
              }}</span>
            </div>
            <div class="w-full bg-lightGray rounded-full h-2.5 relative">
              <div
                class="bg-primary h-2.5 rounded-full transition-width duration-300"
                :style="{ width: calculateProgressPercentage(getPoints(seller.id)) }"
              ></div>
              <div
                v-if="hoveredSellerId === seller.id"
                class="absolute bg-background text-textPrimary inset-0 flex items-center justify-center text-sm bg-darkBlue bg-opacity-75 rounded-md p-1"
              >
                <span>{{ pointsToWin(getPoints(seller.id)) }} points to win</span>
              </div>
            </div>
          </div>
        </li>
      </template>
    </TransitionGroup>

    <div class="bg-lightGray py-2 px-4 flex justify-center">
      <div v-if="!pointsStore.winner_id" class="text-center text-darkBlue font-semibold">
        No Winner Yet
      </div>
      <div v-else-if="!pointsStore.prize_awarded">
        <LoadingButton :isLoading="isAwardingPrize" text="Award Prize" @click="awardPrize" />
      </div>

      <div v-else class="text-center text-primary font-semibold">Prize Awarded</div>
    </div>
  </div>

  <ConfirmModal
    v-if="showModal"
    title="Confirm Award"
    message="Are you sure you want to award this prize?"
    :isVisible="showModal"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  />

  <ConfirmModal
    v-if="showResetModal"
    title="Confirm Reset"
    message="Are you sure you want to reset the competition?"
    :isVisible="showResetModal"
    type="danger"
    @confirm="handleResetConfirm"
    @cancel="handleResetCancel"
  />
</template>

<style>
.list-enter-active,
.list-leave-active,
.list-move {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-leave-active {
  position: absolute;
}
</style>
