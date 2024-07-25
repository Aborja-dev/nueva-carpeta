import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export class AuthService {

    public static validateToken(token: string) {
        return jwt.verify(token, 'secret')
    }

    public static generateToken(tokenInfo: any): string {
        return jwt.sign(tokenInfo, 'secret')
    }

    public static hashPassword(password: string): string {
        return bcrypt.hashSync(password, 10)
    }

    public static comparePassword(password: string, hashPassword: string): boolean {
        return bcrypt.compareSync(password, hashPassword)
    }
}