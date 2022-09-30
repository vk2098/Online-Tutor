
import React, {Component} from 'react'; 
import Tutors from './tutors.json'
import {useState,useEffect} from 'react';
import Home from './Home';
import Header from './header'
import Footer from './Footer'
import axios from 'axios';
import image1 from './signupimg.jpg'
import { useNavigate } from "react-router-dom";
import logo from './huge.png';



function studentsignup()
{

   // const history = useHistory()
  const [toggle, setToggle] = useState( true );
  const [signUpBody, setSignUpBody] = useState( {} );
  const [signInBody, setSignInBody] = useState( {} );

  const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')


  let navigate = useNavigate();

  useEffect( () => { }, [] );

 

function tutorregister()
{
    navigate("/signup");
}

async function registerUser(event) {
    event.preventDefault()
 
    const response = await fetch('http://localhost:3000/students/signupstudent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            email,
            password
     
        }),
    })

    const data = await response.json()

    if (data.status === 'ok') {
      navigate('/studentlogin');
    }
    else{
        alert(data.error);
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
          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
</div>
          <div >
            <br/>
               <br/>
            <div className="container">
                <div className="row">
                <div className="col">
            <img src={image1} alt="Hello" style={{height: 500+"px",width: 800+"px",marginLeft: 50+"px",marginTtop: 50+"px"}}/>
          </div>
                
               

                
                    <div className="col">

                    <form onSubmit={registerUser}>
				<input
					value={name}
					onChange={(e) => setName(e.target.value)}
					type="text"
					placeholder="Name"
				/>
				<br />
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
                <br/>

				<input type="submit" value="Register as a Student" />
<br/>
<br/>
                <h6><b>Not a Student!No problem Click here to register as a Tutor</b></h6>
                <input type="button" onClick={tutorregister }value="Register as a Tutor"/>

			</form>
		</div>
                     
                        </div>
                      
                          
                    </div>
                    </div>
                       <Footer/>
      </div>
     // </div>
    );
}


export default studentsignup;