import React from 'react'
import {Card, Button, Container, Form, Row, Col} from 'react-bootstrap'
import {useState,useEffect} from 'react';
const Display=(props)=>
{ 
  const [rating, setRating] = useState('')
  const [comment,setComment] = useState('')
  const [feedback, setFeedback] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [time,setTime] = useState('');
  const[date,setDate]=useState('');
  var Total=0
  const localstorage_user = JSON.parse(localStorage.getItem('token'))
  async function givereview(event) {
    event.preventDefault()
    
    const response = await fetch('http://localhost:3000/feedback/addreview', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localstorage_user
        },
        body: JSON.stringify({
            student:props.id,
            email:props.object.email,
            rating:rating,
            comment:comment,
        }),
    })

    const data = await response.json()
    //console.log(data)


    if (data.status === 'ok') {
       alert("Feedback Added!")
    }
    else{
        alert(data.msg);
    }
}

async function passdate(e)
{
e.preventDefault()
// console.log(date+time)
var temp=date+'T'+time+':00:00Z'
const response = await fetch('http://localhost:3000/appointment/addApp', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localstorage_user
      },
      body: JSON.stringify({
          email:props.object.email,
          student:props.id,
          appointment:temp

      }),
  })

  const data = await response.json()

  if (data.status==='ok') {
      alert('Appointment Booked Successfully!')
      
  } else {
      alert('Already booked. Try other time slot or You have time conflict')
  }
console.log(temp)
}






useEffect( () => {

  setLoading(true);
  fetch('http://localhost:3000/feedback/'+props.object.email, {
    headers : { 
      'Content-Type': 'application/json',
       'Accept': 'application/json'
    }
  })
  .then( res => res.json() )
  .then( (data) => { 
      console.log(data);
      setFeedback(data);
      setLoading(false);
      
  })
  .catch((error) => {
    console.log(error.message);
    setError(error);
    setLoading(false);

  })
}, []);

if (isLoading){
  return(
    <div>Loading...</div>

  );

}
else if (error){
  return(
    <div>Error: {error.message }</div>

  );}









    return(
      <div>
    <div style={{marginLeft:80+"px"}}>
    {/* &nbsp;&nbsp;&nbsp; {console.log(props.object.img)} */}
    <br/>
    <h3 className='text-center'> <u>ABOUT {props.object.name}</u></h3>
      <button onClick={(event)=>{
                 props.changeClick(false);
               
                }}  className="btn btn-primary" >Back to tutors</button>
    <hr/>
    &nbsp;&nbsp;&nbsp;  <img src={"../images/"+props.object.img} className="card-img-top " alt="..." style={{width:20+"rem"}}/>
    <br/>
    <br/>
       <h6>Name: {props.object.name}</h6>
    <h6> Subject: {props.object.subject}</h6>
     <h6>Country:{props.object.country}</h6>
       <h6>Rating:{ Total = (feedback.reduce((temp, tutor) => temp + tutor.rating, 0)/feedback.length).toFixed(2)}</h6>
      <h6>Working Hours:{props.object.workinghours}</h6>
       <h6> About me: I am expersited in {props.object.subject} from last 5 years</h6>
       
        <label htmlFor="Appointment"><h4>Schedule Appointment:</h4></label>
<form onSubmit={passdate}> 
&nbsp;&nbsp;&nbsp;<input type="date" value={date} onChange={(e) => setDate(e.target.value)} name="date" style={{height: 38+"px"}}/>


 
  
    
        <label>
          
          <br/>
         &nbsp;&nbsp;&nbsp; <select value={time} onChange={(e) => setTime(e.target.value)}>
            <option value="09" >9AM-10AM</option>
            <option value="10">10AM-11AM</option>
            <option value="11">11AM-12PM</option>
            <option value="12">12PM-1PM</option>
            <option value="13">1PM-2PM</option>
            <option value="14">2PM-3PM</option>
            <option value="15">3PM-4PM</option>
            <option value="16">4PM-5PM</option>
            <option value="17">5PM-6PM</option>
            <option value="18">6PM-7PM</option>

            
          </select>
        </label>
        <br/>
     
  <br/>

        &nbsp;&nbsp;  <input type="submit" value="Submit" />
        
        
        
</form>
<br/>


{/* {console.log(feedback)} */}
<h2 className='text-center'>Reviews about Tutor</h2>
<hr/>
{feedback.length > 0 ? (
                            feedback.map((feedback,k) => {
                                return<> <h6 key={feedback._id}>&nbsp;&nbsp;Rating: {feedback.rating} <br /> &nbsp;&nbsp;{feedback.comment} 
                                 </h6>
                                
                                 </>
                                
                            })
                        ): ( <p> No reviews ! </p> )}




{/* {localStorage.setItem("total",res)} */}
        {/* <button onClick={(event)=>{
                 props.changeClick(false);
               
                }}  className="btn btn-primary">Back to tutors</button> */}
        
    </div>

    <h2 className='text-center'>Rate and Give Feedback!!</h2>
                    <hr />

                    <form onSubmit={givereview}>
        <div style={{marginLeft:80+"px"}}>
        <label>
          Rate on the scale of 5!!

         &nbsp;&nbsp;&nbsp; <select value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <br/>
        <label>
          Give your valuable Comments!!
          {/* <br/> */}
          &nbsp;&nbsp;&nbsp;  <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
        </label>
       
        <br/>
        <br/>
        
         <input type="submit"  value="Submit" />
        </div>
      </form>
      </div>
    
    );
}
export default Display;