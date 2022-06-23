import React from 'react'
import Input from '../../components/input/Input'
import Navbar from '../../components/navbar/Navbar'
import '../home/home.css'
import Output from '../output/Output'

function Home() {
  return (
    <>
      <div className="container">
        {/* Loading Navbar component */}
        <Navbar />
        <div className="flex flex-col p-4 justify-evenly sm:flex-row ">
          {/* Loading Input Component */}
          <Input />
          <Output />
        </div>
      </div>
    </>
  )
}

export default Home