import React, { useState, useEffect } from 'react';
import DatePicker from 'react-date-picker';
import homeimg from '../../images/homeimg2.jpg'
import AOS from 'aos';
import 'aos/dist/aos.css';


function Input() {
  const [value1, onChange1] = useState(new Date());
  const [value2, onChange2] = useState(new Date());

  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <div className="input-container my-20 mx-5 sm:flex sm:flex-row sm:justify-evenly ">
        <form >
          <div className="max-w-sm max-h-max rounded shadow-lg " data-aos="fade-right">
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2 flex justify-center">Enter Your Details</div>


              <div className="flex flex-col my-5">
                <div className="text-l mb-2">Enter Your Category</div>
                <div className="xl:w-96 ">
                  <select className="form-select appearance-none block w-10/12 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example ">
                    <option selected value="1">Low</option>
                    <option value="2">Medium</option>
                    <option value="3">High</option>
                  </select>
                </div>
              </div>

              <div className="start-date my-5 flex flex-col">
                <div className="text-l mb-2">Enter Start Date</div>
                <DatePicker onChange={onChange1} value={value1} />
              </div>

              <div className="start-date my-5 flex flex-col">
                <div className="text-l mb-2">Enter End Date</div>
                <DatePicker onChange={onChange2} value={value2} />
              </div>

              <div className="submit-button flex justify-center">
                <button className="bg-[#18B1C3] hover:bg-[#0B949C] active:bg-[#082948] focus:outline-none focus:ring focus:ring-violet-300 p-4 text-l font-bold rounded-xl " >
                  Display Results
                </button>
              </div>


            </div>
          </div>
        </form>
        <img src={homeimg} className="hidden sm:block sm: w-1/2" data-aos="fade-left"/>
      </div>
    </>
  )
}

export default Input