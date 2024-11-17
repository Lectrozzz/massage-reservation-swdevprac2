'use client'

import useUserStore from "@/hooks/useUser";
import { useParams } from "next/navigation";

const createBookingPage = () => {
    const params = useParams<{sid: string}>()
    const { user, token } = useUserStore();

    const shopId = params.sid;
    const userId = user?.id;
    // TODO: Implement the create booking form here. Goodluck :D
    return (
        <main className="w-[80%] flex flex-col mx-auto items-center">
            <h1 className="text-black font-semibold text-2xl mt-8">Create Booking</h1>
        </main>
    );
}

export default createBookingPage;