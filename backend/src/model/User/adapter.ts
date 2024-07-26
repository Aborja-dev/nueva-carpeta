import { ForCreateUserController, ForUpdateUserController, UserControllerObject, UserTypes, UserTypesConst } from "@/app/User/types";
import { ForManageUserRepository } from "@/model/User/interface";
import { UserRepo } from "@/model/User/repository";
import { ForUserOutput } from "@/model/User/types";
import { AdapterError } from "@/utils/error/AdapterError";

export class UserAdapter implements ForManageUserRepository {
    constructor(
        private readonly repository: UserRepo
    ) { }

    async insert(input: ForCreateUserController): Promise<UserControllerObject['id']> {
        const result = await this.repository.insert({
            email: input.email,
            name: input.name,
            passwordHash: input.password,
            typeId: toModel.typeId(input.type)
        })
        return result
    }
    async getById(id: string): Promise<UserControllerObject | null> { 
        const user = await this.repository.getById(id)
        if (!user) return null
        return this.trasform(user)
     }
    async listBy(type: number): Promise<UserControllerObject[]> { 
        const users = await this.repository.listBy(type)
        return users.map(user => this.trasform(user))
     }
    async update({ id, input }: { id: string; input: Partial<ForUpdateUserController> }): Promise<void> {
        await this.repository.update({ id, input })
    }
    async delete(id: string): Promise<void> {
        await this.repository.delete(id)
    }
    async search(id: string): Promise<UserControllerObject | null> { 
        const user = await this.repository.search(id)
        if (!user) return null
        return this.trasform(user)
     }
    async searchByEmail(email: string): Promise<UserControllerObject | null> { 
        const user = await this.repository.searchByEmail(email)
        if (!user) return null
        return this.trasform(user)
     }

    async listAll(): Promise<UserControllerObject[]> { 
        const users = await this.repository.listAll()
        return users.map(user => this.trasform(user))
     }
    private trasform(user: ForUserOutput): UserControllerObject { 
        return {
            ...user,
            password: user.passwordHash,
            type: fromModel.type(user.typeId)
        }
     }
}

const toModel = {
    typeId : (type: UserTypes): number => {
        const _id = Object.values(UserTypesConst).indexOf(type)
        if (_id === -1) throw new AdapterError('User Adapter typeId', 'invalid type')
        return _id + 1
    },
}

const fromModel = {
    type : (id: number): UserTypes => {
        const _id = id - 1 as keyof typeof UserTypesConst
        return UserTypesConst[_id] 
    }
}