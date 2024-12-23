import React from 'react'
import Spin from './Spin'

const Loding = ({loding,title}) => {
  return (
    <div className=" flex items-center gap-3 justify-center">
    <span>{  loding ? "please wait...":title} </span>
    {loding && <Spin/>}
    </div>
  )
}

export default Loding
