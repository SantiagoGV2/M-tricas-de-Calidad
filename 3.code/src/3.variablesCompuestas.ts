//Formas de declaracion
let numeros: number[] = [1, 2,3, 4];
let frutas: string[] = ["manzana", "banana", "pera"];
let boolenos: boolean[] = [true, false, true];
let numero2: Array<number> = [1, 2, 3, 4];

type Producto = { nombre: string; precio: number }; //objetos

let catalogo: Producto[] = [

    { nombre: "Camisa", precio: 25},
    { nombre: "Pantalón", precio: 40 },
];

//Acceder a un valor 
let primero = frutas[0]; // "manzana"

//Actualizar un valor 
numeros[1] = Math.pow(2, 3); // 8
//Actualizar un valor
frutas.push("uva"); // ["manzana", "banana", "pera", "uva"]
numeros.push(5); // [1, 2, 3, 4, 5]

//Iterar 
for (let f of frutas){
    console.log(f);
}
for (let i= 0; i < numeros.length; i++) {
    console.log(numeros[i]);
}

//Tuplas
let persona: [string, number, boolean] = ["Carlos", 28, true];
let coordenada: [number, number] = [34.5, -12.8];

//Retornar varios valores
function dividir(a: number, b: number): [number, number]{
    return [Math.floor(a / b), a % b]; //cociente y residuo
}
const [cociente, residuo] = dividir(10, 3);

//Enumeraciones 
enum Color{
    Rojo,
    Verde, 
    Azul
}
let c: Color = Color.Verde;
console.log(c);

enum Estado {
    Activo = "ACTIVO",
    Inactivo = "INACTIVO",
}
console.log(Estado.Activo); // "ACTIVO"
//Objetos
let usuario: 
{
    nombre: string;
    edad: number
} = {
    nombre: "Jose",
    edad: 30 
};


/**
 * Metodos para usar con arreglos
 * push()
 * pop()
 * shitf()
 * unshift()
 * map()
 * filter()
 * find()
 * forEach()
 */
