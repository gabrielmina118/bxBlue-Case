import * as jwt from "jsonwebtoken"
import { config } from "dotenv"

config();

class Authenticator {

    public generateToken(input: AuthenticationData, expiresIn: string = process.env.ACCESS_TOKEN!): string {
        const token = jwt.sign(
            {
                id: input.id
            },
            process.env.JWT_KEY as string,
            {
                expiresIn
            }
        )

        return token
    }

    public getTokenData(token: string): AuthenticationData | null {
        try {
            const { id } = jwt.verify(token, process.env.JWT_KEY!) as AuthenticationData
            return { id }
        } catch (error) {
            return null
        }

    }
}

interface AuthenticationData {
    id: string
}

export default Authenticator