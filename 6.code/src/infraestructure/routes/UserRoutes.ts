import { response, Router } from "express";
import { UserAdapter } from '../adapter/UserAdapter';
import { UserApplication } from "../../application/UserApplication";
import { UserController } from '../controller/UserController';


//Express
const router = Router();
//Inicializacion de capas
const userAdapter = new UserAdapter();
const userApp = new UserApplication(userAdapter);
const userController = new UserController(userApp);
//Definicion de rutas -> endpoints -> especificacion de url

router.post("/users", async (request, response) =>{
    try {
        await userController.registerUser(request, response);
    } catch (error) {
        console.error("Error en usuario:", error);
        response.status(400).json({message: "Error al crear el usuario"});
    }
});

router.get("/users", async (request, response) =>{
    try {
        await userController.allUsers(request, response);
    } catch (error) {
        console.error("Error en usuarios:", error);
        response.status(400).json({message: "Error al obtener los usuarios"});
    }
});
router.get("/users/:id", async (request, response) =>{
    try {
        await userController.searchUserById(request, response);
    } catch (error) {
        console.error("Error en buscar el usuario:", error);
        response.status(400).json({message: "Error al obtener el usuario"});
    }
});

router.get("/users/email/:email", async (request, response) =>{
    try {
        await userController.searchUserByEmail(request, response);
    } catch (error) {
        console.error("Error en buscar el email:", error);
        response.status(400).json({message: "Error al obtener el email"});
    }
});

router.put("/usersA/:id", async (request, response) =>{
    try {
        await userController.updateUser(request, response);
    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
        response.status(400).json({message: "Error al actaualizar el usuario"});
    }
});


router.delete("/users/:id", async (request, response) =>{
    try {
        await userController.downdUser(request, response);
    } catch (error) {
        console.error("Error al dar de baja a el usuario:", error);
        response.status(400).json({message: "Error al dar de baja a el usuario"});
    }
});
export default router;