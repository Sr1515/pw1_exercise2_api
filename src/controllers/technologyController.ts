import { Technology } from "@prisma/client";
import { prisma } from "../database/prisma";
import { Request, Response } from "express";
import { v4 } from "uuid";
import technologyRepositories from "../repositories/technologyRepositories";

class TechnologyController {

    async store(request: Request, response: Response ) {
        try {
            const  username : string = request.body.user.username
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
            
        } catch (error) {
            return response.status(400).json({error: error})
        }
    }

    async index(request: Request, response: Response) {
        try {
            const  username : string = request.body.user.username
            const technologies = await technologyRepositories.findAll(username)
            return response.json(technologies)
        } catch (error) {
            return response.status(404).json({error: error})
        }
    }

    async update(request: Request, response: Response) {
        try {
            const {id} : {id: string} = request.params as { id: string} 
            const { title, deadline } : {title: string, deadline: string} = request.body 

            if(!!deadline && new Date(deadline) < new Date()){
                return response.status(400).json({error: "Invalid date"})
            }

            const updateTechnology = await technologyRepositories.update(id, title, deadline)
            return response.json(updateTechnology)

        } catch (error) {
            return response.status(404).json({error: error})
        }
    }

    async updateState(request: Request, response: Response) {
        try {
            const {id} : {id: string} = request.params as {id: string}
            const updateState = await technologyRepositories.updateState(id)
            return response.json(updateState)

         } catch (error) {
            return response.status(404).json({error: error})
        }
    }

    async delete(request: Request, response: Response) {
        try {
            const {id} : {id: string} = request.params as {id: string}
            const  username : string = request.body.user.username

            await technologyRepositories.delete(id)

            const technologiesUser = await prisma.user.findMany({
                where: {
                    username
                }, select: {
                    technologies: true
                }
            })

            return response.json(technologiesUser)
        } catch (error) {
            return response.status(404).json({error: error})
        }
    } 

}

export default new TechnologyController()