import React from 'react'
import Countdown from 'react-countdown'

const Timer = () => {
  return (
    
        <div className="text-gray-800 m-2">
        <Countdown date={Date.now() + 1 * 60 * 1000}  />
    </div>
    
  )
}

export default Timer
