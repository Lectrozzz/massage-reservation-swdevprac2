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
    name: string;
    surname: string;
    id: string;
    hospital: string;
    bookDate: string;
  }

export interface User {
    name: string;  
    email: string;
    tel: string;
    role: string; 
}

export enum PageStatus {
    DEFAULT = 'default',
    LOADING = 'loading',
    ERROR = 'error',
    SUCCESS = 'success',
}

