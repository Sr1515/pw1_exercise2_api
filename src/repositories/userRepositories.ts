import { User } from "@prisma/client";
import { prisma } from "../database/prisma";


class UserRepository {

    async create(user: User) {
        const newUser = await prisma.user.create({
            data: {
                ...user
            }
        })
        return newUser
    }

}

export default new UserRepository()