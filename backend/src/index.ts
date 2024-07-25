
import { compositionPrisma } from "./model";
import type { DatabaseModelType, ServerType } from "./types";
import { createServer } from "./app";


interface AppConfig {
    server: ServerType
    port: number
    model: DatabaseModelType
}

const app = async ({ server, port, model}: AppConfig) => {
    console.log('Hello, server from Backend!');
    createServer(model)
    
}

(async () => {
    const db = await compositionPrisma()
    await app({ server: {}, port: 3000, model: db })
})()
