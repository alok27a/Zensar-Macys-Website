import React from 'react'
import Input from '../../components/input/Input'
import Navbar from '../../components/navbar/Navbar'
import '../home/home.css'

function Home() {
  return (
    <>
    <div className="container">
      {/* Loading Navbar component */}
      <Navbar />
      {/* Loading Input Component */}
      <Input/>
    </div>
    </>
  )
}

export default Home