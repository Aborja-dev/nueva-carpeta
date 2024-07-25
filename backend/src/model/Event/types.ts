export interface EventModelObject {
    id: string;
    name: string;
    url: string | null;
    startingDate: Date;
    endingDate: Date;
    typeId: number;
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
    statusId: number;
}

export interface ForInsertEventModel {
    name: string;
    url: string | null;
    startingDate: Date;
    endingDate: Date;
    timezone: string;
    typeId: number;
    proposalsStartingDate?: Date | null;
    proposalsEndingDate?: Date | null;
    description: string;
    bannerUrl?: string | null;
    location?: string | null;
    organizers: Array<{
        name: string;
        email: string;
      }> | string[];
}


export interface ForUpdateEventModel {
    description: string;
    bannerUrl?: string | null;
    location?: string | null;
    endingDate: Date;
    startingDate: Date;
    url: string | null;
    statusId: number;
}
