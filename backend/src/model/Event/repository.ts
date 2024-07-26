import { ForInsertEventModel, EventModelObject, ForUpdateEventModel } from '@model/Event/types';
import { ModelError } from "@/utils/error/ModelError";
import { PrismaClient } from "@prisma/client";

export class EventRepo {
    constructor(
        private readonly dbConnection: PrismaClient
    ) { }

    async insert(input: ForInsertEventModel): Promise<void> {
        const { name, url, startingDate, endingDate, timezone, typeId, proposalsStartingDate, proposalsEndingDate, description, bannerUrl, location} = input 
        const organizers = input.organizers as string[]
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
                        connect: organizers.map((id ) => ({ id }))
                    }
                }
            })
            console.log(event);
            
        } catch (error: any) {
            this.onError('insert', error.message, error)
        }
    }

    async search(id: string): Promise<EventModelObject | null> {
        try {
            const event = await this.dbConnection.event.findUnique({
                where: {
                    id
                },
                include: {
                    organizers: {
                        select: {
                            name: true,
                            email: true
                        }
                    }
                }
            })
            if (!event) return null
            return event
        } catch (error: any) {
            throw this.onError('getById', error.message, error)
        }
    }

    async listAll(): Promise<EventModelObject[]> {
        try {
            const events = await this.dbConnection.event.findMany(
                {
                    include: {
                        organizers: {
                            select: {
                                name: true,
                                email: true
                            }
                        }
                    }
                }
            )
            return events
        } catch (error: any) {
            throw this.onError('listAll', error.message, error)
        }
    }

    async listBy(status: number): Promise<EventModelObject[]> {
        // TODO adaptarlo a otros criterios de busqueda
        try {
            const events = this.dbConnection.event.findMany({
                where: {
                    status: {
                        id: status + 1
                    }
                },
                include: {
                    organizers: {
                        select: {
                            name: true,
                            email: true
                        }
                    }
                }
            })
            return events
        } catch (error: any) {
            throw this.onError('listBy', error.message, error)
        }
    }

    async update({ id, input }: { id: string, input: Partial<ForUpdateEventModel> }): Promise<void> {
        try {
            await this.dbConnection.event.update({
                where: {
                    id
                },
                data: input
            })
        } catch (error: any) {
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
        } catch (error: any) {
            throw this.onError('delete', error.message, error)
        }
    } 

    async listByOrganizer(organizerId: string): Promise<EventModelObject[]> {
        try {
            const events = await this.dbConnection.event.findMany({
                where: {
                    organizers: {
                        some: {
                            id: organizerId
                        }
                    }
                },
                include: {
                    organizers: {
                        select: {
                            name: true,
                            email: true
                        }
                    }
                }
            })
            return events
        } catch (error: any) {
            throw this.onError('listByOrganizer', error.message, error)
        }
    }
    private onError(where: string, message?: string, ...args: any) {
        throw new ModelError(`${this.constructor.name} ${where}`, message ?? 'Error', ...args)
    }
}

