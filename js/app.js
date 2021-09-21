const criptomonedasSelect = document.querySelector('#criptomonedas');


//crear promesa
const obtenerCriptomonedas = criptomonedas => new Promise(resolve => {
    resolve(criptomonedas)
})


document.addEventListener('DOMContentLoaded', () => {
    consultarCriptomonedas()
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