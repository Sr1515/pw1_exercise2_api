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

    // getUserTechnologies(request: Request, response: Response) {
    //     const database = new UserDatabase(data)
    //     const { username } : { username: string} = request.headers as { username: string}
    //     const technologies = database.getUserTechnologies(username)
    //     return response.json(technologies)
    // }

    // createTechnology(request: Request, response: Response) {
    //     const database = new UserDatabase(data)
    //     const { username} : { username: string } = request.headers as { username: string}
    //     const { title, deadline} : { title: string, deadline: string} = request.body

    //     if(new Date(deadline) < new Date()) {
    //         return response.status(400).json({error: "Data inválida"})
    //     }

    //     const technology: Technology = {
    //         id: v4(),
    //         title,
    //         deadline: new Date(deadline),
    //         created_at: new Date(),
    //         studied: false
    //     } 

    //     database.addTechnology(username, technology)
    //     response.status(201).json(database.getUserTechnologies(username))
    // }

    // updateTechnology(request: Request, response: Response) {
    //     const database = new UserDatabase(data)
    //     const { username } : { username: string } = request.headers as { username: string } 
    //     const { title, deadline } : { title: string, deadline: string } = request.body
    //     const { id }: { id: string } = request.params as { id : string }

    //     const technologyOld = database.getTechnology(username, id)

    //     if(!technologyOld){
    //         return response.status(404).json({error: "Tecnologia não encontrada"})
    //     }

    //     if(!!deadline && new Date(deadline) < new Date()){
    //         return response.status(400).json({error: "Invalid date"})
    //     }

    //     const technologyNew: Technology = {
    //         ...technologyOld,
    //         title: !!title ? title : technologyOld.title,
    //         deadline: deadline ? new Date(deadline) : technologyOld.deadline
    //     } 


    //     const technology = database.updateTechnology(username, id, technologyNew)
    //     response.json(technology)
    // }
 
    // updateTechnologyState(request: Request, response: Response) {
    //     const database = new UserDatabase(data)
    //     const { username } : { username: string } = request.headers as { username: string } 
    //     const { id }: { id: string } = request.params as { id : string }

    //     const getTechnology = database.getTechnology(username, id)

    //     if(!getTechnology){
    //         return response.status(404).json({error: "tecnologia não encontrada"})
    //     }

    //     const newTechnology: Technology = {
    //         ...getTechnology,
    //         studied: true
    //     } 

    //     const technology = database.updateTechnology(username, id, newTechnology)
    //     response.json(technology)
        
    // }

    // deleteTechnology(request: Request, response: Response){
    //     const database = new UserDatabase(data)
    //     const { username } : { username: string } = request.headers as { username: string } 
    //     const { id }: { id: string } = request.params as { id : string }

    //     if(!database.getTechnology(username, id)){
    //         return response.status(404).json({error: "Tecnologia não encontrada"})
    //     }

    //     database.deleteTechnology(username, id)
    //     response.status(200).json(database.getUserTechnologies(username))
    // }
}

export default new UserController()