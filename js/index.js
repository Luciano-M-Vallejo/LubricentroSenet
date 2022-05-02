let startInput;
let activeWhile = false
let creatOilProduct = false
let oilList = [
    {
        marca: 'YPF Elaion',
        spec: '15w40',
        precio: 1000,
        stock: 2
    },
    {
        marca: 'Total Quartz 7000',
        spec: '10w40',
        precio: 500,
        stock: 5
    },
    {
        marca: 'GULF Max',
        spec: '20w50',
        precio: 10000,
        stock: 1
    }
]
let newOilProduct = null

class AceiteProduct {
    constructor(marca, spec, precio, stock) {
        this.marca = marca,
        this.spec = spec,
        this.precio = precio,
        this.stock = stock
    }
}

function start() {
    activeWhile = true
    while (activeWhile) {
        startInput = prompt('Que opcion desea elegir: \n 1 - Agregar Nuevo Producto Aceite \n 2 - Indicar cantidad de Aceites del inventario \n 3 - Buscar por marca \n 4 - Eliminar Aceites \n 0 - Salir')
        if (isNaN(startInput) && startInput != '') {
            console.log('Por favor elija un menu')       
        } else {
            if (startInput == 1) {
                creatOilProduct = true
                while (creatOilProduct) {
                    startInput = prompt('Desea agregar un Aceite nuevo? S o N')
                    if (startInput != 'S' && startInput != 's' && startInput != 'N' && startInput != 'n' ) {
                        console.log('Debe ingresar una opcion')
                    } else {
                        if (startInput === 'S' || startInput === 's') {
                            newOilProduct = new AceiteProduct(
                                prompt('Ingrese Marca del Aceite'),
                                prompt('Ingrese que de especificacion posee'),
                                parseFloat(prompt('Ingrese el precio')),
                                parseInt(prompt('Declare el stock'))
                            )
                            oilList.push(newOilProduct)
                        } else {
                            creatOilProduct = false
                            console.log(oilList)
                        }
                    }
                }
            } else {
                if (startInput == 2) {
                    console.log(oilList.length)
                } else {
                    if (startInput == 3) {
                        let searchOil = prompt('Que marca de aceite desea buscar: ')
                        if (searchOil == '' ) {
                            console.log('Error al buscar este aceite')
                        } else {
                            console.log(oilList.filter((element) => element.marca.includes(searchOil)))
                        }
                    } else {
                        if (startInput == 4) {
                            let deleteOil = prompt('Que marca de aceite desea eliminar: ')
                            if (deleteOil != '') {
                                console.log(oilList)
                                // let index = oilList.indexOf(deleteOil)                                
                                // console.log(index)
                                // console.log(oilList.findIndex((element) => element.instrumento == deleteOil))
                                oilList.splice(oilList.findIndex((element) => element.marca.includes(deleteOil)), 1)
                                console.log('Se elimino el Aceite: ' + deleteOil)
                                console.log(oilList)
                            } else {
                                console.log('Error al buscar el aceite para borrar')
                            }
                        } else {
                            if (startInput == 0 ) {
                                activeWhile = false
                            }
                        } 
                    }
                }
            }
        }
    }
}