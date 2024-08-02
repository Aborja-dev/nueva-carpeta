import { ProposalController } from "@/app/Proposal/controller";
import { CandidateService } from "@/app/service/UserCandidate";

import express from 'express';
const router = express.Router();

// Importar el controlador
 // Ajusta la ruta según donde esté ubicado tu controlador

 export const createProposalRouter = (repos: any) => {
    // crear el servicio
    const service = new CandidateService(repos.eventRepo, repos.proposalRepo, repos.userRepo);
    // crear el controlador
    const controller = new ProposalController(service);
    // Definir rutas
    // crear nuevo propuesta
    router.post('/', controller.create);
    // listar todas las propuestas de un usuario
    router.get('/user/:userId', controller.listAll);
    // obtener una propuesta por id
    router.get('/:id', controller.getOne);
    // actualizar una propuesta
    router.put('/:id', controller.update);

    return router;

 }
// Inicializar el controlador
// Definir rutas

// Exportar el router