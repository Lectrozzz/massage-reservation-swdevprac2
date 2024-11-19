export const validateEmail = (email: string) => {
    if (!email) {
        return 'Email is required'
    }

    if (!email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
        return 'Invalid email format'
    }

    return ''
}

export const validateName = (name: string) => {
    if (!name) {
        return 'Name is required'
    }

    return ''
}

export const validateTel = (tel: string) => {
    if (!tel) {
        return 'Telephone number is required'
    }

    if (!tel.match(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/)) {
        return 'Invalid telephone number format'
    }

    return ''
}

export const validatePassword = (password: string) => {
    if (!password) {
        return 'Password is required'
    }

    if (password.length < 6) {
        return 'Password must be at least 6 characters'
    }

    return ''
}

export const validateConfirmPassword = (password: string, confirmPassword: string) => {
    if (!confirmPassword) {
        return 'Confirm password is required'
    }

    if (password !== confirmPassword) {
        return 'Password does not match'
    }

    return ''
}

export const validateRole = (role: string) => {
    if (!role) {
        return 'Role is required'
    }

    if(role !== 'admin' && role !== 'user'){
        return 'Invalid role'
    }

    return ''
}