import { render } from '@testing-library/react';
import React, {Component} from 'react'; 
import Tutors from './tutors.json'
import {useState} from 'react';
import Header from './header'
import Footer from './Footer'
import Card1 from './Card1';
import Scroll from './Scroll';
import Display from './Display';
import {useParams} from 'react-router-dom';
import { useEffect} from 'react';

import logo from './huge.png';
import { useNavigate } from "react-router-dom";
const TutorEdit=({ isNavEnabled = true } )=>
{
    let {id} = useParams();
    let navigate = useNavigate();
    const [Tutor, setTutor] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

    const [subject, setSubject] = useState('')
	const [country, setCountry] = useState('')
	const [aboutthem, setAboutthem] = useState('')
    const [workinghours, setWorkinghours] = useState('')
    const [img, setImg] = useState([]);




    const handlePhoto = (e) => {
        setImg(e.target.files[0].name);
      };





    async function registerUser(event) {
        event.preventDefault()
     
        const response = await fetch('http://localhost:3000/tutors/'+id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password,
                subject,
                workinghours,
                aboutthem,
                country,
                img
            }),
        })
    
        const data = await response.json()
    
        if (data.status === 'ok') {
          navigate("/"+`tutorview/${email}`);
        }
        else{
            alert(data.error);
        }
    }

    useEffect( () => {

        setLoading(true);
        fetch('http://localhost:3000/tutors/'+ id, {
          headers : { 
            'Content-Type': 'application/json',
             'Accept': 'application/json'
          }
        })
        .then( res => res.json() )
        .then( (data) => { 
            console.log(data);
            setTutor(data);
            setName(data[0].name);
            setEmail(data[0].email);
            setPassword(data[0].password);
            setCountry(data[0].country);
            setAboutthem(data[0].aboutthem);
            setWorkinghours(data[0].workinghours);
            setSubject(data[0].subject);
            setImg(data[0].img);
            setLoading(false);
        })
        .catch((error) => {
          console.log(error.message);
          setError(error);
          setLoading(false);

        })
      }, []);

    
    return (
        
        <div>
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

                    <li onClick={() => navigate("/")}><img src={logo} height="40px" width="100px" /></li>

                    <li onClick={() => navigate("/"+`tutoredit/${id}`)} className="nav-link px-2 text-secondary">Edit Details</li>
                    {/* <li onClick={() => navigate("/tutor")} className="nav-link px-2 text-white">View Appointments</li> */}
                
                  </ul><div className="text-end">
                      <button onClick={() => navigate("/login")} type="button" className="btn btn-outline-light me-2">Logout</button>
  
                    </div></>
            )}
          </div>
        </div>
        </header>
     </div>
     </div>
     
      
        <h1>EDIT DETAILS</h1>
        { Tutor.map( (tutor, id) => (
            
        <div className="card" key={ id }>
          <form onSubmit={registerUser}>
				<input
				 value={name}
					onChange={(e) => setName(e.target.value)}
					type="text"
					placeholder="Enter Name"
                   // defaultValue={tutor.name}
                    
				/>
				<br />
			
				
                <input
				  value={subject}
					onChange={(e) => setSubject(e.target.value)}
					type="text"
					placeholder="Enter Subjects"
                    //defaultValue={tutor.subject}
                    
				/>
				<br />
                <input
					value={workinghours}
					onChange={(e) => setWorkinghours(e.target.value)}
					type="text"
					placeholder="Enter Working Hours"
                    //defaultValue={tutor.workinghours}
                    
				/>
				<br />
                <input
					 value={aboutthem}
					onChange={(e) => setAboutthem(e.target.value)}
					type="text"
					placeholder="About You!"
                    //defaultValue={tutor.aboutthem}
				/>
				<br />
                <input
					value={country}
					onChange={(e) => setCountry(e.target.value)}
					type="text"
					placeholder="Country"
                    //defaultValue={tutor.country}
				/>
				<br />
                <h6><b>Upload the profile picture</b></h6>
                <input type="file" onChange={handlePhoto} />
<br/>
				<input type="submit" value="Update" />
			</form>
		</div>


       
        ))}
        <Footer/>
      </div>
             
      );
}

export default TutorEdit;