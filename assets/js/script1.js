//import { mindicador } from 'mindicador'
var monedas = []
var monto = document.querySelector("#montoCLPZ")
var selectedMoneda = document.querySelector("#monedas")
var ResConvert = document.querySelector("#resultado")
const btnBuscar = document.querySelector("#btnBuscar")


// async function getConexion(){
//     try
//     {
//         const res = await fetch("https://mindicador.cl/api/")
//         let data = await res.json()
//         return data;
        
//     }catch(error){
//         return null;
//     }
// }

async function RenderMonedas()
{

    try{
        
        const res = await fetch("https://mindicador.cl/api/")
        var data = await res.json()   
        
    }catch(error){
        const res2 = monedas2
        data= await res2.json()
    }

    //llenar arreglo
    var html=""

    if (data!=null){
        monedas.push(data.uf)
        monedas.push(data.dolar)
        monedas.push(data.euro)

        console.log(monedas)
   
        for (let mon of monedas ) {
            html+= `<option value="${mon.codigo}">${mon.nombre}</option>`
        }
        selectedMoneda.innerHTML = html
    }            
}

RenderMonedas()

btnBuscar.addEventListener("click", () => {
    const montoinput = monto.value
    const seleccion = selectedMoneda.value;
    const nf = new Intl.NumberFormat("es-CL");
    try{

        var getId = monedas.findIndex((moneda) =>(moneda.codigo == seleccion))
        var valor = monedas[getId].valor
        
        if ((montoinput!="") && (!isNaN(montoinput))){
            resultado=  parseInt(montoinput) * valor
        }

    }catch(error){
        console.log(error)
        resultado=0; 
    }

    ResConvert.innerHTML=  nf.format(resultado)   
    }    
)

//https://api.gael.cloud/general/public/monedas

async function getMonedas() {
    const endpoint = "https://api.gael.cloud/general/public/monedas";
    const res = await fetch(endpoint);
    const monedas = await res.json();
    return monedas;
}
    

function prepararConfiguracionParaLaGrafica(monedas) {
    // Creamos las variables necesarias para el objeto de configuración
    const tipoDeGrafica = "line";
    const nombresDeLasMonedas = monedas.map((moneda) => moneda.Codigo);
    const titulo = "Monedas";
    const colorDeLinea = "red";
    const valores = monedas.map((moneda) => {
    const valor = moneda.Valor.replace(",", ".");
    return Number(valor);
    });
    const config = {
        type: tipoDeGrafica,
        data: {
        labels: nombresDeLasMonedas,
        datasets: [
            {
            label: titulo,
            backgroundColor: colorDeLinea,
            data: valores
            }
        ]
        }
    };
    return config;
}        

async function renderGrafica() {
    
    const monedas = await getMonedas();
    console.log('new arreglo ', monedas);
    const config = prepararConfiguracionParaLaGrafica(monedas);
    const chartDOM = document.getElementById("myChart");
    new Chart(chartDOM, config);
}

renderGrafica()


var monedas2 =
{
    "version": "1.7.0",
    "autor": "mindicador.cl",
    "fecha": "2022-08-04T20:00:00.000Z",
    "uf": {
        "codigo": "uf",
        "nombre": "Unidad de fomento (UF)",
        "unidad_medida": "Pesos",
        "fecha": "2022-08-04T04:00:00.000Z",
        "valor": 33455.92
    },
    "ivp": {
        "codigo": "ivp",
        "nombre": "Indice de valor promedio (IVP)",
        "unidad_medida": "Pesos",
        "fecha": "2022-08-04T04:00:00.000Z",
        "valor": 34000.48
    },
    "dolar": {
        "codigo": "dolar",
        "nombre": "Dólar observado",
        "unidad_medida": "Pesos",
        "fecha": "2022-08-04T04:00:00.000Z",
        "valor": 907.82
    },
    "dolar_intercambio": {
        "codigo": "dolar_intercambio",
        "nombre": "Dólar acuerdo",
        "unidad_medida": "Pesos",
        "fecha": "2014-11-13T03:00:00.000Z",
        "valor": 758.87
    },
    "euro": {
        "codigo": "euro",
        "nombre": "Euro",
        "unidad_medida": "Pesos",
        "fecha": "2022-08-04T04:00:00.000Z",
        "valor": 922.21
    },
    "ipc": {
        "codigo": "ipc",
        "nombre": "Indice de Precios al Consumidor (IPC)",
        "unidad_medida": "Porcentaje",
        "fecha": "2022-06-01T04:00:00.000Z",
        "valor": 0.9
    },
    "utm": {
        "codigo": "utm",
        "nombre": "Unidad Tributaria Mensual (UTM)",
        "unidad_medida": "Pesos",
        "fecha": "2022-08-01T04:00:00.000Z",
        "valor": 58772
    },
    "imacec": {
        "codigo": "imacec",
        "nombre": "Imacec",
        "unidad_medida": "Porcentaje",
        "fecha": "2022-06-01T04:00:00.000Z",
        "valor": 3.7
    },
    "tpm": {
        "codigo": "tpm",
        "nombre": "Tasa Política Monetaria (TPM)",
        "unidad_medida": "Porcentaje",
        "fecha": "2022-08-04T04:00:00.000Z",
        "valor": 9.75
    },
    "libra_cobre": {
        "codigo": "libra_cobre",
        "nombre": "Libra de Cobre",
        "unidad_medida": "Dólar",
        "fecha": "2022-08-04T04:00:00.000Z",
        "valor": 3.54
    },
    "tasa_desempleo": {
        "codigo": "tasa_desempleo",
        "nombre": "Tasa de desempleo",
        "unidad_medida": "Porcentaje",
        "fecha": "2022-06-01T04:00:00.000Z",
        "valor": 7.81
    },
    "bitcoin": {
        "codigo": "bitcoin",
        "nombre": "Bitcoin",
        "unidad_medida": "Dólar",
        "fecha": "2022-08-01T04:00:00.000Z",
        "valor": 23298.94
    }
}