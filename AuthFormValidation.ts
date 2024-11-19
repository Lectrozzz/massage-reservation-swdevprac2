export const validateBookingDate = (bookingDate: string) => {
    if (!bookingDate) {
        return 'Booking Date is required'
    }

    if (!bookingDate.match(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/)) {
        return 'Invalid date format'
    }

    if (new Date(bookingDate) <= new Date()) {
        return 'Booking date must not be in the past or today.'
    }
    return ''
}

export const validateServiceMinute = (serviceMinute: number) => {
    if (!serviceMinute) {
        return 'Service Minute is required'
    }
    if (!(serviceMinute === 60 || serviceMinute === 90 || serviceMinute ===120)){
        return 'Invalid service minute value'
    }

    return ''
}