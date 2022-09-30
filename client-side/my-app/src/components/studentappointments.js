

import React, {Component} from 'react'; 
import Header from './header'
import Footer from './Footer'
import Moment from 'react-moment';
import 'moment-timezone';
import moment from 'moment-timezone';
import {useState,useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
const studentappointments=(props)=>
{
  
  const cancelAppt = async(id) =>{
    if(Math.abs((moment().diff(id.appointment,'hours')))>=24)
    {
    try{           
        const deleteAppt = await axios.delete(`http://localhost:3000/appointment/${id._id}`)        
        alert("Appointment Cancelled!!!")
        
    }catch (err){
        alert(err.response.data.msg)
    }
}
 else{
         alert("Cannot cancel the appointment because the appointment is within 24 hrs")
 }
}





    let count=0
    let seq=1
 
    let {id}=useParams();
    const res=id+""
    // console.log(id)

    const [appointment,setAppointment]= useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);
    useEffect( () => {

        setLoading(true);
        fetch('http://localhost:3000/appointment', {

          headers : { 
            'Content-Type': 'application/json',
             'Accept': 'application/json'
          },
        //   body:{
        //     student:id
        //   }
        })
        .then( res => res.json() )
        .then( (data) => { 
            // console.log(data);
            setAppointment(data);
            setLoading(false);
           
        })
        .catch((error) => {
          console.log(error.message);
          setError(error);
          setLoading(false);

        })
      }, []);

    return(
        <>
          <Header/>
          <div className="row">
         <div className="col-md-6">
      <h2> &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;Upcoming appointments</h2>
      <hr/>
      <div>
      {appointment.map( (appt, id) => (
          
        (moment().isBefore(appt.appointment))?
        (
            
            
          
            ((appt.student)=== res.trim())?
            (
            
          <div className="app" key={id}>
        <p>&nbsp;&nbsp;{seq++}.&nbsp;Tutor Name: {appt.email}</p>
        {/* <p>&nbsp;Student Name: {appt.student}</p> */}
        <p>&nbsp;&nbsp;Appointment Time:{appt.appointment}</p>&nbsp;&nbsp;  <button onClick={()=>{cancelAppt(appt)}}>Cancel Appointment</button>
        <br/>
        <br/>
        {console.log(appt.student)}
        
        </div>)
        : null


         
      ):((appt.student)=== res.trim())?
      (
      
    <div className="app" key={id}>
<p hidden>{count++}</p>
  </div>)
  : null))
      }
      </div>
      </div>
 <div className="col-md-6">
<h2> &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;Total Tutoring Hours Completed:{count}</h2>
<hr/>
</div>
</div>
      
          <Footer/>
        </>
    );
}

export default studentappointments;