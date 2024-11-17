export interface HospitalItem {
    _id: string,
    name: string,
    address: string,
    district: string,
    province: string,
    postalcode: string,
    tel: string,
    picture: string,
    __v: number,
    id: string
  }
  
export interface HospitalJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: HospitalItem[]
  }

  export interface BookingItem {
    _id: string;
    bookingDate: Date;
    serviceMinute: number;
    user: string;
    shop: Shop;
    createdAt: string;
    __v: number;
  }
export interface Shop {
    _id: string;
    name: string;
    address: string;
    tel: string;
    id: string;
}

export interface User {
    name: string;  
    email: string;
    tel: string;
    role: string;
    id: string;
}

export enum PageStatus {
    DEFAULT = 'default',
    LOADING = 'loading',
    ERROR = 'error',
    SUCCESS = 'success',
}

