import { defineStore } from 'pinia'
import { SellerServiceInstance } from '@/services/SellerService'
import type { ISeller } from '@/interfaces/ISeller'

export const useSellerStore = defineStore('seller', {
  state: () => {
    return {
      sellers: [] as ISeller[] | undefined,
      sellerDetail: {} as ISeller | undefined
    }
  },
  getters: {
    numberOfSeller(): number {
      if (!this.sellers) {
        return 0
      }
      return this.sellers.length
    }
  },
  actions: {
    async getSellers(): Promise<boolean> {
      try {
        const response = await SellerServiceInstance.getSellers()
        this.sellers = response
        return true
      } catch (error) {
        console.error(error)
        return false
      }
    },
    async getSeller(id: number): Promise<boolean> {
      try {
        const response = await SellerServiceInstance.getSeller(id)
        this.sellerDetail = response
        return true
      } catch (error) {
        return false
      }
    },
    async createSeller(data: Partial<ISeller>): Promise<boolean> {
      try {
        await SellerServiceInstance.createSeller(data)
        return true
      } catch (error) {
        console.error(error)
        return false
      }
    },
    async editSeller(id: number, data: Partial<ISeller>): Promise<boolean> {
      try {
        await SellerServiceInstance.editSeller(id, data)
        return true
      } catch (error) {
        console.error(error)
        return false
      }
    },
    async deleteSeller(id: number): Promise<boolean> {
      try {
        await SellerServiceInstance.deleteSeller(id)
        return true
      } catch (error) {
        console.error(error)
        return false
      }
    }
  }
})
