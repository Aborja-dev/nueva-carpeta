export const getEnumIndex = (enumObj: any, value: any) => {
    return Object.keys(enumObj).findIndex((key) => enumObj[key] === value)
}