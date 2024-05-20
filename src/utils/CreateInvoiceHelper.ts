import type { IInvoice, IInvoiceProduct } from '@/interfaces/IInvoice'

class InvoiceCreator {
  private static readonly DEFAULT_INVOICE_ITEM_ID = 2
  private static readonly DEFAULT_INVOICE_ITEM_NAME = 'Search images service:'
  private static readonly DEFAULT_INVOICE_ITEM_PRICE = 1

  formatDate(date: Date): string {
    return date.toISOString().slice(0, 10)
  }

  createInvoiceItem(quantity: number): IInvoiceProduct {
    return {
      id: InvoiceCreator.DEFAULT_INVOICE_ITEM_ID,
      name: InvoiceCreator.DEFAULT_INVOICE_ITEM_NAME,
      price: InvoiceCreator.DEFAULT_INVOICE_ITEM_PRICE,
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
