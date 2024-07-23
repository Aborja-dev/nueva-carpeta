import { PrismaClient } from "@prisma/client/extension";
import { ForEventRepositoryOperations } from "./Event.interface";
import { ModelError } from "../ErrorHanlder";
import { EventStatuses } from "../types/enum";
import { EventModel } from "./entities";
import { ForInsertEvent, ForUpdateEvent } from "./Event.types";


export class EventRepo implements ForEventRepositoryOperations {
    constructor(
        private readonly dbConnection: PrismaClient
    ) { }

    async insert(input: ForInsertEvent): Promise<void> {
        const { name, url, startingDate, endingDate, timezone, typeId, proposalsStartingDate, proposalsEndingDate, description, bannerUrl, location, organizerId } = input 
        try {
            const event = await this.dbConnection.event.create({
                data: {
                    name,
                    url,
                    startingDate,
                    endingDate,
                    timezone,
                    type: {
                        connect: {
                            id: typeId
                        }
                    },
                    status: {
                        connect: {
                            id: 1
                        }
                    },
                    proposalsStartingDate,
                    proposalsEndingDate,
                    description,
                    bannerUrl,
                    location,
                    organizers: {
                        connect: organizerId.map((id) => ({ id }))
                    }
                }
            })
            console.log(event);
            
        } catch (error) {
            this.onError('insert', error.message, error)
        }
    }

    async search(id: string): Promise<EventModel | null> {
        try {
            const event = await this.dbConnection.event.findUnique({
                where: {
                    id
                }
            })
            if (!event) return null
            return event
        } catch (error) {
            throw this.onError('getById', error.message, error)
        }
    }

    async listAll(): Promise<EventModel[]> {
        try {
            const events = await this.dbConnection.event.findMany()
            return events
        } catch (error) {
            throw this.onError('listAll', error.message, error)
        }
    }

    async listBy(status: EventStatuses): Promise<EventModel[]> {
        // TODO adaptarlo a otros criterios de busqueda
        try {
            const events = this.dbConnection.event.findMany({
                where: {
                    status: {
                        id: status + 1
                    }
                }
            })
            return events
        } catch (error) {
            throw this.onError('listBy', error.message, error)
        }
    }

    async update({ id, input }: { id: string, input: Partial<ForUpdateEvent> }): Promise<void> {
        try {
            await this.dbConnection.event.update({
                where: {
                    id
                },
                data: input
            })
        } catch (error) {
            throw this.onError('update', error.message, error)
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await this.dbConnection.event.delete({
                where: {
                    id
                }
            })
        } catch (error) {
            throw this.onError('delete', error.message, error)
        }
    }
    private onError(where: string, message?: string, ...args: any) {
        throw new ModelError(`${this.constructor.name} ${where}`, message ?? 'Error', ...args)
    }
}