export interface CustomError extends Error {
    where: string
    type: string
    info: any
}

export class ModelError extends Error implements CustomError {
    where: string
    type: string
    info: any
    constructor (where: string, message: string, ...args: any) {
        super(message ?? where);
        this.where = where
        this.type = 'ModelError'
        this.info = args
    }
}