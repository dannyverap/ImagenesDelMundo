import type { IInvoice, IInvoiceProduct } from '@/interfaces/IInvoice'

class InvoiceCreator {
  private static readonly DEFAULT_INVOICE_ITEM_ID = 2
  private static readonly DEFAULT_INVOICE_ITEM_NAME = 'Search images service:'
  private static readonly DEFAULT_INVOICE_ITEM_PRICE = 1
  private static readonly DEFAULT_INVOICE_CLIENT_ID = 3

  formatDate(date: Date): string {
    return date.toISOString().slice(0, 10)
  }

  createInvoiceItem(
    quantity: number,
    itemId: number = InvoiceCreator.DEFAULT_INVOICE_ITEM_ID,
    itemName: string = InvoiceCreator.DEFAULT_INVOICE_ITEM_NAME,
    itemPrice: number = InvoiceCreator.DEFAULT_INVOICE_ITEM_PRICE
  ): IInvoiceProduct {
    return {
      id: itemId,
      name: itemName,
      price: itemPrice,
      quantity
    }
  }

  createDefaultInvoice(
    sellerId: number,
    points: number,
    clientId: number = InvoiceCreator.DEFAULT_INVOICE_CLIENT_ID
  ): IInvoice {
    const currentDate = new Date()
    const items = [this.createInvoiceItem(points)]
    const formattedDate = this.formatDate(currentDate)
    return {
      client: clientId,
      status: 'open',
      items,
      dueDate: formattedDate,
      date: formattedDate,
      seller: { id: sellerId }
    }
  }
}

export const InvoiceCreatorInstance = new InvoiceCreator()
