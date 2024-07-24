export const UserTypesConst = {
    0: 'ADMIN',
    1: 'USER',
    2: 'ORGANIZER',
    3: 'CANDIDATE'
} as const;

// Tipado para UserTypes
export type UserTypes = typeof UserTypesConst[keyof typeof UserTypesConst];

export interface ForCreateUserController {
    name: string,
    email: string,
    type: number
}
export interface ForUpdateUserController {
    name: string,
    type: number
}
export interface UserControllerObject {
    id: string,
    name: string,
    email: string,
    type: UserTypes
}