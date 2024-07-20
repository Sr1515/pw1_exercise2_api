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
}

export default new TechnologyRepository()