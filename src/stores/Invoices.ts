import type { IInvoice } from '@/interfaces/IInvoice'
import { InvoiceServiceInstance } from '@/services/InvoicesService'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useInvoicesStore = defineStore('Invoices', () => {
  const invoices = ref([] as IInvoice[] | undefined)

  const getInvoices = async (): Promise<boolean> => {
    try {
      const response = await InvoiceServiceInstance.getInvoices()
      invoices.value = response
      return true
    } catch (error) {
      console.error(error)
      return false
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
    getInvoices,
    createInvoice
  }
})
