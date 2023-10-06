import React, { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    Swal.fire('Please verify OTP')
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) {
      navigate("/Login");
      return;
    } else if (loggedInUser.isUserLoggedIn === true) {
      navigate("/dashboard");
    }
  }, []);


  // handleSubmit OTP input
  const handleSubmit = () => {
    try {
      if (otp !== "1234") {
        toast.error("Invalid Otp!");
        setOtp("");
      } else {
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        loggedInUser.isUserLoggedIn = true;

        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
        toast.success("login Successful");

        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container vh-100">
      <div className="row ">
        <div className="w-50 mx-auto">
          <h4 className="text-white">Please Enter Your Otp</h4>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            renderSeparator={<span style={{marginRight:'5px', marginLeft:'5px', color:'#d51c9a'}}>-</span>}
            renderInput={(props) => <input {...props} />}
            inputStyle={{
              border: "1px solid green",
              borderRadius: "8px",
              width: "54px",
              height: "54px",
              fontSize: "12px",
              color: "#000",
              fontWeight: "400",
              caretColor: "blue",
            }}
          />
          <button
            className="view-button p-2 mt-3 w-50"
            onClick={() => handleSubmit()}
          >
            Verify
          </button>
        </div>
      </div>

      <div className="toast-container">
        <ToastContainer limit={2} />
      </div>
    </div>
  );
};

export default Otp;
