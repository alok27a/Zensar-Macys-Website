import React, { useContext, useState, useEffect } from 'react'
import userContext from '../../context/users/userContext'
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2'
import zoomPlugin from 'chartjs-plugin-zoom';
import graphContext from '../../context/graphs/graphContext';


ChartJS.register(
    Title,
    Legend,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement
)
ChartJS.register(zoomPlugin)


const HistoryLineChart = (props) => {
    const context = useContext(userContext)
    const { usercontext } = context

    const context2 = useContext(graphContext)
    const { setGraphContext2 } = context2

    const [chart, setChart] = useState([])
    const [dates, setDates] = useState([])

    function formatDateForAPI(str) {
        // console.log(str)
        let d = new Date(str.slice(0, 4), str.slice(5, 7), parseInt(str.slice(8, 10)) - 365 - 29, 0, 0, 0, 0)
        return d;
    }

    function formatDatesChart(str) {
        return str.slice(0, 10)
    }


    var baseUrl = "http://localhost:5000/api/previousdata/fetchdata"

    useEffect(() => {
        const fetchData = async () => {
            await fetch(`${baseUrl}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    categ: `${usercontext.category.toString()}`,
                    s_date: formatDateForAPI(`${usercontext.startDate.toISOString()}`).toString(),
                    e_date: formatDateForAPI(`${usercontext.endDate.toISOString()}`).toString()
                })
            }).then((response) => {
                response.json().then((json) => {
                    // console.log(json)
                    // console.log(formatDateForAPI(`${usercontext.startDate.toISOString()}`).toString())
                    // console.log(formatDateForAPI(`${usercontext.endDate.toISOString()}`).toString())
                    let values = []
                    let json_dates = []
                    let sum = 0;

                    for (let index = 0; index < json.length; index++) {
                        // console.log(json[index].Category)
                        if (json[index].Category === `${usercontext.category.toString()}`) {
                            // console.log(json[index])
                            values.push(json[index].Priority)
                            sum += parseFloat(json[index].Priority)
                            json_dates.push(formatDatesChart(json[index].date))
                        }
                    }
                    let data = { history: values }
                    let data_dates = { date_values: json_dates }
                    // console.log(data)
                    setChart(data)
                    setDates(data_dates)
                    setGraphContext2({ previousSum: sum.toString() })
                })
            }).catch(error => {
                console.log(error)
            })
        }
        fetchData()
    }, [baseUrl, chart, dates, setGraphContext2, usercontext.category, usercontext.endDate, usercontext.startDate])


    var data = {
        labels: dates.date_values,
        datasets: [{
            label: `Previous Year Values`,
            data: chart.history,
            backgroundColor: [
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
            pointStyle: 'circle',
            pointBorderColor: 'black',
            pointBackgroundColor: "#ffff"
        }]
    }


    var options = {
        responsive: true,
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
                options={options}
                height={props.height}
            />

        </>
    )
}

export default HistoryLineChart