import { UserModel } from "./entities"

export type ForInsertUser = Pick<UserModel, 'name' | 'email' | 'typeId'>
export type ForUpdateUser = Pick<UserModel, 'name' | 'typeId'>