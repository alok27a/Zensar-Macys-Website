import React from 'react'
import Input from '../../components/input/Input'
import Navbar from '../../components/navbar/Navbar'

function Home() {
  return (
    <>
      {/* Loading Navbar component */}
      <Navbar />
      {/* Loading Input Component */}
      <Input/>
    </>
  )
}

export default Home