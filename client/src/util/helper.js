export const isArrayNullOrEmpty = (array) => {
    if(!array) return true
    if(array.length === 0) return true
    return false
}