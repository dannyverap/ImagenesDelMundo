import type { IInvoice, IInvoiceProduct } from '@/interfaces/IInvoice'

class InvoiceCreator {
  formatDate(date: Date): string {
    return date.toISOString().slice(0, 10)
  }

  createInvoiceItem(quantity: number): IInvoiceProduct {
    return {
      id: 2,
      name: 'Search images service:',
      price: 1,
      quantity
    }
  }

  createDefaultInvoice(sellerId: number, points: number): IInvoice {
    const items = [this.createInvoiceItem(points)]
    return {
      status: 'open',
      payments: [{ date: this.formatDate(new Date()) }],
      items,
      dueDate: this.formatDate(new Date()),
      date: this.formatDate(new Date()),
      client: 3,
      seller: { id: sellerId }
    }
  }
}

export const InvoiceCreatorInstance = new InvoiceCreator()
