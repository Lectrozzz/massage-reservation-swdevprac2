import { create } from 'zustand';
import { persist } from 'zustand/middleware'
import { User } from '../../interfaces';

type UserStore = {
    user: User | null;
    token: string | null;
    login: (user: User, token:string) => void;
    logout: () => void;
}

const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            login: (user: User, token: string) => {
                set({ user, token });
            },
            logout: () => set({ user: null, token: null }),
        }),
        {
            name: 'user-storage',
        }
    )
);

export default useUserStore;
    