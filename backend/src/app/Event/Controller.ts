import { EventControllerObject, ForCreateEventController } from "@/app/Event/types";
import { OrganizerService } from "@/app/service/OrganizerService";
import { Request, Response } from "express";

import { Router } from "express";

const router = Router();
export const createEventRouter = (repositorioes) => {
    const organizer = new OrganizerService(repositorioes.eventRepo, repositorioes.proposalRepo, repositorioes.userRepo);
    router.post('/', async (req: Request<{}, {}, ForCreateEventController>, res: Response) => {
        try {
            await organizer.createEvent(req.body);
            return res.status(201).json({ message: 'event created' });
        } catch (error: any) {
            console.log(error);
            return res.status(400).json({ message: error.message })   
        }
    });

    router.get('/:id', async (req: Request, res: Response) => {
        const id = req.params.id
        const userId = req.query.userId as string
        try {
            await organizer.setUserId(userId);
            const events = await organizer.getMyEvent(id);
            return res.status(200).json(events);
        } catch (error: any) {
            console.log(error);
            return res.status(400).json({ message: error.message })
        }
    })
    return router
};
