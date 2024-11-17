import { create } from 'zustand';

type Shop = {
    id: string,
    name: string,
    priceLevel: number,
    address: string,
    province: string,
    postalcode: string,
    tel: string,
    picture: string,
}

type ShopList = {
    shops: Shop[],
    setShops: (shops: Shop[]) => void
}

const useShopList = create<ShopList>((set) => ({
    shops: [],
    setShops: (shops: Shop[]) => set({ shops }),
}))

export default useShopList;

