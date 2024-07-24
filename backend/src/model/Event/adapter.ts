import { EventRepo } from "@/model/Event/repository";
import { AdapterError } from "@/utils/error/AdapterError";

export const EventTypesObj = {
    0: 'PRESENCIAL',
    1: 'VIRTUAL',
    2: 'HYBRID'
} as const

export type EventTypes = typeof EventTypesObj[keyof typeof EventTypesObj];

export const EventStatusesObj = {
    0: 'BORRADOR',
    1: 'EN_PROCESO',
    2: 'FINALIZADO'
} as const;

export type EventStatuses = typeof EventStatusesObj[keyof typeof EventStatusesObj];


export interface AppCreateEventInput {
    name: string;
    description: string;
    organizers: string[];
    type: keyof typeof EventTypesObj;
    url: string | null;
    bannerUrl?: string | null;
    location?: string | null;
    startingDate: string;
    endingDate: string;
    proposalsStartingDate?: Date | null;
    proposalsEndingDate?: Date | null;
    timezone: string;
}

export interface AppUpdateEventInput { 
    description: string;
    status: keyof typeof EventStatusesObj
    bannerUrl?: string | null;
    location?: string | null;
    startingDate: string;
    endingDate: string;
    proposalsStartingDate?: Date | null;
    proposalsEndingDate?: Date | null;
    timezone: string;
 }
export interface AppEvent {
    id: string;
    name: string;
    url: string | null;
    startingDate: Date;
    endingDate: Date;
    type: EventTypes;
    proposalsStartingDate?: Date | null;
    proposalsEndingDate?: Date | null;
    description: string;
    bannerUrl?: string | null;
    location?: string | null;
    timezone: string;
    organizers: Array<{
        name: string;
        email: string;
    }> | string[];
    status: EventStatuses

}

export class EventAdapter {
    constructor(
        private readonly repository: EventRepo
    ) { }

    async insert(input: AppCreateEventInput) {
        try {
            const endDate = new Date(input.endingDate)
            if (isNaN(endDate.getTime())) throw this.onError('insert', 'invalid date format', { value: input.endingDate })
            const startDate = new Date(input.startingDate)
            if (isNaN(startDate.getTime())) throw this.onError('insert', 'invalid date format', { value: input.endingDate })
            await this.repository.insert({
                ...input,
                endingDate: endDate,
                startingDate: startDate,
                typeId: input.type + 1
            })
        } catch (error: any) {
            throw error
        }

    }

    async search(id: string): Promise<AppEvent | null> {
        try {
            const event = await this.repository.search(id)
            const typeId = event?.typeId as keyof typeof EventTypesObj
            const statusId = event?.statusId as keyof typeof EventTypesObj
            if (!event) return null
            return {
                ...event,
                type: EventTypesObj[typeId],
                status: EventStatusesObj[statusId]
            }
        } catch (error) {
            throw error
        }

    }

    async listAll(): Promise<AppEvent[]> {
        try {
            const events = await this.repository.listAll()
            return events.map((event) => {
                const typeId = event.typeId as keyof typeof EventTypesObj
                const statusId = event.statusId as keyof typeof EventTypesObj
                return {
                    ...event,
                    type: EventTypesObj[typeId],
                    status: EventStatusesObj[statusId]
                }
            })
        } catch (error) {
            throw error
        }
    }

    async listBy(status: number): Promise<AppEvent[] | null> {
        try {
            const events = await this.repository.listBy(status)
            return events.map((event) => {
                const typeId = event.typeId as keyof typeof EventTypesObj
                const statusId = event.statusId as keyof typeof EventTypesObj
                return {
                    ...event,
                    type: EventTypesObj[typeId],
                    status: EventStatusesObj[statusId]
                }
            })
        } catch (error) {
            throw error
        }
    }

    async update({ id, input }: { id: string, input: Partial<AppUpdateEventInput> }) {
        try {

            await this.repository.update({ id, input: {
                ...input,
                endingDate: input.endingDate ? new Date(input.endingDate as string) : undefined,
                startingDate: input.startingDate ? new Date(input.startingDate as string) : undefined,
            } })
        } catch (error: any) {
            throw error
        }
    }

    async delete(id: string) {
        try {
            await this.repository.delete(id)
        } catch (error: any) {
            throw error
        }
    }
    private onError(where: string, message?: string, ...args: any) {
        throw new AdapterError(`${this.constructor.name} ${where}`, message ?? 'Error', ...args)
    }
}