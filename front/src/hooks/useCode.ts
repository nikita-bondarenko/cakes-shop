export const getCode = () => {
    const str = Date.now().toString()
    return str.slice(-6)
}