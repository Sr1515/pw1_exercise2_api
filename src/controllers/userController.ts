import { User } from "@prisma/client";
import { Request, Response } from "express";
import { v4 } from "uuid";
import userRepositories from "../repositories/userRepositories";

class UserController {

    async store(request: Request, response: Response) {
        try {
            const { name, username } : { name: string, username: string} = request.body

            const user: User = {
                id: v4(),
                name,
                username, 
            }

            await userRepositories.create(user)
            return response.status(201).json(user)
        } catch (err) {
            return response.status(400).json({erro: err})
        }
    }

}

export default new UserController()