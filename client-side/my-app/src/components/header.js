//import { render } from '@testing-library/react';
import React from 'react'; 
// import Tutors from './tutors.json'
// import {useState} from 'react';
// import Display from './Display';
import logo from './huge.png';
import { useNavigate } from "react-router-dom";





const Header = ( { isNavEnabled = true } ) =>
{
 var student=JSON.parse(localStorage.getItem("studentemail"));
  let navigate = useNavigate();
  function clear()
  {
    window.localStorage.clear()
    navigate("/login")
  }
    return(
<div className="container-fluid card-body-search">
    <div className="row ">

    <header className="p-3 bg-black text-white ">
        <div className="container temp">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            {/* <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
              <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"/></svg>
            </a> */}
    


  



{ isNavEnabled && (
              <><ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 ">

                    <li onClick={() => navigate("/home")}><img src={logo} height="40px" width="100px" /></li>

                    <li onClick={() => navigate("/home")} className="nav-link px-2 text-secondary">Home</li>
                    <li onClick={() => navigate("/"+`tutor/${student}`)} className="nav-link px-2 text-white">Tutors</li>
                    <li onClick={() => navigate("/"+`appointment/${student}`)} className="nav-link px-2 text-white">Appointments</li>
                    <li><a href="#" className="nav-link px-2 text-white">FAQs</a></li>
                    <li><a href="#" className="nav-link px-2 text-white">About</a></li>
                  </ul><form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                      <input type="search" className="form-control form-control-dark" placeholder="Search..." aria-label="Search" />
                    </form><div className="text-end">
                      {/* <button onClick={() => navigate("/login")} type="button" className="btn btn-outline-light me-2">Login</button> */}
                      <button onClick={() =>clear() } type="button" className="btn btn-warning">Logout</button>
                    </div></>
            )}
          </div>
        </div>
        </header>
     </div>
     </div>
     
      );
      }
      export default Header;