import { defineStore } from 'pinia'
import { SellerServiceInstance } from '@/services/SellerService'
import type { ISeller } from '@/interfaces/ISeller'
import { ref, computed } from 'vue'

export const useSellerStore = defineStore('sellers', () => {
  const sellers = ref([] as ISeller[] | undefined)
  const sellerDetail = ref({} as ISeller | undefined)

  const numberOfSeller = computed(() => {
    if (!sellers.value) {
      return 0
    }
    return sellers.value.length
  })

  const getSellers = async (): Promise<boolean> => {
    try {
      const response = await SellerServiceInstance.getSellers()
      sellers.value = response
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  const getSeller = async (id: number): Promise<boolean> => {
    try {
      const response = await SellerServiceInstance.getSeller(id)
      sellerDetail.value = response
      return true
    } catch (error) {
      return false
    }
  }

  const createSeller = async (data: Partial<ISeller>): Promise<boolean> => {
    try {
      await SellerServiceInstance.createSeller(data)
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  const editSeller = async (id: number, data: Partial<ISeller>): Promise<boolean> => {
    try {
      await SellerServiceInstance.editSeller(id, data)
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  const deleteSeller = async (id: number): Promise<boolean> => {
    try {
      await SellerServiceInstance.deleteSeller(id)
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  return {
    sellers,
    sellerDetail,
    numberOfSeller,
    getSellers,
    getSeller,
    createSeller,
    editSeller,
    deleteSeller
  }
})
