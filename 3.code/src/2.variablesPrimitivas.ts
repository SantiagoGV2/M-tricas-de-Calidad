//Datos especiales
let dato: any = 5;
dato = "texto";
dato = true;

//unknown es un tipo más seguro que any
let valorDesconocido: unknown = "cadena";

if (typeof valorDesconocido === "string") {
    console.log(valorDesconocido.toUpperCase()); // Ahora es seguro usarlo como string

}

//Void
function saludar(): void {
    console.log("Hola");
}

//never

//Cuando una funcion lanza un error y nunca termina
function lanzarError(mensaje: string): never{
    throw new Error(mensaje);
}

//Cuando una funcion entra en un bucle infinito
function funcionInfinita(): never {
    while (true) {
        console.log("Esto nunca termina");
    }
}

//En la validacion exhaustiva de tipos (switch, if )
type Forma = "circulo" | "cuadrado";

function procesarForma(forma: Forma){
    switch (forma) {
        case "circulo":
            console.log("Es un circulo");
            break;
        case "cuadrado":
            console.log("Es un cuadrado");
            break;
        default:
            const _exhaustivo: never = forma;
            break;
    }
}