import { ForManageEventRepository } from '@/model/Event/interface';
import { EventControllerObject, EventStatuses, EventStatusesObj, EventTypes, EventTypesObj, ForCreateEventController, ForUpdateEventController } from './../../app/Event/types';
import { EventRepo } from "@/model/Event/repository";
import { EventModelObject } from '@/model/Event/types';
import { AdapterError } from "@/utils/error/AdapterError";



export class EventAdapter implements ForManageEventRepository {
    constructor(
        private readonly repository: EventRepo,
    ) { }

    async insert(input: ForCreateEventController) {
        await this.repository.insert({
            ...input,
            endingDate: toModel.endingDate(input.endingDate) as Date,
            startingDate: toModel.startingDate(input.startingDate) as Date,
            typeId: toModel.typeId(input.type),
        })
    }

    async search(id: string): Promise<EventControllerObject | null> {
        const event = await this.repository.search(id)
        if (!event) return null
        return this.transform(event)
    }

    async listAll(): Promise<EventControllerObject[]> {
        const events = await this.repository.listAll()
        return events.map((event) => this.transform(event))
    }

    async listBy(status: number): Promise<EventControllerObject[]> {
        const events = await this.repository.listBy(status)
        return events.map((event) => this.transform(event))
    }

    async update({ id, input }: { id: string, input: Partial<ForUpdateEventController> }) {
        await this.repository.update({
            id, input: {
                ...input,
                endingDate: toModel.endingDate(input.endingDate),
                startingDate: toModel.startingDate(input.startingDate),
            }
        })
    }

    async listByOrganizer(organizerId: string): Promise<EventControllerObject[]> {
        const events = await this.repository.listByOrganizer(organizerId)
        return events.map((event) => this.transform(event))
    }

    async delete(id: string) {
        await this.repository.delete(id)
    }

    private transform(event: EventModelObject): EventControllerObject {
        return {
            ...event,
            type: fromModel.type(event.typeId),
            status: fromModel.status(event.statusId)
        }
    }
}



const fromModel = {
    type: (type: number): EventTypes => {
        const _type = type as keyof typeof EventTypesObj
        return EventTypesObj[_type]
    },
    status: (status: number): EventStatuses => {
        const _status = status as keyof typeof EventStatusesObj
        return EventStatusesObj[_status]
    }
}
const toModel = {
    endingDate: (datestring: string | undefined): Date | undefined => {
        if (!datestring) return undefined
        const date = new Date(datestring)
        if (isNaN(date.getTime())) throw new AdapterError('Event Adapter endingDate', 'invalid date format', { value: datestring })
        return date
    },
    startingDate: (datestring: string | undefined ): Date | undefined => {
        if (!datestring) return undefined
        const date = new Date(datestring)
        if (isNaN(date.getTime())) throw new AdapterError('Event Adapter startingDate', 'invalid date format', { value: datestring })
        return date
    },
    typeId: (type: number): number => type + 1
}