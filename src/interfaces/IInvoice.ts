interface IInvoiceProduct {
  id: number
  price: number
  name?: string
  quantity: number
}

interface IInvoice {
  id?: number
  items: IInvoiceProduct[]
  dueDate: string
  date: string
  client: number
  seller: number
}

export type { IInvoice, IInvoiceProduct }
