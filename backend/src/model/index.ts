import { EventRepo } from "@/model/Event/repository";
import { PrismaClient } from "@prisma/client";

async function main() {
  
  // Inicializa PrismaClient
  const prisma = new PrismaClient();
  
  async function testEventRepositoryMethods() {
      // Crea una instancia de EventRepo
      const eventRepo = new EventRepo(prisma);
  
      // Insertar evento
      const newEvent = {
          name: 'Evento de prueba',
          url: 'https://example.com/evento-prueba',
          startingDate: new Date(),
          endingDate: new Date(new Date().getTime() + 86400000), // Fecha de finalización 1 día después
          timezone: 'UTC',
          typeId: 1, // Asumiendo que existe un tipo de evento con ID 1
          proposalsStartingDate: new Date(),
          proposalsEndingDate: new Date(new Date().getTime() + 86400000),
          description: 'Descripción del evento de prueba.',
          bannerUrl: 'https://example.com/banner.jpg',
          location: null,
          organizers: ['5e063705-757d-407d-a3f2-f0ebda3d2084', 'b40bcf8a-4bfd-426f-9cd5-8d1448b397e4'] // Puedes agregar IDs de organizadores aquí si es necesario
      };
      await eventRepo.insert(newEvent);
      console.log('Evento insertado:', newEvent);
  
      // Buscar evento por ID
      const foundEvent = await eventRepo.search('7fa1dcf7-fece-4b56-82c9-018c3204b2ad');
      console.log('Evento encontrado:', foundEvent);
  
      // Listar todos los eventos
      const allEvents = await eventRepo.listAll();
      console.log('Todos los eventos:', allEvents);
  
      // Actualizar evento (asumiendo que el evento existe)
      const updateData = {
          description: 'Actualizada la descripción del evento.'
      };
      await eventRepo.update({ id: '7fa1dcf7-fece-4b56-82c9-018c3204b2ad', input: updateData });
      console.log('Evento actualizado:', updateData);
  
      // Eliminar evento (asumiendo que el evento existe)
      await eventRepo.delete('7fa1dcf7-fece-4b56-82c9-018c3204b2ad');
      console.log('Evento eliminado.');
  }
  
  testEventRepositoryMethods()
      .then(() => console.log('Pruebas completadas.'))
      .catch(error => console.error('Error durante las pruebas:', error.where));
}

main();
