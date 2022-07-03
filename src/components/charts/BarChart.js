import React, { useState, useEffect } from 'react'
import {
    Chart as ChartJS,

    BarElement,

} from 'chart.js';

import { Bar } from 'react-chartjs-2';

ChartJS.register(
    BarElement,
);


const BarChart = (props) => {
    const [chart, setChart] = useState({})


    var data = {
        labels: [],
        datasets: [{
            label: [],
            data: [],
            backgroundColor: [
                'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [

                'rgba(153, 102, 255, 1)'
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