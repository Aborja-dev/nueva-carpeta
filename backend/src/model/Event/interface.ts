import { EventControllerObject, ForCreateEventController, ForUpdateEventController } from "@/app/Event/types";


export interface ForManageEventRepository {
    insert(input: ForCreateEventController): Promise<void>;
    search(id: string): Promise<EventControllerObject | null>;
    listAll(): Promise<EventControllerObject[]>;
    listBy(status: number): Promise<EventControllerObject[]>;
    update(params: { id: string; input: Partial<ForUpdateEventController> }): Promise<void>;
    delete(id: string): Promise<void>;
}