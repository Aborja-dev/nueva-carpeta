import { CommonService } from "@/app/service/CommonService";
import { OrganizerService } from "@/app/service/OrganizerService";
import { compositionPrisma } from "@/model";
import { DatabaseModelType } from "@/types";

// crear un servidor en express
import express from 'express';
import cors from 'cors';
import { createProposalRouter } from "@/app/Proposal/Router";
import { createEventRouter } from "@/app/Event/Controller";





const usuarios = [
    {
        name: 'Usuario 1',
        email: 'email1@email.com',
        type: 'ORGANIZER',
        password: '123asdfg'
    },
    {
        name: 'Usuario 2',
        email: 'email2@email.com',
        type: 'ORGANIZER',
        password: '123asdfg'
    },
    {
        name: 'Usuario 3',
        email: 'email3@email.com',
        type: 'ORGANIZER',
        password: '123asdfg'
    }
];
const eventos = [
    {
        name: 'Test',
        url: 'test',
        startingDate: '2023-01-01',
        endingDate: '2023-01-01',
        type: 0,
        description: 'test',
        bannerUrl: 'test',
        location: 'test',
        timezone: 'test',
        organizers: ['655d57f6-d619-4da2-aaf2-bf16660b2c43', '7ddb6c33-cd2c-414d-a360-83bc5684a8b7']
    },
    {
        name: 'Test2',
        url: 'test2',
        startingDate: '2023-01-01',
        endingDate: '2023-01-01',
        type: 0,
        description: 'test2',
        bannerUrl: 'test2',
        location: 'test2',
        timezone: 'test2',
        organizers: ['655d57f6-d619-4da2-aaf2-bf16660b2c43', '8bd02ca6-11d0-44c7-bf16-f4c029884012']
    },
    {
        name: 'Test3',
        url: 'test3',
        startingDate: '2023-01-01',
        endingDate: '2023-01-01',
        type: 0,
        description: 'test3',
        bannerUrl: 'test3',
        location: 'test3',
        timezone: 'test3',
        organizers: ['8bd02ca6-11d0-44c7-bf16-f4c029884012']
    },
    {
        name: 'Test4',
        url: 'test4',
        startingDate: '2023-01-01',
        endingDate: '2023-01-01',
        type: 0,
        description: 'test4',
        bannerUrl: 'test4',
        location: 'test4',
        timezone: 'test4',
        organizers: ['8bd02ca6-11d0-44c7-bf16-f4c029884012']
    },
    {
        name: 'Test5',
        url: 'test5',
        startingDate: '2023-01-01',
        endingDate: '2023-01-01',
        type: 0,
        description: 'test5',
        bannerUrl: 'test5',
        location: 'test5',
        timezone: 'test5',
        organizers: ['8bd02ca6-11d0-44c7-bf16-f4c029884012', '7ddb6c33-cd2c-414d-a360-83bc5684a8b7']
    }
];
export const createServer = async (db: DatabaseModelType) => {

    const app = express();

    app.use(express.json());
    app.use(cors());
    app.use('/api/proposals',createProposalRouter({
        eventRepo: db.repositories.event,
        proposalRepo: db.repositories.proposal,
        userRepo: db.repositories.user
    }));
    app.use('/api/events', createEventRouter({
        eventRepo: db.repositories.event,
        proposalRepo: db.repositories.proposal,
        userRepo: db.repositories.user
    }))
    app.listen(3000, () => console.log('Server running on port 3000'));
}


(async () => {
    createServer(await compositionPrisma())
})()