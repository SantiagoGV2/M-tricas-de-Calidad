import { Router } from "express";
import { UserAdapter } from '../adapter/UserAdapter';
import { UserApplication } from "../../application/UserApplication";
import { UserController } from '../controller/UserController';
import { validateUser } from "../middleware/validateUser";
import { validateUserUpdate } from "../middleware/validateUserUpdate";

//Express
const router = Router();
//Inicializacion de capas
const userAdapter = new UserAdapter();
const userApp = new UserApplication(userAdapter);
const userController = new UserController(userApp);
//Definicion de rutas

router.post("/register", validateUser, (request, response) =>
  userController.registerUser(request, response)
);

router.put("/users/:id", validateUserUpdate, (request, response) =>
  userController.updateUser(request, response)
);

export default router;