import { UserApplication } from '../../application/UserApplication';
import { User } from '../../domain/User';
import { Request, Response } from 'express';

//peticion request y response
export class UserController {
    private app: UserApplication;

    constructor(app: UserApplication) {
        this.app = app;
    }

    async registerUser(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = request.body;

        try {
            //validaciones con expresiones regulares o regex
            const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:\s[A-Za-zÁÉÍÓÚáéíóúÑñ]+)?$/;

            if (!nameRegex.test(name.trim())) {
                return response.status(400).json({ message: "Nombre inavalido" });
            }
            if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email))
                return response.status(400).json({ message: "Correo electrónico no válido" });

            if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,25}$/.test(password))
                return response.status(400).json({
                    message:
                        "La contraseña debe tener al menos 6 caracteres y máximo 25, incluyendo al menos una letra y un número",
                });
            const status = 1;
            const user: Omit<User, "id"> = { name, email, password, status };
            const userId = await this.app.createUser(user);

            return response
                .status(201).json({ message: "Usuario registrado correctamente", userId });
        } catch (error) {
            if (error instanceof Error) {
                return response.status(500).json({ message: "Error en el servidor" });
            }
        }
        return response
            .status(400).json({ message: "Error" });
    }

    async searchUserById(request: Request, response: Response): Promise<Response> {
        try {
            const userId = parseInt(request.params.id);
            if (isNaN(userId))
                return response.status(400).json({ message: "Error en parárametro" });
            const user = await this.app.getUserById(userId);
            if (!user) {
                return response.status(404).json({ message: "Usuario no existe" });
            }
            return response.status(200).json(user)
        } catch (error) {
            if (error instanceof Error) {
                return response.status(500).json({ message: "Error en el servidor" });
            }
        }
        return response
            .status(400).json({ message: "Error" });
    }

    async searchUserByEmail(request: Request, response: Response): Promise<Response> {
        try {
            const { email } = (request.params);
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
                return response.status(400).json({ error: "Correo electrónico no válido" });

            const user = await this.app.getUserByEmail(email);
            if (!user) {
                return response.status(404).json({ message: "Usuario no existe" });
            }
            return response.status(200).json(user)
        } catch (error) {
            if (error instanceof Error) {
                return response.status(500).json({ message: "Error en el servidor" });
            }
        }
        return response
            .status(400).json({ message: "Error" });
    }

    async allUsers(request: Request, response: Response): Promise<Response> {
        try {
            const users = await this.app.getAllUsers();
            return response.status(200).json(users);
        } catch (error) {
            if (error instanceof Error) {
                return response.status(500).json({ message: "Error en el servidor" });
            }
        }
        return response
            .status(400).json({ message: "Error" });
    }

    async downdUser(request: Request, response: Response): Promise<Response> {
        try {
            const userId = parseInt(request.params.id);
            if (isNaN(userId))
                return response.status(400).json({ message: "Error en parárametro" });
            const user = await this.app.deleteUser(userId);
            if (!user) {
                return response.status(404).json({ message: "Usuario no existe" })
            }
            return response.status(200).json(user)
        } catch (error) {
            if (error instanceof Error) {
                return response.status(500).json({ message: "Error en el servidor" });
            }
        }
        return response
            .status(400).json({ message: "Error" });
    }

    async updateUser(request: Request, response: Response): Promise<Response> {
        try {
            const userId = parseInt(request.params.id);
            if (isNaN(userId)) return response.status(400).json({ message: "Error en parametro" });
            let { name, email, password, status } = request.body;
 
            // Validaciones antes de actualizar
            if (name && !/^[a-zA-Z\s]{3,}$/.test(name.trim()))
                return response
                    .status(400)
                    .json({
                        message:
                            "El nombre debe tener al menos 3 caracteres y solo contener letras",
                    });
 
            if (email && !/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email.trim()))
                return response.status(400).json({ message: "Correo electrónico no válido" });
 
            if (password && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,25}$/.test(password.trim()))
                return response
                    .status(400)
                    .json({
                        message:
                            "La contraseña debe tener al menos 6 caracteres, incluyendo al menos una letra y un número",
                    });
 
            status = 1;
 
            const update = await this.app.updateUser(userId, { name, email, password, status });
            if (!update) {
                return response.status(404).json({ message: "Usuario no encontrado" });
            }
            return response.status(200).json({ user: update });
 
        } catch (error) {
            if (error instanceof Error) {
                return response.status(500).json({ message: "Error en servidor" });
            }
        }
        return response.status(400).json({ message: "Error en servidor" });
    }
}