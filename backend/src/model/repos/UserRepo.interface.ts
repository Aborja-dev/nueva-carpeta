import { UserModel } from './../types/types';
import { PrismaClient } from "@prisma/client";
import { UserTypes } from "../types/enum";
import { ForInsertUser, ForUpdateUser } from './UserRepo.types';

// Interfaz para definir las operaciones del repositorio de usuarios
export interface ForUserRepositoryOperations {
    // Método para insertar un nuevo usuario
    insert(input: ForInsertUser): Promise<void>;

    // Método para obtener un usuario por ID
    getById(id: string): Promise<UserModel | null>;

    // Método para listar usuarios por tipo
    listBy(type: UserTypes): Promise<UserModel[]>;

    // Método para actualizar un usuario
    update({id, input}: {id: string, input: Partial<ForUpdateUser>}): Promise<void>;

    // Método para eliminar un usuario por ID
    delete(id: string): Promise<void>;

    // Método para buscar un usuario por ID
    search(id: string): Promise<UserModel | null>;

    // Método para listar todos los usuarios
    listAll(): Promise<UserModel[]>;
}
