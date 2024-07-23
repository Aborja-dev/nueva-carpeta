import { EventStatuses, EventTypes, UserTypes } from "../types/enum";

export type UserModel = {
    id: string;
    name: string;
    email: string;
    type: UserTypes;
    typeId: number;
  };

  export type EventModel = {
    id: string;
    name: string;
    url: string;
    startingDate: Date;
    endingDate: Date;
    timezone: string;
    description: string;
    organizerId: string[];
    status: EventStatuses;
    statusId: number;

    type: EventTypes;
    typeId: number;

    proposalsStartingDate?: Date;
    proposalsEndingDate?: Date;
    bannerUrl?: string;
    location?: string;
};
