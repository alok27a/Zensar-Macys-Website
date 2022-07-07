import React from 'react'
import Input from '../../components/input/Input'
import Navbar from '../../components/navbar/Navbar'
import '../home/home.css'
import Output from '../output/Output'

function Home() {
  return (
    <>
      <div className="container flex flex-col">
        {/* Loading Navbar component */}
        <div className="navbar">
          <Navbar />
        </div>
        <div className="flex flex-col p-2 sm:flex-row">
          {/* Loading Input Component */}
          <div className="input">
            <Input />
          </div>
          <div className="output">
            <Output />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home