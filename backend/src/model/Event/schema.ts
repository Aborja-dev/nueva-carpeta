export type EventModel = {
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

};
