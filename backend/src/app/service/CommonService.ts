
import { ForManageUserRepository } from "@/model/User/interface";
import { ForCreateUserController, UserSesion } from "@/app/User/types";
import { AuthService } from "@/app/common/AuthService";
import { CreateUserSchema } from "@/app/User/schema";
export class CommonService {
    constructor(
        private readonly userRepo: ForManageUserRepository
    ) { }

    async register(user: ForCreateUserController) {
        CreateUserSchema.parse(user)
        const hashedPassword = AuthService.hashPassword(user.password)
        const createdID = await this.userRepo.insert({
            name: user.name,
            email: user.email,
            type: user.type,
            password: hashedPassword
        })
        return this.userRepo.getById(createdID)
    }

    async login(email: string, password: string): Promise<UserSesion | null> {
        const user = await this.userRepo.searchByEmail(email)
        if (!user) return null
        const passwordCorrect = AuthService.comparePassword(password, user.password)
        if (!passwordCorrect) return null
        return {
            id: user.id,
            name: user.name,
            type: user.type,
            token: AuthService.generateToken({ id: user.id })
        }
    }
}
