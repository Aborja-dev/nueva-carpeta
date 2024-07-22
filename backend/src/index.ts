import type { DatabaseModelType, ServerType } from "./types";


interface AppConfig {
    server: ServerType
    port: number
    model: DatabaseModelType
}

const app = async (config: AppConfig) => {
    console.log('Hello, server from Backend!');
}

(async () => {
    await app({ server: {}, port: 3000, model: {} })
})()
