import { ForCreateUserController, ForUpdateUserController, UserControllerObject, UserTypes, UserTypesConst } from "@/app/User/types";
import { ForManageUserRepository } from "@/model/User/interface";
import { UserRepo } from "@/model/User/repository";
import { ForUserOutput } from "@/model/User/types";

export class UserAdapter implements ForManageUserRepository {
    constructor(
        private readonly repository: UserRepo
    ) { }

    async insert(input: ForCreateUserController): Promise<void> {
        await this.repository.insert({
            email: input.email,
            name: input.name,
            typeId: toModel.typeId(input.type)
        })
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
    async listAll(): Promise<UserControllerObject[]> { 
        const users = await this.repository.listAll()
        return users.map(user => this.trasform(user))
     }
    private trasform(user: ForUserOutput): UserControllerObject { 
        return {
            ...user,
            type: fromModel.type(user.typeId)
        }
     }
}

const toModel = {
    typeId : (type: number): number => type + 1
}

const fromModel = {
    type : (id: number): UserTypes => {
        const _id = id as keyof typeof UserTypesConst
        return UserTypesConst[_id] 
    }
}