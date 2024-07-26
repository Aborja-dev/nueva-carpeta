import { AuthService } from "@/app/common/AuthService";
import { CommonService } from "@/app/service/CommonService";
import { OrganizerService } from "@/app/service/OrganizerService";
import { CandidateService } from "@/app/service/UserCandidate";
import { compositionPrisma } from "@/model";
import { TalkProposalRepo } from "@/model/Proposal/repository";
import { DatabaseModelType } from "@/types";
import { Prisma, PrismaClient } from "@prisma/client";

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
    const client = new PrismaClient()
    const pr = new TalkProposalRepo(client)
    
    const organizer = new OrganizerService(
        db.repositories.event,
        db.repositories.proposal,
        db.repositories.user
    )
    const commonService = new CommonService(
        db.repositories.user
    )


   await organizer.setUserId('7ddb6c33-cd2c-414d-a360-83bc5684a8b7')
   await organizer.changeProposalStatus([
    { id: 3, status: 'PRESELECCION' },
    { id: 4, status: 'PRESELECCION' },
    { id: 5, status: 'PRESELECCION' },
])
}
    

(async () => {
    createServer(await compositionPrisma())
})()