import { EventModel } from "./entities"

export type ForInsertEvent = Pick<EventModel, 'name' | 'url' | 'startingDate' | 'endingDate' | 'timezone' | 'typeId' | 'proposalsStartingDate' | 'proposalsEndingDate' | 'description' | 'bannerUrl' | 'location' | 'organizerId'>

export type ForUpdateEvent = Pick<EventModel, 'description' | 'bannerUrl' | 'location' | 'endingDate' | 'startingDate' | 'url' | 'statusId'>