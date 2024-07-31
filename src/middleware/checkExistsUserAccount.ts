import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";

export default async function checkExistsUserAccount(request: Request, response: Response, next: NextFunction){
        const { username } = request.headers as { username: string };
    
        const user = await prisma.user.findUnique({
          where: {
            username,
          },
        });
    
        if (!user) {
          return response.status(404).json({ error: 'User not found' });
        }

        request.body.user = user
    
        next();
 } 
