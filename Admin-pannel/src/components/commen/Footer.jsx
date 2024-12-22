import React from 'react'

const Footer = () => {
  return (
    <div className='w-full flex  justify-between py-2 items-center shadow-sm font-semibold px-10 fixed bottom-0 left-0 bg-white'>
        <div className="w-[30%] flex gap-2">
            <h2>Privacy Policy </h2>
            <h2> Terms of Use</h2>
        </div>
        <div className="w-[50%] flex gap-2 text-[14px] justify-end">
            <h3>© 2024 BookVault with</h3>
            <h3>❤️</h3>
            <h3>By IQONIC Design.</h3>
        </div>
      
    </div>
  )
}

export default Footer
