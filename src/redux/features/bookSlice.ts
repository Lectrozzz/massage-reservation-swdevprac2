import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookingItem } from "../../../interfaces"

type BookState = {
    bookItems: BookingItem[]
}

const initialState:BookState = { bookItems:[]}

export const bookSlice = createSlice ({
    name: "book",
    initialState,
    reducers: {
        addBooking: (state, action:PayloadAction<BookingItem>)=>{
            const nonDuplicateItems = state.bookItems.filter( obj =>{
                return ( (obj.id !== action.payload.id))
            })
            nonDuplicateItems.push(action.payload)
            state.bookItems = nonDuplicateItems
        },
        removeBooking: (state, action:PayloadAction<string>)=>{
            
            const remainItems = state.bookItems.filter( obj =>{
                return ( (obj.id !== action.payload))
            })
            state.bookItems = remainItems
        }
    }
})

export const {addBooking, removeBooking} = bookSlice.actions
export default bookSlice.reducer