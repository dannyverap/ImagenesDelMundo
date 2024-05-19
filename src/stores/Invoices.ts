import type { IInvoice } from '@/interfaces/IInvoice'
import { InvoiceServiceInstance } from '@/services/InvoicesService'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useInvoicesStore = defineStore('Invoices', () => {
  const invoices = ref([] as IInvoice[] | undefined)
  const totalPriceGiven = ref(0)

  const getInvoices = async (): Promise<boolean> => {
    try {
      const response = (await InvoiceServiceInstance.getInvoices()) as IInvoice[]
      invoices.value = filterInvoicesWithSellers(response)
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  const calculateTotalPrice = () => {
    if (invoices.value) {
      totalPriceGiven.value = invoices.value?.reduce(
        (acc, invoice) => acc + (invoice.total || 0),
        0
      )
    }
  }

  const filterInvoicesWithSellers = (invoices: IInvoice[]) => {
    return invoices.filter((invoice) => invoice.seller !== null)
  }

  const getInvoicesBySellerId = (sellerId: number) => {
    if (invoices.value) {
      return invoices.value.find((invoice) => invoice.seller.id == sellerId)
    }
  }
  const createInvoice = async (data: IInvoice): Promise<boolean> => {
    try {
      await InvoiceServiceInstance.generateInvoice(data)
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  return {
    invoices,
    totalPriceGiven,
    getInvoices,
    createInvoice,
    getInvoicesBySellerId,
    calculateTotalPrice
  }
})
