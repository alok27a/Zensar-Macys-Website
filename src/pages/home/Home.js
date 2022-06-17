import React from 'react'
import DropdownElement from '../../components/dropdown/DropdownElement'
import Navbar from '../../components/navbar/Navbar'

function Home() {
  return (
    <>
      {/* Loading Navbar component */}
      <Navbar />
      <DropdownElement/>
    </>
  )
}

export default Home