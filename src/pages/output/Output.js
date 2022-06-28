import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import LineChart from '../../components/charts/LineChart'
import '../output/output.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import HistoryLineChart from '../../components/charts/HistoryLineChart';

function Output() {

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className='container flex flex-col p-4' data-aos="fade-left">
      <LineChart height={255}/>
      <Link to="/output1">
        <button type="submit" className="bg-[#F4F4F5] hover: active:bg-[#e8f0f8] focus:outline-none focus:ring focus:ring-violet-300 p-3 text-l font-bold rounded-xl w-fit text-[#6984D2]"  >
          Display In New Page
        </button>
      </Link>
      <HistoryLineChart height={255}/>
      <Link to="/output2">
        <button type="submit" className="bg-[#F4F4F5] hover: active:bg-[#e8f0f8] focus:outline-none focus:ring focus:ring-violet-300 p-3 text-l font-bold rounded-xl w-fit text-[#6984D2]"  >
          Display In New Page
        </button>
      </Link>
    </div>
  )
}

export default Output