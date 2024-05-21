import axios, { type AxiosRequestConfig, type Method } from 'axios'
import type { IInvoice } from '@/interfaces/IInvoice'

class InvoiceService {
  private user: string
  private password: string
  private url: string

  constructor() {
    this.user = import.meta.env.APP_ALEGRA_USER
    this.password = import.meta.env.APP_ALEGRA_TOKEN
    this.url = import.meta.env.APP_ALEGRA_URL_INVOICES
  }

  private getAuthHeader(): string {
    return 'Basic ' + btoa(`${this.user}:${this.password}`)
  }

  private async processRequest<T>(method: Method, url: string, data?: any): Promise<T> {
    const options: AxiosRequestConfig = {
      method,
      url,
      headers: {
        accept: 'application/json',
        authorization: this.getAuthHeader()
      },
      data
    }
    try {
      const response = await axios.request<T>(options)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Request failed with status ${error.response?.status}: ${error.response?.data?.message}`
        )
      } else {
        throw new Error('An unexpected error occurred')
      }
    }
  }

  async generateInvoice({
    status,
    items,
    dueDate,
    date,
    seller,
    client
  }: IInvoice): Promise<IInvoice> {
    const invoiceData: IInvoice = {
      client,
      status,
      items,
      dueDate,
      date,
      seller
    }

    return this.processRequest('POST', `${this.url}`, invoiceData)
  }

  async getInvoices(): Promise<any[]> {
    return this.processRequest('GET', `${this.url}`)
  }

  async getInvoicePDF(id: number): Promise<IInvoice> {
    return this.processRequest('GET', `${this.url}/${id}?fields=pdf`)
  }
}

export const InvoiceServiceInstance = new InvoiceService()
