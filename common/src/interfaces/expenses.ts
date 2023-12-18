export interface Expense {
    userId: string;
    title?: string;
    date: number;
    sum: number;
    category: string;
    description?: string;
    receiptImagePath?: string;
  }