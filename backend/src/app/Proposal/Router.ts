import { ProposalController } from "@/app/Proposal/controller";
import { OrganizerService } from "@/app/service/OrganizerService";
import { CandidateService } from "@/app/service/UserCandidate";

import express, { Request, Response } from 'express';
const router = express.Router();

// Importar el controlador
// Ajusta la ruta según donde esté ubicado tu controlador

export const createProposalRouter = (repos: any) => {
   // crear el servicio
   const service = new CandidateService(repos.eventRepo, repos.proposalRepo, repos.userRepo); 7
   const organizer = new OrganizerService(repos.eventRepo, repos.proposalRepo, repos.userRepo);
   // crear el controlador
   const controller = new ProposalController(service, organizer);
   // Definir rutas
   // crear nuevo propuesta
   router.post('/', controller.create);
   // listar todas las propuestas de un usuario
   router.get('/user/:userId', controller.listAll);
   // obtener una propuesta por id
   router.get('/:id', controller.getOne);
   // actualizar una propuesta
   
   router.put('/organizer', async (req: Request, res: Response) => {
      try {
         const role = req.query.role as string
         if (role !== 'organizer') return res.status(401).json({ message: 'Unauthorized' })
            const userId = req.query.userId as string
         const { list } = req.body
         await organizer.setUserId(userId)
         await organizer.changeProposalStatus(list)
         return res.status(200).json({ message: 'proposal updated' })
      } catch (error) {
         return res.status(400).json({ message: error })
      }
   });
   router.put('/:id', controller.update);
   router.delete('/:id', controller.delete);
   return router;

}