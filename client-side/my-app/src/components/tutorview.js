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
import Moment from 'react-moment';
import 'moment-timezone';


import logo from './huge.png';
import { useNavigate } from "react-router-dom";
import moment from 'moment-timezone';
var src1="/images/";

const Tutorview=({ isNavEnabled = true } )=>
{
    let navigate = useNavigate();
    const [Tutor, setTutor] = useState([]);
    const [appointment,setAppointment]= useState([]);
    const [img, setImg] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);
    let mydate=moment().format()
    var num=1
    var count=0
    // console.log(mydate)

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
            setLoading(false);
            setImg(data[0].img);
        })
        .catch((error) => {
          console.log(error.message);
          setError(error);
          setLoading(false);

        })
      }, []);



      useEffect( () => {

        setLoading(true);
        fetch('http://localhost:3000/appointment/'+ id, {
          headers : { 
            'Content-Type': 'application/json',
             'Accept': 'application/json'
          }
        })
        .then( res => res.json() )
        .then( (data) => { 
            console.log(data);
            setAppointment(data);
            setLoading(false);
           
        })
        .catch((error) => {
          console.log(error.message);
          setError(error);
          setLoading(false);

        })
      }, []);




    let {id} = useParams();
    //console.log(id)
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
     {/* { "/images/"+img } */}
      <div className='row'>
      <div className='col-md-6'>
        <h1>DETAILS</h1>
        { Tutor.map( (tutor, id) => (
          
        <div className="card" key={ id }>
            
          <div className="card-body">
            {/* <h5 className="card-title"><Link to={`details/${video._id}`}>{video.title}</Link></h5> */}
            
            <img src={ "/images/"+img }/>
            <br/>
            <br/>
            <h6 className="card-subtitle mb-2 text-muted">Name: { tutor.name } </h6>
            <p className="card-text">Subjects:{ tutor.subject } </p>
            <p className="card-text">Working Hours:{ tutor.workinghours } </p>
            <p className="card-text">About Me:{ tutor.aboutthem } </p>
            <p className="card-text">Nationality:{ tutor.country } </p>
          </div>
        </div>
        ))}
      </div>
      <div className='col-md-4'>
      <h2> &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;Upcoming appointments</h2>
      
      {appointment.map( (appt, id) => (
        (moment().isBefore(appt.appointment))?
        (
          <div className="app" key={id}>
        <p>{num++}.&nbsp;Student Name: {appt.student}</p>
        <p>Appointment Time:{appt.appointment}</p>
        


         </div>
      ):<p hidden>{count++}</p>))
      }

<h4> &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;Total Tutoring Hours Completed:{count}</h4>

      </div>

      </div>
      <div id="footer">
      <Footer/>
      </div>
      </div>
      


             
      );
}

export default Tutorview;