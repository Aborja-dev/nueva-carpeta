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


export interface ForCreateEventController {
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

export interface ForUpdateEventController { 
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
export interface EventControllerObject {
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
