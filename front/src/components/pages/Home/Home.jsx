import React from 'react'
import { useNavigate } from 'react-router-dom'
import Slide from '../../features/Home/Slide'

const Home = () => {

  const navigate = useNavigate()

    return (
        <>
          <div className='freespace'>freespace</div>

          <div
            className="testbanner"
            onClick={() => {
              navigate("/test");
            }}
            style={{ textAlign: "center" }}
          >
            <img
              src="/public/img/Test.png"
              alt="Test Image"
              style={{ width: "50%", height: "100%", margin: "auto" }}
            />
          </div>
          <Slide></Slide>
          <div className='freespace'>freespace</div>
          <div className='trendbanner'>trend banner</div>
          <div className='freespace'>freespace</div>
          <div className='introbanner'>intro banner</div>
          <div className='freespace'>freespace</div>
          <div className='footer'>footer</div>
        </>
    )
}

export default Home