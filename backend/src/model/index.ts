import { client } from '@model/config/connection';
import { UserRepo } from './repos/UserRepo';
import { CustomError } from './ErrorHandler';
import pc from 'picocolors';
import { EventStatuses, UserTypes } from './types/enum';
import { EventRepo } from './repos/EventRepo';
import { TalkProposalRepo } from '@/model/repos/TalkProposal.repo';
const ProposalRepo = new TalkProposalRepo(client);
const eventRepo = new EventRepo(client); 
const userRepotest = async () => {
    const userRepo = new UserRepo(client);
    try {
        // await createUser();
        // await userRepo.insert({ name: 'Abraham Borja', email: 'abraham1@me.com', typeId: 2 });
        // await userRepo.insert({ name: 'Abraham3', email: 'abraham3@me.com', typeId: 2 });
        // await userRepo.insert({ name: 'Abraham3', email: 'abraham2@me.com', typeId: 10 });
        // await userRepo.insert({ name: 'Abraham4', email: 'abraham4@me.com', typeId: 4 });
        console.log(pc.green('User in database: '), await userRepo.search('42bde2f4-3659-4130-8ad8-e063a1459082'));
        await userRepo.delete('42bde2f4-3659-4130-8ad8-e063a1459082');
        console.log(pc.red('User in database: '), await userRepo.search('42bde2f4-3659-4130-8ad8-e063a1459082')); 
    } catch (error: any) {
        console.log(pc.red('Ocurrio un error'));
        console.log(error.where as CustomError);
    }
}

async function main() {
    try {/* 
        await ProposalRepo.insert({
            title: 'test',
            topicIds: [1, 2],
            abstract: 'lorem ipsum dolor sit amet consectetur adipisicing elit sed. Lorem ipsum dolor sit amet consectetur adipisicing elit sed.',
            estimatedDuration: 100,
            streamed: false,
            eventId: '570944ff-4c94-4071-b028-22f230a50182',
            candidateId: '5e063705-757d-407d-a3f2-f0ebda3d2084',
            statusId: 1,
            attachmentsIds: []
        }) */
       await ProposalRepo.delete(1);
        
    } catch (error: any) {
        console.log(pc.red('Ocurrio un error'));
        console.log(error);
        console.log(error.where as CustomError);
    }
}

main();
