import { Router } from "express";
import UserController from "../controllers/userController";
import checkExistsUserAccount from "../middleware/checkExistsUserAccount";
import technologyController from "../controllers/technologyController";

const routes : Router = Router()

routes.post('/users', UserController.store)
routes.post('/technologies', technologyController.store)
routes.get('/technologies', checkExistsUserAccount, technologyController.index)
routes.put('/technologies/:id', checkExistsUserAccount, technologyController.update)
routes.patch('/technologies/:id/studied', checkExistsUserAccount, technologyController.updateState)
routes.delete('/technologies/:id', checkExistsUserAccount, technologyController.delete)

export default routes