export interface User {
    email: string;
    password: string;
    currency: string;
    interestedInWarnings: boolean;
    warningPercent?: number;
  }