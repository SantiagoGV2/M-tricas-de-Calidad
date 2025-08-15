import { Request, Response, NextFunction } from "express";


export const validateUserUpdate = (request: Request, response: Response, next: NextFunction) => {
  const name = request.body.name?.trim();
  const email = request.body.email?.trim();
  const password = request.body.password?.trim();

  if (name && !/^[a-zA-Z\s]{3,}$/.test(name)) {
    return response.status(400).json({  message:
                            "El nombre debe tener al menos 3 caracteres y solo contener letras", 
                        });
  }

  if (email && !/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    return response.status(400).json({ message: "Correo electrónico no válido" });
  }

  if (password && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password)) {
    return response.status(400).json({
      message:
        "La contraseña debe tener al menos 6 caracteres, incluyendo al menos una letra y un número",
    });
  }

  next();
}
