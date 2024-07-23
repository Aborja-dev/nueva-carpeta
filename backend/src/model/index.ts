import { client } from '@model/config/connection';
import { UserRepo } from './repos/UserRepo';
import { CustomError } from './ErrorHanlder';
import pc from 'picocolors';
import { UserTypes } from './types/enum';

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
    
    
}

main();
