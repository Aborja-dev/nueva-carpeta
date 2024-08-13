import { CommonService } from "@/app/service/CommonService";
import { Router } from "express";
const router = Router();
export const createUserRouter = (repos: any) => {
    const service = new CommonService(repos.userRepo);
    router.post('/register', async (req, res) => {
        const { name, email, password } = req.body
        try {
            await service.register({ name, email, password, type: 'USER' })
            res.status(201).json({ message: 'user created' })
        } catch (error) {
            return res.status(400).json({ message: error })
        }
    });
    router.post('/login', async (req, res) => {
        const { email, password } = req.body
        try {
            const user = await service.login(email, password)
            res.status(200).json(user)
        } catch (error) {
            return res.status(400).json({ message: error })
        }
    })
    return router
}




