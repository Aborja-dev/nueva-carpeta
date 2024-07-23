import { PrismaClient } from "@prisma/client"

const eventTypes = [
    'PRESENCIAL',
    'VIRTUAL',
    'HYBRID'
]
const eventStatuses = [
    'BORRADOR',
    'EN_PROCESO',
    'FINALIZADO'
]
const proposalStatuses = [
    'ENVIADA',
    'EN_PROCESO',
    'PRESELECCION',
    'APROBADA',
    'RECHAZADA'
]

const userTypes = [
    'ADMIN',
    'USER',
    'ORGANIZER',
    'CANDIDATE'
]

const prisma = new PrismaClient()

const createDataObject = (dataArray: string[]) => {
    return dataArray.map((data) => ({
        name: data
    }))
}

const main = async () => {
    const eventTypeObjects = createDataObject(eventTypes)
    await prisma.eventType.createMany({
        data: eventTypeObjects
    })

    const eventStatusObjects = createDataObject(eventStatuses)
    await prisma.eventStatus.createMany({
        data: eventStatusObjects
    })

    const proposalStatusObjects = createDataObject(proposalStatuses)
    await prisma.proposalStatus.createMany({
        data: proposalStatusObjects
    })

    const userTypesObjects = createDataObject(userTypes)
    await prisma.userType.createMany({
        data: userTypesObjects
    })
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    }).finally(async () => {
        await prisma.$disconnect()
    })