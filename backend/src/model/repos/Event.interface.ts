import { EventStatuses } from "../types/enum";
import { EventModel } from "./entities";
import { ForInsertEvent, ForUpdateEvent } from "./Event.types";



// Interfaz para definir las operaciones del repositorio de eventos
export interface ForEventRepositoryOperations {
    // Método para insertar un nuevo evento
    insert(input: ForInsertEvent): Promise<void>;

    // Método para buscar un evento por ID
    search(id: string): Promise<EventModel | null>;

    // Método para listar todos los eventos
    listAll(): Promise<EventModel[]>;

    // Método para listar eventos por estado
    listBy(status: EventStatuses): Promise<EventModel[]>;

    // Método para actualizar un evento
    update({ id, input }: { id: string, input: Partial<ForUpdateEvent> }): Promise<void>;

    // Método para eliminar un evento por ID
    delete(id: string): Promise<void>;
    
}

