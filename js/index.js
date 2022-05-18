let startInput;
let activeWhile = false
let creatOilProduct = false
let oilList = [
    {
        id: 1,
        marca: 'YPF Elaion',
        spec: '15w40',
        precio: 1000,
        stock: 2
    },
    {
        id: 2,
        marca: 'Total Quartz 7000',
        spec: '10w40',
        precio: 500,
        stock: 5
    },
    {
        id: 3,
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

let divModal = document.getElementById('modalSuccess')
const ModalMsg = (title, msg) => { 
    divModal.innerHTML = `
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header bg-success" style="--bs-bg-opacity: .5;">
                        <h5 class="modal-title" id="exampleModalLabel">${title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body bg-success" style="--bs-bg-opacity: .5;">
                     ${msg.msg}
                    </div>
                </div>
            </div>
        </div>
    `
    let modal = new bootstrap.Modal(divModal.querySelector('.modal'))
    modal.show()
}

let divAlert = document.getElementById('alerts')
const ModalAlert = (title, msg) => { 
    divAlert.innerHTML = `
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header alert-warning">
                        <h5 class="modal-title" id="exampleModalLabel">${title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body alert-warning">
                     <div class="alert alert-warning d-flex align-items-center" role="alert">
                        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                        <div>
                            ${msg.msg}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
    let modal = new bootstrap.Modal(divAlert.querySelector('.modal'))
    modal.show()
}

function creatProductOil() {
    if (document.getElementById('marca').value != '' && document.getElementById('spec').value != '' && document.getElementById('price').value != '' && document.getElementById('stock').value != '') {
        let marca = document.getElementById('marca').value
        let spec = document.getElementById('spec').value
        let price = document.getElementById('price').value
        let stock = document.getElementById('stock').value
        newOilProduct = new AceiteProduct(marca, spec, price, stock)
        try {
            console.log(newOilProduct ?? 'Error')
            oilList.push(newOilProduct)
            ModalMsg('Producto Creado', {msg: 'El producto se agregado exitosamente'})
        } catch (error) {
            
        }
    } else {
        ModalAlert('Error al Crear Producto', {msg: 'Para crear un producto debe completar todos los campos del mismo'})
        console.log('Para crear un producto debe completar todos los campos del mismo')
    }
    console.log(oilList)
    document.getElementById('marca').value = ''
    document.getElementById('spec').value = ''
    document.getElementById('price').value = ''
    document.getElementById('stock').value = ''
}

function searchProductOil() {
    let searchMarca = document.getElementById('marcaSearch').value
    if (searchMarca != '') {
        console.log(oilList.filter((element) => element.marca.includes(searchMarca)))
        let filtered = oilList.filter((element) => element.marca.includes(searchMarca))
        let divProductos = document.getElementById('searchedProduct')
        filtered.forEach((product, index) => {
            // marca, precio, spec] = product
            divProductos.innerHTML += `
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Marca</th>
                            <th scope="col">Especificacion</th>
                            <th scope="col">Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row" id="producto${index}">${index}</th>
                            <td>${product.marca}</td>
                            <td>${product.spec}</td>
                            <td>$${product.precio}</td>
                        </tr>
                    </tbody>
                </table>
            `
        })
    } else {
        console.log('Error al buscar este aceite')
    }
}

function deleteProductOil() {
    let deleteMarca = document.getElementById('marcaDelete').value
    deleteMarca != '' ? (
        oilList.splice(oilList.findIndex((element) => element.marca.includes(deleteMarca)), 1),
        ModalMsg('Producto Eliminado', {msg: 'Se elimino el Aceite: ' + deleteMarca}),
        console.log(oilList)
    ) : (
            console.log('Error al buscar el aceite para borrar')
    )
    // if (deleteMarca != '') {
    //     oilList.splice(oilList.findIndex((element) => element.marca.includes(deleteMarca)), 1)
    //     ModalMsg('Producto Eliminado', {msg: 'Se elimino el Aceite: ' + deleteMarca})
    //     console.log(oilList)
    // } else {
    //     console.log('Error al buscar el aceite para borrar')
    // }
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