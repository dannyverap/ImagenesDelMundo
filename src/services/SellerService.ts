import type { ISeller } from '@/interfaces/ISeller'
import axios, { type AxiosRequestConfig, type Method } from 'axios'

class SellerService {
  private user: string
  private password: string
  private url: string

  constructor() {
    this.user = import.meta.env.APP_ALEGRA_USER
    this.password = import.meta.env.APP_ALEGRA_TOKEN
    this.url = import.meta.env.APP_ALEGRA_URL
  }

  private getAuthHeader(): string {
    return 'Basic ' + btoa(`${this.user}:${this.password}`)
  }

  private async processRequest<T>(method: Method, url: string, data?: any) {
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

  async createSeller(newSeller: Partial<ISeller>): Promise<ISeller> {
    if (!newSeller.name) {
      throw new Error('Name is required to create a seller.')
    }
    return this.processRequest('POST', `${this.url}`, newSeller)
  }
  async getSeller(id: number): Promise<ISeller> {
    return this.processRequest('GET', `${this.url}/${id}`)
  }
  async getSellers(): Promise<ISeller[]> {
    return this.processRequest('GET', `${this.url}/`)
  }
  async deleteSeller(id: number): Promise<void> {
    return this.processRequest('DELETE', `${this.url}/${id}`)
  }
  async editSeller(id: number, updateSeller: Partial<ISeller>): Promise<ISeller> {
    if (!updateSeller.name) {
      throw new Error('Name is required to update a seller.')
    }
    return this.processRequest('PUT', `${this.url}/${id}`, updateSeller)
  }
}

export const SellerServiceInstance = new SellerService()
