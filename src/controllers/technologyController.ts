import { Technology } from "@prisma/client";
import { prisma } from "../database/prisma";
import { Request, Response } from "express";
import { v4 } from "uuid";
import technologyRepositories from "../repositories/technologyRepositories";

class TechnologyController {

    async store(request: Request, response: Response ) {
        try {
            const { username} : { username: string } = request.headers as { username: string}
            const { title, deadline} : { title: string, deadline: string} = request.body

            const actualyUser = await prisma.user.findUnique({
                where: {
                    username
                }
            })

            if(new Date(deadline) < new Date()) {
                return response.status(400).json({error: "invalid data"})
            }

            if(!actualyUser) {
                return response.status(400).json({error: "User not exists"})
            }

            const technology: Technology = {
                id: v4(),
                title,
                studied: false,
                deadline: new Date(deadline),
                created_at: new Date,
                authorId: actualyUser.id
            } 

            await technologyRepositories.create(technology)
            return response.status(201).json(technology)
            
        } catch (err) {
            return response.status(400).json({error: err})
        }
 
    }
}

export default new TechnologyController()