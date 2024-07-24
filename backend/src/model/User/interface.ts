import { ForCreateUserController, ForUpdateUserController, UserControllerObject } from "@/app/User/types";


export interface ForManageUserRepository {
    insert(input: ForCreateUserController): Promise<void>;
    getById(id: string): Promise<UserControllerObject | null>;
    listBy(type: number): Promise<UserControllerObject[]>;
    update({ id, input }: { id: string; input: Partial<ForUpdateUserController> }): Promise<void>;
    delete(id: string): Promise<void>;
    search(id: string): Promise<UserControllerObject | null>;
    listAll(): Promise<UserControllerObject[]>;
}