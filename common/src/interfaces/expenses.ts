type PaymentMethod =
  | 'Bank transfer'
  | 'Cash'
  | 'Credit card'
  | 'Check'
  | 'Alternative payment'
  | 'Digital payment'
  | 'Direct deposit'
  | 'Digital wallet'
  | 'Cryptocurrency'
  | 'Mobile payment';
export interface Expense {
  _id: string;
  userId: string;
  title?: string;
  date: number;
  sum: number;
  paymentMethod: PaymentMethod;
  category: string;
  description?: string;
  receiptImagePath?: string;
}
