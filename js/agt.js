let mostrarag = () => {
const formulario = document.querySelector('#formulario')
const agregar = document.querySelector('#agt')

agregar.addEventListener('click', function(){
    if (formulario.style.maxHeight) {
        formulario.style.maxHeight = null
    } else {
        formulario.style.maxHeight = formulario.scrollHeight + 'px'
    }
})

}

export {mostrarag} 