export interface DateType {
  justDate: Date | null;
  dateTime: Date | null;
}

export interface CustomerDetail {
  dateTime: string;
  email: string;
  mobile: string;
  name: string;
  people: string;
  preorder: boolean;
}

type Categories = typeof categories[number]

export interface Booking {
  id: string,
  email: string,
  createdAt: Date,
  dateTime: Date,
  mobile: string,
  name: string,
  people: string,
  preorder: boolean
}