import React,{useContext} from 'react'
import userContext from '../../context/users/userContext'


const BarChart = () => {
    const context = useContext(userContext)
    const {usercontext} = context
  return (
    <>
    <h1>
        {usercontext.category}
    </h1>
    </>
  )
}

export default BarChart