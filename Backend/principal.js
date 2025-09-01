const prompt = require('prompt-sync')();

const textb = "Bienvenido a Creador usuario"
const textb1 = "Hasta luego..."

const texto_r1 = "¡ERROR! usuario no encontrado, reintente nuevamente: "
const texto_1 = "Ingresa rut del usuario: "
const texto_2 = "Ingrese nombre del usuario: "
const texto_3 = "Ingrese apellido del usuario: "
const texto_4 = "Desea ingresar un nuevo usuario (1), Eliminar un usuario (2), Salir (3): "
const texto_5 = "Desea ingresar un nuevo accesorio (1), Eliminar un accesorio (2), Salir(3): "
const texto_a = "Ingresa el accesorio del usuario: "
const texto_b = ""

function ver_rut (rut){
    
}
class user {
    constructor() {
        this.lista = {}
        // definimos la propiedad lista para trabajar
    }   // Hacemos un metodos o funciones dentro de esta clase
    lista_total() {
        console.log(textb)
        let op = prompt(`${texto_4}`)
        // op = operación 1
        // si es op es = 1, entonces ingresamos  al bucle
        while (op == 1 || op == 2) {
            if (op == 1) {
                let rut = prompt(`${texto_1}`)
                // definimos la variable usuario y solicitamos ingreso de datos
                let nombre = prompt(`${texto_2}`)
                let apellido = prompt (`${texto_3}`)
                // definimos la variable nivel y solicitamos ingreso de datos
                // experiencia siempre sera 0, que es el inicio
                this.lista[rut] = {}
                this.lista[rut] = ([nombre,apellido])
                // se ingresa dentro de este diccionario clave nombre del usuario, valor su nivel
                // consultamos que desea hacer
            } else if (op == 2) {
                console.log(`Estos son los usuarios ${Object.keys(this.lista)}`)
                let aeliminar = prompt(`${texto_1}`)
                while (aeliminar in Object.keys(this.lista) !== true){
                    console.log (`${texto_r1}`)
                    console.log(`Estos son los usuarios ${Object.keys(this.lista)}`)
                let aeliminar = prompt(`${texto_1}`)
                } if (aeliminar in Object.keys(this.lista)) {
                    delete this.lista[aeliminar]
                }
                } op = prompt(`${texto_4}`)
            }
        } imprimir() {
        let largo = Object.keys(this.lista)
        largo = largo.length
        if (largo > 0) {
            let c = 1
            for (let llave in this.lista) {
                console.log(`USUARIO CON RUT ${c} ${llave}, NOMBRE ${this.lista[llave][0]}, APELLIDO ${this.lista[llave][1]}, accesorios ${this.lista[llave][2]}`)
                c += 1
            }
        }
    } accesorios() {
        console.log(`Estos son los usuario ${Object.keys(this.lista)}`)
        let op = prompt(`${texto_5}`)
        // op = operación 1
        // consultamos si desea tener un nuevo ingreso
        // si es op es = 1, entonces ingresamos  al bucle
        while (op == 1 || op == 2) {
            if (op == 1) {
                let usuario = prompt(`${texto_1}`)
                if (usuario in Object.keys(this.lista)) {
                    let accesorio = prompt(`${texto_a}`)
                    this.lista[usuario] = ([accesorio])
                } else {
                    console.log(texto_r1)
                    console.log(`Estos son los usuario ${Object.keys(this.lista)}`)
                    usuario = prompt(`${texto_1}`)
                }
            } else if (op == 2) {
                console.log(`Estos son los usuario ${Object.keys(this.lista)}`)
                let usuario = prompt(`${texto_1}`)
                if (usuario in Object.keys(this.lista)) {
                    console.log(`Estos son los accesorios ${this.lista[usuario]}`)
                }
                console.log(`Estos son los usuario ${this.lista}`)
                if (llave == aeliminar) {
                    delete this.lista[llave]
                }
            } else if (op > 2) {
                console.log(textb)
            }
        }
    }
}        
const fiesta = new user()
fiesta.lista_total()
//fiesta.accesorios()
fiesta.imprimir()