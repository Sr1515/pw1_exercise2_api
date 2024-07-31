import { Technology } from "@prisma/client";
import { prisma } from "../database/prisma";

class TechnologyRepository { 

    async create(technology: Technology) {
        const newTechnology = await prisma.technology.create({
            data: {
                ...technology
            }
        })
        return newTechnology
    }

    async findAll(username: string) {
        const userTechnologies = await prisma.user.findUnique({
            where: {
                username: username
            },
            select: {
                technologies: true
            }
        });
        return userTechnologies
    }

    async update(id: string, title: string, deadline: string) {
        const updateTechnology = await prisma.technology.update({
            where: {
                id
            }, data: {
                title,
                deadline: new Date(deadline)
            }
        })
        return updateTechnology
    }

    async updateState(id: string) {
        const updateTechnology = await prisma.technology.update({
            where: {
                id
            }, data: {
                studied: true
            }
        })
        return updateTechnology
    }

    async delete(id: string) {
        await prisma.technology.delete({
            where: {
                id
            }
        })

        return
    }
} 

export default new TechnologyRepository()