export interface ForCustomError extends Error {
    where: string
    type: string
    info: any
}

export class CustomError extends Error implements ForCustomError {
    where: string
    type: string
    info: any
    constructor ({where, message, type}: {type: string, where: string, message?: string}, ...args: any) {
        super(message ?? where);
        this.where = where
        this.type = type
        this.info = args
    }
}