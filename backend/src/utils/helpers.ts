export const getIndexFromObject = (listObject: any, value: any) => {
    const _id = Object.values(listObject).indexOf(value)
        if (_id === -1) throw new Error
        return _id + 1
}