const criptomonedasSelect = document.querySelector('#criptomonedas');
const monedaSelect = document.querySelector('#moneda');
const formulario = document.querySelector('#formulario');

const objBusqueda = {
    moneda: '',
    criptomoneda: ''
} 

//crear promesa
const obtenerCriptomonedas = criptomonedas => new Promise(resolve => {
    resolve(criptomonedas)
})


document.addEventListener('DOMContentLoaded', () => {
    consultarCriptomonedas()

    formulario.addEventListener('submit', submitFormulario)

    criptomonedasSelect.addEventListener('change', leerValor)
    monedaSelect.addEventListener('change', leerValor)
})


function consultarCriptomonedas(){
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

    fetch(url)
        .then(request => request.json())
        .then(res => obtenerCriptomonedas(res.Data))
        .then( criptomonedas => selectCriptomonedas(criptomonedas))
}

function selectCriptomonedas(cripto){
    cripto.forEach(moneda => {
        const {FullName, Name} = moneda.CoinInfo;
        
        const option = document.createElement('option');
        option.value = Name;
        option.textContent = FullName
    
        criptomonedasSelect.appendChild(option)
    });

}

function leerValor({target}){
    objBusqueda[target.name] = target.value
}


function submitFormulario(e){
    e.preventDefault()

    //validar
    const {moneda, criptomoneda} = objBusqueda
    if( moneda === '' || criptomoneda === '' ){
        //mostrar error
        mostrarAlerta('Todos los campos son obligatorios')
        return
    }

}

function mostrarAlerta(msg){

    //evitamos que el mensaje se muestre varias veces
    const existeError = document.querySelector('error')

    if(!existeError){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('error')
    
        divMensaje.textContent = msg
        
        formulario.appendChild(divMensaje)
    
        setTimeout( () => {
            divMensaje.remove()
        }, 3000)
    }

}
















