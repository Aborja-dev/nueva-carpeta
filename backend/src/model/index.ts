import { PrismaClient } from "@prisma/client"


export const compositionPrisma = async () => {
    const client = new PrismaClient()
    const eventRepo = new (await import('./Event/repository')).EventRepo(client)
    const userRepo = new (await import('./User/repository')).UserRepo(client)
    const proposalRepo = new (await import('./Proposal/repository')).TalkProposalRepo(client)

    const repositories = {
        event: new (await import('./Event/adapter')).EventAdapter(eventRepo),
    }
    return repositories
}

(async () => {
    const repositories = await compositionPrisma()
    const event = repositories.event

/*     await event.insert({
        name: 'Test ',
        url: 'test',
        startingDate: '2023-01-01',
        endingDate: '2023-01-01',
        type: 0,
        description: 'test',
        bannerUrl: 'test',
        location: 'test',
        timezone: 'test',
        organizers: ['5e063705-757d-407d-a3f2-f0ebda3d2084']
    })
    console.log(await event.search('570944ff-4c94-4071-b028-22f230a50182'))
    console.log(await event.listAll());
    console.log(await event.listBy(1));
    await event.update({
        id: '570944ff-4c94-4071-b028-22f230a50182',
        input: {
            description: 'updated test',
    }}) */
    await event.delete('d5c7d216-6cf0-4c62-a42e-28a0a62f1e58')
    
    
})()