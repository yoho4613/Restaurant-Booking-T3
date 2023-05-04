export interface DateType {
  justDate: Date | null;
  dateTime: Date | null;
}

interface CustomerDetail {
  dateTime: string;
  email: string;
  mobile: string;
  name: string;
  people: string;
  preorder: boolean;
}

type Categories = typeof categories[number]