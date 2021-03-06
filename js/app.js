const criptomonedasSelect = document.querySelector('#criptomonedas');
const monedaSelect = document.querySelector('#moneda');
const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');

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

    consultarApi()

}

function mostrarAlerta(msg){

    //evitamos que el mensaje se muestre varias veces
    const existeError = document.querySelector('.error')

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


function consultarApi(){
    const { criptomoneda, moneda } = objBusqueda

    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

    //mostrar spinner
    mostrarSpinner()

    fetch(url)
        .then( req => req.json() )
        .then(res => {
            mostrarCotizacionHTML(res.DISPLAY[criptomoneda][moneda])
        })
}


function mostrarCotizacionHTML(cotizacion){
    limpiarHTML()
    
    const {PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE} = cotizacion;

    const precio = document.createElement('p');
    precio.classList.add('precio');
    precio.innerHTML = `El precio es <span>${PRICE}</span>`;

    const precioAlto = document.createElement('p')
    precioAlto.innerHTML = `Precio m??s alto del dia <span>${HIGHDAY}</span>`

    const precioBajo = document.createElement('p')
    precioBajo.innerHTML = `Precio m??s bajo del dia <span>${LOWDAY}</span>`

    const ultimasHoras = document.createElement('p')
    ultimasHoras.innerHTML = `Variacion ultimas 24 horas <span>${CHANGEPCT24HOUR}%</span>`

    const ultimaActualizacion = document.createElement('p')
    ultimaActualizacion.innerHTML = `Ultima actualizaci??n <span>${LASTUPDATE}</span>`

    resultado.appendChild(precio)
    resultado.appendChild(precioAlto)
    resultado.appendChild(precioBajo)
    resultado.appendChild(ultimasHoras)
    resultado.appendChild(ultimaActualizacion)
}

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}


function mostrarSpinner(){
    limpiarHTML();

    const spinner = document.createElement('div')
    spinner.classList.add('spinner')

    spinner.innerHTML = `
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
    `
    resultado.appendChild(spinner)
}








