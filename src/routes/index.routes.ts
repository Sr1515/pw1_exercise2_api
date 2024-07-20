import { Router } from "express";
import UserController from "../controllers/userController";
import checkExistsUserAccount from "../middleware/checkExistsUserAccount";
import technologyController from "../controllers/technologyController";


const routes : Router = Router()

routes.post('/users', UserController.store)
routes.post('/technologies', technologyController.store)

// routes.get('/technologies', checkExistsUserAccount, userController.getUserTechnologies)
// routes.put('/technologies/:id', checkExistsUserAccount, userController.updateTechnology)
// routes.patch('/technologies/:id/studied', checkExistsUserAccount, userController.updateTechnologyState)
// routes.delete('/technologies/:id', checkExistsUserAccount, userController.deleteTechnology)

export default routes