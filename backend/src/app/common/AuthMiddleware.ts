import { AuthService } from "@/app/common/AuthService"
import pc from "picocolors";
export const authMiddeleware = (req: any, res: any, next: any) => {
    if (!req.headers.authorization) return res.status(401).json({ message: 'Unauthorized' })
    const token = req.headers.authorization.split(' ')[1]
    if (!token) return res.status(401).json({ message: 'Unauthorized' })
    const user = AuthService.validateToken(token)
    console.log(pc.green(JSON.stringify(user)));
    req.app.locals.user = user
    next()
}