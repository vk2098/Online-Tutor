
import React, {Component} from 'react'; 
import Tutors from './tutors.json'
import {useState} from 'react';
import Header from './header'
import Footer from './Footer'
import image1 from './loginpage.jpg'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import  { useEffect } from 'react'
import { NavigationType, useNavigate } from "react-router-dom";
import Home from './Home';
import axios from 'axios';
import logo from './huge.png';
//  import { useNavigation } from '@react-navigation/native';
function studentsignin()
{

  const [signInBody, setSignInBody] = useState( {} );
  const [email, setEmail] = useState('')
	

  let navigate = useNavigate();

  useEffect( () => { }, [] );

  const [password, setPassword] = useState('')


 const register=()=>{
     navigate("/studentsignup");
 }

 function tutorlogin()
 {
     navigate("/login")
 }
 async function loginUser(event) {
    event.preventDefault()

    const response = await fetch('http://localhost:3000/students/signinstudent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    })

    const data = await response.json()

    if (data.status==='ok') {
        console.log({email})
        localStorage.setItem('studentemail',JSON.stringify(email));
        console.log(localStorage.getItem('studentemail'))
        alert('Login successful')
        console.log(data)
        let token = data.accesstoken;
        localStorage.setItem('token',JSON.stringify(token));
        console.log(localStorage.getItem('token'))
          localStorage.setItem('user', JSON.stringify(data));
            
        navigate("/"+`tutor/${email}`)
    } else {
        alert('Please check your username and password')
    }
}


    return(
        <div>
            <div className="container-fluid card-body-search">
    <div className="row ">
   <header className="p-3 bg-black text-white ">
        <div className="container temp">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
{  (
              <><ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 ">
                    <li ><img src={logo} height="40px" width="100px" /></li>
                    <li><a href="#" className="nav-link px-2 text-white">Home</a></li>
                    <li><a href="#" className="nav-link px-2 text-white">FAQs</a></li>
                    <li><a href="#" className="nav-link px-2 text-white">About</a></li>
                  </ul></>
            )}
          </div>
        </div>
        </header>
     </div>
     </div>

            <div className="container">
        <div className="row">
          <div className="col">
            <img src={image1} alt="..." style={{height:500+"px",width: 800+"px",marginLeft:50+"px",marginTop: 50+"px"}}/>
          </div>
          <div className="col" style={{height:500+"px",width: 800+"px",marginLeft:50+"px",marginTop: 80+"px"}}>
            <h2>Welcome back to </h2>
            <h2>Online Tutor</h2>

            <form onSubmit={loginUser}>
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					placeholder="Email"
				/>
				<br />
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					placeholder="Password"
				/>
				<br />
                <div>
				<input type="submit" value="Login as a Student" />
                &nbsp;
                
                <input type="button" value="Register" onClick={register}/>
                </div>
                 
                 <br/>
                 <br/>
                <h6><b>Not a Student? No problem! Click here to Login as a Tutor.</b></h6>
                <input type="button" onClick={tutorlogin}value="Login as a Tutor"/>

			</form>


            
              
          </div>
          
        </div>
      </div>

            <Footer/>
        </div>
    );
}

export default studentsignin;