import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import LineChart from '../../components/charts/LineChart'
// import '../output/output.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import HistoryLineChart from '../../components/charts/HistoryLineChart';
import BarChart from '../../components/charts/BarChart';

function Output() {

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <div className="output flex flex-col" data-aos="fade-left">
        <div className='graphs flex flex-row mx-10 ' >
          <div className="graph1 flex flex-col h-fit w-fit mx-10">
            <LineChart height={255}  />
            <Link to="/output1">
              <button type="submit" className="bg-[#F4F4F5] hover: active:bg-[#e8f0f8] focus:outline-none focus:ring focus:ring-violet-300 p-3 text-l font-bold rounded-xl w-fit text-[#6984D2]"  >
                Display In New Page
              </button>
            </Link>
          </div>
          <div className="graph2 flex flex-col h-fit w-fit mx-10">
            <HistoryLineChart height={255} />
            <Link to="/output2">
              <button type="submit" className="bg-[#F4F4F5] hover: active:bg-[#e8f0f8] focus:outline-none focus:ring focus:ring-violet-300 p-3 text-l font-bold rounded-xl w-fit text-[#6984D2]"  >
                Display In New Page
              </button>
            </Link>
          </div>

        </div>

        <div className="bar-graph h-fit w-fit mx-20">
          <BarChart height={255} />
        </div>
      </div>

    </>


  )
}

export default Output