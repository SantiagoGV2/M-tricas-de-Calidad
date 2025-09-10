import { UserApplication } from '../../application/UserApplication';
import { User } from '../../domain/User';
import { Request, Response } from 'express';

const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:\s[A-Za-zÁÉÍÓÚáéíóúÑñ]+)?$/;
const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,25}$/;

function validarDatosUsuario({ name, email, password}: Partial<User>){
    if(name && !nameRegex.test(name.trim()))
        return "Nombre inválido";
    if(email && !emailRegex.test(email.trim()))
        return "Correo electrónico no válido";
    if(password && !passwordRegex.test(password.trim()))
        return "La contraseña debe tener al menos 6 caracteres y máximo 25, incluyendo al menos una letra y un número";
    return null;
}

// Helper para manejar respuestas
async function manejarRespuesta(response: Response, callback: () => Promise<any>): Promise<Response> {
    try {
        return await callback();
    } catch (error) {
        return response.status(500).json({ message: "Error en el servidor" });
    }

}

//peticion request y response
export class UserController {
    private app: UserApplication;

    constructor(app: UserApplication) {
        this.app = app;
    }

     async login(request: Request, response: Response): Promise<string | Response>{
    return manejarRespuesta(response, async () =>{
        const { email, password} = request.body;
        if(!email || !password){
            return response.status(400).json({ error: "Email y contraseña son requeridos" });
        }
        const messageErrors = validarDatosUsuario({ email, password });
        if(messageErrors) return response.status(400).json({ message: messageErrors });

        const token = await this.app.login(email, password);
        if(!token) return response.status(401).json({ error: "Invalid Credentials" });

        return response.status(200).json({ token });
    })
  }

    async registerUser(request: Request, response: Response): Promise<Response> {
        return manejarRespuesta(response, async () => {
            const { name, email, password } = request.body;
            const messageErrors = validarDatosUsuario({ name, email, password });
            if (messageErrors) return response.status(400).json({ message: messageErrors });

            const user: Omit<User, "id"> = { name, email, password, status: 1 };
            const userId = await this.app.createUser(user);

            return response.status(201).json({message: "Usuario registrado correctamente", userId });
        });
    }

    async searchUserById(request: Request, response: Response): Promise<Response> {
       return manejarRespuesta(response, async()=>{
        const userId = parseInt(request.params.id);
        if(isNaN(userId)) return response.status(400).json({ message: "ID inválido" });

        const user = await this.app.getUserById(userId);
        if(!user) return response.status(404).json({ message: "El usuario que busca no existe" });

        return response.status(200).json(user);
       });
    }

    async searchUserByEmail(request: Request, response: Response): Promise<Response> {
        return manejarRespuesta(response, async () => {
            const {email} = request.params;
            if(!emailRegex.test(email)) return response.status(400).json({ message: "Correo electrónico no válido" });

            const user = await this.app.getUserByEmail(email);
            if(!user) return response.status(404).json({ message: "El usuario que busca no existe" });

            return response.status(200).json(user);
        });
    }

    async allUsers(request: Request, response: Response): Promise<Response> {
       return manejarRespuesta(response, async () => {
            const users = await this.app.getAllUsers();
            return response.status(200).json(users);
       });
    }

    async downdUser(request: Request, response: Response): Promise<Response> {
       return manejarRespuesta(response, async () => {
            const userId = parseInt(request.params.id);
            if(isNaN(userId)) return response.status(400).json({ message: "ID inválido" });

            const user = await this.app.deleteUser(userId);
            if(!user) return response.status(404).json({ message: "El usuario no existe" });
            return response.status(200).json({ message: "Usuario dado de baja correctamente" });
       });
    }

    async updateUser(request: Request, response: Response): Promise<Response> {
        return manejarRespuesta(response, async () => {
            const userId = parseInt(request.params.id);
            if(isNaN(userId)) return response.status(400).json({ message: "ID inválido" });
            const { name, email, password } = request.body;
            const messageErrors = validarDatosUsuario({ name, email, password });
            if (messageErrors) return response.status(400).json({ message: messageErrors });

            const user = await this.app.updateUser(userId, { name, email, password, status: 1 });
            if (!user) return response.status(404).json({ message: "El usuario no existe" });

            return response.status(200).json({ message: "Usuario actualizado correctamente", user });

        });
    }
}