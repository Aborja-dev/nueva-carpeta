import { PrismaClient } from "@prisma/client/extension";
import { UserTypes } from "../types/enum";
import { ModelError } from "../ErrorHanlder";
import { ForUserRepositoryOperations } from "./UserRepo.interface";
import { ForInsertUser, ForUpdateUser } from "./UserRepo.types";
import { UserModel } from "./entities";


export class UserRepo implements ForUserRepositoryOperations {
    constructor (
        private readonly dbConnection: PrismaClient
    ) {}

    async insert (input: ForInsertUser): Promise<void>{
        const {email, name, typeId} = input
        try {
            await this.dbConnection.user.create({
                data: {
                    email,
                    name,
                    type: {
                        connect: {
                            id: typeId
                        }
                    }
                }
            })
        } catch (error) {
            this.onError('insert')
        }
        
    }
    async getById (id: string): Promise<UserModel | null> {
        try {
            const user = await this.dbConnection.user.findUnique({
                where: {
                    id
                }
            })
            if (!user) return null
            return user
        } catch (error) {
            throw this.onError('getById')
        }
    }
    async listBy (type: UserTypes): Promise<UserModel[]> {
        try {
            const users = await this.dbConnection.user.findMany({
                where: {
                    type: {
                        id: type +1
                    }
                }
            })
            return users
        } catch (error) {
            throw this.onError('listBy')
        }
    }
    async update ({id, input}: {id: string, input: Partial<ForUpdateUser>}): Promise<void> {
        try {
            await this.dbConnection.user.update({
                where: {
                    id
                },
                data: input
            })
        } catch (error) {
            throw this.onError('update')
        }
    }
    async delete (id: string): Promise<void> {
        try {
            await this.dbConnection.user.delete({
                where: {
                    id
                }
            })
        } catch (error) {
            throw this.onError('delete')
        }
    }
    async search (id: string): Promise<UserModel | null> {
        try {
            const user = await this.dbConnection.user.findUnique({
                where: {
                    id
                }
            })
            if (!user) return null
            return user
        } catch (error) {
            throw this.onError('search')
        }
    }
    async listAll (): Promise<UserModel[]> {
        try {
            const users = await this.dbConnection.user.findMany()
            return users
        } catch (error) {
            throw this.onError('listAll')
        }
    }
    private onError (where: string, message?: string, ...args: any) {
        throw new ModelError( `${this.constructor.name} ${where}`, message ?? 'Error' ,...args)
    }
}