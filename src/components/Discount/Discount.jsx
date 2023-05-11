import React from 'react'

const Discount = () => {
  return (
    <div id="discount" className='bg-black text-white py-[1em] flex justify-center'>
        <marquee className='blink' behavior='scroll' scrollamount='3'><p className='font-semibold text-[10px]'>Free standard shipping above P5000 order</p></marquee>
    </div>
  )
}

export default Discount