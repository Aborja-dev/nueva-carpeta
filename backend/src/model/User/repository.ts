import { ForInsertUser, ForUpdateUser, ForUserOutput } from "@/model/User/types";
import { ModelError } from "@/utils/error/ModelError";
import { PrismaClient } from "@prisma/client"

export class UserRepo {
    constructor (
        private readonly dbConnection: PrismaClient
    ) {}

    async insert (input: ForInsertUser): Promise<string> {
        const {email, name, typeId, passwordHash} = input
        try {
            const result = await this.dbConnection.user.create({
                data: {
                    email,
                    name,
                    passwordHash,
                    type: {
                        connect: {
                            id: typeId
                        }
                    }
                }
            })
            return result.id
        } catch (error: any) {
            throw this.onError('insert', error.name, error)
        }
        
    }
    async getById (id: string) {
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
    async listBy (type: number): Promise<ForUserOutput[]> {
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
    async search (id: string): Promise<ForUserOutput | null> {
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
    async searchByEmail (email: string): Promise<ForUserOutput | null> {
        try {
            const user = await this.dbConnection.user.findUnique({
                where: {
                    email
                }
            })
            if (!user) return null
            return user
        } catch (error) {
            throw this.onError('search')
        }
    }
    async listAll (): Promise<ForUserOutput[]> {
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