const validateEmail = (email) => {
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email !== undefined && email !== undefined && email !== null && pattern.test(email)) {
        return false;
    } else {
        return true;
    }
}

const isBlank = (value) => {
    return !(value !== undefined && value !== "" && value !== undefined && value !== null);
}

const isValidAge = (value) => {
    return new Date().getFullYear() - value.getFullYear() > 10;

}

const getPrintableDate = (value) => {
    const d = new Date(parseInt(value))
    return (d.getMonth()+1)+"/"+d.getDate()+"/"+d.getFullYear()
}

export default {
    validateEmail,
    isBlank,
    isValidAge,
    getPrintableDate
}