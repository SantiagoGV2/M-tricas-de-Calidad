//Types
type Usuario ={
    nombre: string; 
    edad: number;
    activo: boolean;
};

let user1: Usuario = {
    nombre: "Laura",
    edad: 25,
    activo: true
};

//Con un primitivo
type ID = number;
let userId: ID = 101;

//Uniones
type Resultado = "ok" | "error" | "pendiente";
let estado: Resultado = "ok";

//Tuplas
type Coordenada = [x: number, y: number];
let punto: Coordenada = [10, 20 ];

//Funciones
type Sumar = (a: number, b: number) => number;
const suma: Sumar = (x, y) => x + y;

//Interfaces
interface Product {
    readonly id: number; //readonly evita que se modifique una propiedad despues de asignarla
    nombre: string; 
    precio: number;
    descuento?: number; //usa ? para indicar que una propiedad puede o no estar presente
    comprar: (cantidad: number)=> number; 
    baja: () => void;
    actualizar(): boolean;

}