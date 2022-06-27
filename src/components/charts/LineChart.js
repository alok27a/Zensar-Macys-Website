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


const LineChart = () => {
    const context = useContext(userContext)
    const { usercontext } = context

    const [chart, setChart] = useState([])


    function countNumberOfPeriods() {
        //calculate time difference  
        var time_difference = usercontext.endDate.getTime() - usercontext.startDate.getTime();
        //calculate days difference by dividing total milliseconds in a day  
        var days_difference = time_difference / (1000 * 60 * 60 * 24);
        var count = days_difference % 5 + 1
        return count;
    }

    function getDatesInRange(startDate, endDate) {
        const date = new Date(startDate.getTime());

        const dates = [];

        while (date <= endDate) {
            dates.push(formatDateForChart(new Date(date)));
            date.setDate(date.getDate() + 5);
        }

        return dates;
    }

    function formatDateForAPI(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear()].join("");
    }

    function formatDateForChart(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    }

    var baseUrl = "http://127.0.0.1:8000/arima/"

    useEffect(() => {
        const fetchData = async () => {
            await fetch(`${baseUrl}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ categ: `${usercontext.category.toString()}`,s_date: formatDateForAPI(`${usercontext.startDate.toString()}`).toString(), e_date: formatDateForAPI(`${usercontext.endDate.toString()}`).toString() })
            }).then((response) => {
                response.json().then((json) => {
                    setChart(JSON.parse(json)["Priority_Forecast"])
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
            label: `Priority Forecast`,
            data: Object.values(chart),
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
            pointStyle: 'star',
            pointBorderColor: 'blue',
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
                height={255}
            />

        </>
    )
}

export default LineChart