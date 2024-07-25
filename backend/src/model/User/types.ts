export interface ForInsertUser  {
    name: string;
    email: string;
    typeId: number;
    passwordHash: string;
}
export interface ForUpdateUser {
    name?: string;
    typeId?: number;
}
export interface ForUserOutput {
    id: string,
    name: string,
    email: string,
    typeId: number
    passwordHash: string;
}
