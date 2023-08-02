const tblValores = document.getElementById("tblValores")

function cargarDatos() {
    const grafica = document.getElementById("myChart").getContext("2d")

    axios.get("https://api.coincap.io/v2/assets").then(resultado => {
        console.log(resultado);
        //Las etiquetas de los valores obtenidos   
        const etiquetas = resultado.data.data.map(item => {
            return item.symbol.toUpperCase();
        })

        //Los valores de comparacion
        const costos = resultado.data.data.map(item => {
            return parseInt(item.priceUsd)
        })

        const myChart = new Chart(grafica, {
            type: "line",
            data: {
                labels: etiquetas,
                datasets: [
                    {
                        label: "Valor de Dolar",
                        data: costos,
                        fill: true,
                        backgroundColor: "#ccd9ff",
                        borderColor: "black"
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: "Monedas electronicas"
                    }
                },
                scales: {
                    x: {
                        display: true
                    }
                }
            }
        })


        tblValores.innerHTML = "";
        for (const valor of resultado.data.data) {
            if (parseInt(valor.priceUsd) > 100) {
                let tr = `<tr>
                <td>${valor.symbol}</td>
                <td>${valor.name}</td>
                <td>${parseInt(valor.priceUsd)}</td>
                </tr> `
                tblValores.innerHTML += tr;
            }

        }
    })

}

cargarDatos()