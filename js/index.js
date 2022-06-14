
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
let buttonAction = null

class AceiteProduct {
    constructor(marca, spec, precio, stock) {
        this.marca = marca,
        this.spec = spec,
        this.precio = precio,
        this.stock = stock
    }
}

// let divModal = document.getElementById('modalSuccess')
// const ModalMsg = (title, msg) => {
//     divModal.innerHTML = `
//         <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//             <div class="modal-dialog">
//                 <div class="modal-content">
//                     <div class="modal-header bg-success" style="--bs-bg-opacity: .5;">
//                         <h5 class="modal-title" id="exampleModalLabel">${title}</h5>
//                         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                     </div>
//                     <div class="modal-body bg-success" style="--bs-bg-opacity: .5;">
//                      ${msg.msg}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     `
//     let modal = new bootstrap.Modal(divModal.querySelector('.modal'))
//     modal.show()
// }

// let divAlert = document.getElementById('alerts')
// const ModalAlert = (title, msg) => {
//     divAlert.innerHTML = `
//         <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//             <div class="modal-dialog">
//                 <div class="modal-content">
//                     <div class="modal-header alert-warning">
//                         <h5 class="modal-title" id="exampleModalLabel">${title}</h5>
//                         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                     </div>
//                     <div class="modal-body alert-warning">
//                      <div class="alert alert-warning d-flex align-items-center" role="alert">
//                         <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlink:href="#exclamation-triangle-fill"/></svg>
//                         <div>
//                             ${msg.msg}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     `
//     let modal = new bootstrap.Modal(divAlert.querySelector('.modal'))
//     modal.show()
// }

// let buttonAction = null

fetch('json/aceites.json')
    .then(response => response.json())
    .then(datos => {
        let productos = [...datos]
    })


const forms = document.querySelectorAll('.needs-validation')
Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
        }
      form.classList.add('was-validated')
    }, false)
})

function allProducts() {
    fetch('json/aceites.json')
    .then(response => response.json())
    .then(datos => {
        let productos = [...datos]
        let allProductos = document.getElementById('products')
        productos.map((product) => {
            allProductos.innerHTML += `
                        <tr>
                            <th scope="row" id="producto${product.id}">${product.id}</th>
                            <td>${product.marca}</td>
                            <td>${product.spec}</td>
                            <td>${product.tipo}</td>
                            <td>$${product.precio}</td>
                            <td><button class="btn btn-primary" onclick='buy(${product.id})'>Comprar</button></td>
                        </tr>
             `
        })
        
        
    })
}

let buyes = []
const buy = (id) => {
    fetch('json/aceites.json')
    .then(response => response.json())
    .then(datos => {
        let productos = [...datos]
        let filtered = productos.filter((element) => element.id == id)
        buyes.push(filtered[0])
    })
    let productFiltered = JSON.stringify(buyes)
    sessionStorage.setItem('compra', productFiltered)
}
function myCart() {
    let gettingBuyer = JSON.parse(sessionStorage.getItem('compra'))
    let readyForToBuy = document.getElementById('buyer')
    if (readyForToBuy ?? '') {
        gettingBuyer.forEach((product) => {
            readyForToBuy.innerHTML += `
                <tr>
                    <th scope="row" id="producto${product.id}">${product.id}</th>
                    <td>${product.marca}</td>
                    <td>${product.spec}</td>
                    <td>${product.tipo}</td>
                    <td>$${product.precio}</td>
                </tr>  
            `
        })
    }
}

function endBuy() {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Felicidades Compraste tus Productos',
        showConfirmButton: false,
        timer: 1500
    })
    let readyForToBuy = document.getElementById('buyer')
    readyForToBuy.innerHTML = ''
    sessionStorage.removeItem('compra')
}



function creatProductOil() {
    if (document.getElementById('marca').value != '' && document.getElementById('spec').value != '' && document.getElementById('price').value != '' && document.getElementById('stock').value != '') {
        let marca = document.getElementById('marca').value
        let spec = document.getElementById('spec').value
        let price = document.getElementById('price').value
        let stock = document.getElementById('stock').value
        try {
            alertMsg(
                {
                    id: 'crear',
                    title: '¿Esta seguro que desea crear este componente?',
                    msg: `El componente a crear es un aceite ${marca}`,
                    conf: 'Si, Continuar',
                    cancel: 'Cancelar',
                },
                {
                    title: 'Producto Creado!',
                    msg: 'El producto fue agregado a tu inventario',
                    product: newOilProduct = new AceiteProduct(marca, spec, price, stock)
                },
                {
                    title: '¡Proceso cancelado!',
                    msg: 'El producto no se cargo en la base de datos',
                }
            )
        } catch (error) {
            
        }
    } else {
        alertIssues({
            title: 'Error al Crear Producto' ,
            msg: 'Para crear un producto debe completar todos los campos del mismo'
        })
    }
    console.log(oilList)
    document.getElementById('marca').value = ''
    document.getElementById('spec').value = ''
    document.getElementById('price').value = ''
    document.getElementById('stock').value = ''
}

function searchProductOil() {
    let productos = []
    let searchMarca = document.getElementById('marcaSearch').value
    fetch('json/aceites.json')
        .then(response => response.json())
        .then(datos => {
            productos = [...datos]
            if (searchMarca != '') {
                let filtered = productos.filter((element) => element.marca.includes(searchMarca))
                let divProductos = document.getElementById('searchedProduct')
                filtered.forEach((product) => {
                    divProductos.innerHTML += `
                        <tr>
                            <th scope="row" id="producto${product.id}">${product.id}</th>
                            <td>${product.marca}</td>
                            <td>${product.spec}</td>
                            <td>${product.tipo}</td>
                        </tr>
                    `
                })
            } else {
                console.log('Error al buscar este aceite')
            }
        })
}

const close = () => {
    let divProductos = document.getElementById('searchedProduct')
    divProductos.innerHTML = ''
}
function deleteProductOil() {
    let deleteMarca = document.getElementById('marcaDelete').value
    deleteMarca != '' ? (
        alertMsg(
            {
                id: 'eliminar',
                title: '¿Esta seguroque desea eliminar este componente?',
                msg: `El componente a crear es un aceite ${deleteMarca}`,
                conf: 'Si, Continuar',
                cancel: 'Cancelar',
            },
            {
                title: 'Producto Eliminado!',
                msg: 'El producto fue eliminado de tu inventario',
                product: oilList.splice(oilList.findIndex((element) => element.marca.includes(deleteMarca)), 1)
            },
            {
                title: '¡Proceso cancelado!',
                msg: 'El producto no dufrio modificaciones en la base de datos',
            }
            )
    ) : (
            alertIssues({
            title: 'Error al Elimnar un Producto' ,
            msg: 'Para eliminar un producto debe completar el campo del mismo'
        })
    )
}


const alertMsg = (intro, confirmation, cancel) => {

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: intro.title,
        text: intro.msg,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: intro.conf,
        cancelButtonText: intro.cancel,
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            intro.title === 'crear'? (oilList.push(confirmation.product)) : (confirmation.product)
            console.log(oilList)
            swalWithBootstrapButtons.fire(
                confirmation.title,
                confirmation.msg,
                'success'
            )
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                cancel.title,
                cancel.msg,
                'error'
            )
        }
    })
}

const alertIssues = (error) => {
    Swal.fire({
        icon: 'error',
        title: error.title ,
        text: error.msg,
    })
}

