
import { compositionPrisma } from "./model";
import type { DatabaseModelType, ServerType } from "./types";
import { createServer } from "./app";
import pc from "picocolors";

interface AppConfig {
    server: ServerType
    port: number
    model: DatabaseModelType
}

const app = async ({ server, port, model}: AppConfig) => {

    server.listen(port, () => {
        console.log(pc.green(`[server]: Server is running at http://localhost:${port}`))
    })
}

(async () => {
    const db = await compositionPrisma()
    const expressServer = await createServer(db)
    await app({ server: expressServer, port: 3000, model: db })
})()
