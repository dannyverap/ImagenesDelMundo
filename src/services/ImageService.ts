import axios, { type AxiosRequestConfig } from 'axios'
import type { ImageItem, ImageSearchResponse } from '@/interfaces/IImage'

class ImageSearchService {
  private baseUrl: string
  private apiKey: string
  private searchEngineId: string

  constructor() {
    this.baseUrl = import.meta.env.APP_GOOGLE_BASE_URL
    this.apiKey = import.meta.env.APP_GOOGLE_API_KEY
    this.searchEngineId = import.meta.env.APP_GOOGLE_SEARCH_ENGINE_ID
  }

  private generateImageSearchUrl(query: string, resultsNumber: number) {
    return `${this.baseUrl}?cx=${this.searchEngineId}&key=${this.apiKey}&num=${resultsNumber}&q=${query}&searchType=image`
  }

  public async searchImages(query: string, resultsNumber: number): Promise<ImageItem[]> {
    const url = this.generateImageSearchUrl(query, resultsNumber)
    const options: AxiosRequestConfig = {
      method: 'GET',
      url,
      headers: {
        accept: 'application/json'
      }
    }
    try {
      const response = await axios.request<ImageSearchResponse>(options)
      return response.data.items
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Request failed with status ${error.response?.status}: ${error.response?.data?.message}`
        )
      }
      throw new Error('An unexpected error occurred')
    }
  }
}

export const ImageSearchServiceInstance = new ImageSearchService()
