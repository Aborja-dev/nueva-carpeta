import { EventControllerObject, ForCreateEventController } from "@/app/Event/types";
import { OrganizerService } from "@/app/service/OrganizerService";
import { Request, Response } from "express";

class EventosController {
    constructor(
        private readonly organizer: OrganizerService
    ) {}
    async crearEvento(req: Request<{}, ForCreateEventController, ForCreateEventController>, res: Response) {
        const input = req.body;
        try {
            await this.organizer.createEvent(input);
            // Lógica para crear un evento
            res.status(201).send('Evento creado');
        } catch (error) {
            res.status(500).send('Error al crear evento');
        }
    }

    async obtenerInformacionEvento(req: Request<unknown, EventControllerObject, {}>, res: Response) {
        const {eventId} = req.params as {eventId: string};
        const userId = req.query.user as string;
        try {
            this.organizer.setUserId(userId);
            const event = await this.organizer.getMyEvent(eventId);
            // Lógica para obtener información de un evento
            res.status(200).json(event);
        } catch (error) {
            res.status(500).send('Error al obtener información del evento');
        }
    }

    async obtenerEventosCreados(req, res) {
        try {
            const { id } = req.params;
            // Lógica para obtener eventos creados por un organizador
            res.status(200).send(`Eventos creados por el organizador ${id}`);
        } catch (error) {
            res.status(500).send('Error al obtener eventos creados');
        }
    }

    async obtenerPropuestasParaEvento(req, res) {
        try {
            const { id } = req.params;
            // Lógica para obtener propuestas de charlas para un evento
            res.status(200).send(`Propuestas de charlas para el evento ${id}`);
        } catch (error) {
            res.status(500).send('Error al obtener propuestas de charlas');
        }
    }

    async obtenerFormularioPropuesta(req, res) {
        try {
            const { id } = req.params;
            // Lógica para obtener el formulario de propuesta de charla
            res.status(200).send(`Formulario de propuesta de charla para el evento ${id}`);
        } catch (error) {
            res.status(500).send('Error al obtener formulario de propuesta');
        }
    }
}