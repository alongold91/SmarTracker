export interface User {
    _id: string;
    email: string;
    password: string;
    currency: string;
    interestedInWarnings: boolean;
    warningPercent?: number;
  }