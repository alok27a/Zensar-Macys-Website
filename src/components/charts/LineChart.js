import React, { useContext, useState, useEffect } from 'react'
import userContext from '../../context/users/userContext'
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement,Title,Legend } from 'chart.js';
import { Line } from 'react-chartjs-2'


ChartJS.register(
    Title,
    Legend,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement
)


const LineChart = () => {
    const context = useContext(userContext)
    const { usercontext } = context

    const [chart, setChart] = useState([])

    // var baseUrl = "https://api.coinranking.com/v2/coin/Qwsogvtv82FCd?timePeriod=30d"
    // var proxyUrl = "https://cors-anywhere.herokuapp.com/"
    // var apiKey = ""

    // useEffect(() => {
    //     const fetchCoins = async () => {
    //         await fetch(`${proxyUrl}${baseUrl}`, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'x-access-token': `${apiKey}`,
    //                 'Accept': 'application/json',
    //                 'Access-Control-Allow-Origin': '*'
    //             }
    //         }).then((response) => {
    //             response.text().then((json) => {
    //                 console.log(json.data)
    //                 setChart(json.data)
    //             })
    //         }).catch(error => {
    //             console.log(error)
    //         })
    //     }
    //     fetchCoins()
    // }, [baseUrl, proxyUrl, apiKey])

    const NUMBER_CFG = { count: 7, min: -100, max: 100 };
    var data = {
        labels: [`${usercontext.startDate.toString().slice(4, 10)}`, `${usercontext.endDate.toString().slice(4, 10)}`],
        datasets: [{
            label: `Details`,
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
            pointStyle:'star',
            pointBorderColor:'blue',
            pointBackgroundColor:"#ffff"
        }]
    }


    var options = {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        },
        legend: {
            labels: {
                fontSize: 26
            }
        }
    }


    return (
        <>
            <Line
                data={data}
                height={400}
                options={options}
            />

        </>
    )
}

export default LineChart