import type { ISeller } from './ISeller'
interface IInvoiceProduct {
  id: number
  price: number
  name?: string
  quantity: number
}

interface IInvoice {
  id?: number
  status: string
  items: IInvoiceProduct[]
  dueDate: string
  payments?: Array<any>
  date: string
  client: number
  seller: Partial<ISeller>
  total?: number
}

export type { IInvoice, IInvoiceProduct }
