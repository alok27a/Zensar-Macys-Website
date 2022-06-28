import React, { useContext, useState, useEffect } from 'react'
import userContext from '../../context/users/userContext'
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2'
import zoomPlugin from 'chartjs-plugin-zoom';


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

    const [chart, setChart] = useState([])


    function getDatesInRange(startDate, endDate) {
        // console.log(startDate)
        const date = new Date(startDate.getTime());
        // console.log(date)
        let i = 0
        let l;
        if (chart.history === undefined)
            l = 0;
        else
            l = chart.history.length
        const dates = [];
        // console.log("The length of l is" , l)
        while (i < l) { 
            dates.push(formatDateForChart(new Date(date)));
            date.setDate(date.getDate() + 5);
            i++
        }

        return dates;
    }

    function formatDateForAPI(str) {
        let d = new Date(str.slice(0, 4), str.slice(5, 7), parseInt(str.slice(8, 10)) - 365, 0, 0, 0, 0)
        return d;
    }
    
    function formatDateForChart(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        // console.log(date.getFullYear()-1)
        return [date.getFullYear()-1, mnth, day].join("-");
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
                    let values = ["5.5"]
                    for (let index = 0; index < json.length; index++) {
                        // console.log(json[index].Category)
                        if (json[index].Category === `${usercontext.category.toString()}`) {
                            // console.log(json[index].Priority)
                            values.push(json[index].Priority)
                        }
                    }
                    let data = { history: values }
                    // console.log(data)
                    setChart(data)
                })
            }).catch(error => {
                console.log(error)
            })
        }
        fetchData()
    }, [baseUrl, chart, usercontext.category, usercontext.endDate, usercontext.startDate])


    var data = {
        labels: getDatesInRange(new Date(formatDateForChart(`${usercontext.startDate.toString()}`)), new Date(formatDateForChart(`${usercontext.endDate.toString()}`))),
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
                width={900}
                height={props.height}
            />

        </>
    )
}

export default HistoryLineChart