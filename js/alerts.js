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

export default { alertIssues, alertMsg }