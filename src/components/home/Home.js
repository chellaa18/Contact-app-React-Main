import React from "react";
import Banner from "../../assets/images/banner-1.png";
import Grid1 from "../../assets/images/grid1.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6 back-linear">
          <img
            className="mt-5 ms-4 px-auto d-none d-md-block"
            src={Banner}
            height="450px"
            alt="banner"
          />
          <div className="banner-col-1">
            <img src={Grid1} height="130px" width="130px" alt="" />
          </div>
        </div>
        <div className="col-lg-6 banner-col-2 px-0 d-flex align-items-center">
          <div className="col-lg-10 position-relative">
            {/* <div className="banner-col-2">
              <img src={Grid1} height="110px" width="130px" alt="" />
            </div> */}
            <h1 className="text-white">
              Manage Your <span> Contacts </span>
              <br />
              
            </h1>
            <p className="mt-4 text-white">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae
              vitae cum natus possimus sunt pariatur, voluptates alias vero.
            </p>
            <div className="col-lg-10 mt-5">
              <button className="banner-btn-1" onClick={()=>navigate("/registration")}>Explore Now</button>
              {/* <button className="banner-btn-2">Create Nft</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
