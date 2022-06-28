import React, { useState, useEffect, useContext } from 'react';
import DatePicker from 'react-date-picker';
import homeimg from '../../images/homeimg2.jpg'
import AOS from 'aos';
import 'aos/dist/aos.css';
import userContext from '../../context/users/userContext';
import { Link } from "react-router-dom";

function Input() {
  const context = useContext(userContext)
  const { setUserContext } = context;


  const [categ, setCateg] = useState("Category1");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [user, setUser] = useState({ category: "Category1", startDate: "", endDate: "" })

  useEffect(() => {
    setUser({ category: categ, startDate: startDate, endDate: endDate })
    setUserContext({ category: categ, startDate: startDate, endDate: endDate });
  }, [categ, startDate, endDate, setUserContext])


  const handleClick = (e) => {
    e.preventDefault()
    // HERE CALL TO THE CONTEXT API FOR BACKEND

    setUser({ category: "", startDate: "", endDate: "" })
  }

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <div className="input-container h-fit my-20 mx-5 sm:flex sm:flex-row sm:justify-evenly ">
        <form >
          <div className="max-w-sm max-h-max rounded shadow-lg " data-aos="fade-right">
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2 flex justify-center">Enter Your Details</div>


              <div className="flex flex-col my-5">
                <div className="text-l mb-2">Enter Your Category</div>
                <div className="xl:w-96 ">
                  <select className="form-select appearance-none block w-10/12 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example" onChange={(categ) => { setCateg(categ.target.value) }} id="category" name="category" value={categ}>
                    <option selected={true}>Click Here</option>
                    <option value="1">Category 1</option>
                    <option value="2">Category 2</option>
                    <option value="3">Category 3</option>
                  </select>
                </div>
              </div>

              <div className="start-date my-5 flex flex-col">
                <div className="text-l mb-2">Enter Start Date</div>
                <DatePicker onChange={(date) => { setStartDate(date) }} id="startDate" name="startDate" value={startDate} clearIcon={null} />
              </div>

              <div className="start-date my-5 flex flex-col">
                <div className="text-l mb-2">Enter End Date</div>
                <DatePicker onChange={(date) => { setEndDate(date) }} id="endDate" name="endDate" value={endDate} clearIcon={null} />
              </div>
            </div>
          </div>
        </form>
        {/* <img src={homeimg} className="hidden sm:block sm: w-1/2" data-aos="fade-left" /> */}
      </div>
    </>
  )
}

export default Input