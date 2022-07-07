import React, { useContext } from 'react'
import {
    Chart as ChartJS,
    BarElement,
    LinearScale,
    CategoryScale,
    Legend,
    Title
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import graphContext from '../../context/graphs/graphContext';

ChartJS.register(
    Title,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
)


const BarChart = (props) => {

    const context2 = useContext(graphContext)
    const { graphcontext1, graphcontext2 } = context2


    const data = {
        labels: [`Comparison`],
        datasets: [{
            label: 'Priority Forecast',
            data: [parseFloat(graphcontext1.forcastSum)],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
            ],
            borderWidth: 1
        },
        {
            label: 'Previous Year',
            data: [parseFloat(graphcontext2.previousSum)],
            backgroundColor: [
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    };

    var options = {
        maintainAspectRatio: false,
        scales: {
        },
        legend: {
            labels: {
                fontSize: 25,
            },
        },
    }

    return (
        <div>
            <Bar
                data={data}
                height={props.height}
                // width={}
                options={options}
            />
        </div>
    )
}

export default BarChart