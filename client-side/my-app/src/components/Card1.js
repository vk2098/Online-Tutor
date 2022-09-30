// import { render } from '@testing-library/react';
import React, {Component} from 'react';
import Tutors from './tutors.json'
import {useState, useEffect,useParams} from 'react';
import Display from './Display';
import { Navigate } from 'react-router-dom';
import { NavigationType, useNavigate } from "react-router-dom";

const Card1=(props)=> {
  //let {studentemail} = useParams();
    const[searchTerm,setSearchTerm]=useState('');
    const[temp,setTemp]=useState('');
    const[click,setClick]=useState(false);
    const [tutors, setTutors] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [img, setImg] = useState([]);
    const[fav,setFav]=useState([]);
    const localstorage_user = JSON.parse(localStorage.getItem('token'))
    
    let navigate = useNavigate();
    //console.log("hi"+props.id)

    function gotofavourites()
    {
      navigate("/"+`favouritepage/${props.id}`)
    }

    async function addtofavourites(event) {
      
     // event.preventDefault()

  
      const response = await fetch('http://localhost:3000/favouritelist/addtowishlist', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'x-auth-token': localstorage_user
              
          },
          body: JSON.stringify({
             student:props.id,
            name:event.name,
            email:event.email,
            password:event.password,
            subject:event.subject,
            workinghours:event.workinghours,
            aboutthem:event.aboutthem,
            country:event.country,
            img:event.img
          }),
      })
      const data = await response.json()

    if (data.status==='ok') {
        alert('Added to favourites successfully')
        console.log(data)
        // navigate("/home")
    } else {
        alert(data.error)
    }
    
    }
  
    useEffect( () => {

        setLoading(true);
        fetch('http://localhost:3000/tutors', {
          headers : { 
            'Content-Type': 'application/json',
             'Accept': 'application/json'
          }
        })
        .then( res => res.json() )
        .then( (data) => { 
            console.log(data);
            setTutors(data);
            setLoading(false);
            setImg(data[0].img);
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

   
    
        return (
          <div>
              <br/>
              <div>
             <input type="text" placeholder="Search..." onChange={(event)=>{setSearchTerm(event.target.value)}}/> 
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button className="btn btn-primary" onClick={gotofavourites}>See My Favourites</button></div>
             <br></br>
             <br></br>
             <h1><u>List of Tutors</u></h1>
 <div className="row row-cols-1  row-cols-md-3" style={{ display: 'flex' }} >
     {tutors.filter((val)=>{
         if (searchTerm=="")
         {
             return val
         } else if (val.subject.toLowerCase().includes(searchTerm.toLowerCase())||val.name.toLowerCase().includes(searchTerm.toLowerCase()))
         {
             return val
         }
         
     }).map((tutor,id)=>{            
           return(
 
  
 
 <div className="col mb-4 card" key={id} style={{width: 16+"rem",marginLeft:8+"rem"}}>
     
              <img src={ "/images/"+tutor.img } className="card-img-top " alt="Yet to Upload" style={{height:15+"rem",width:15+"rem"}}/>
         <div className="card-body">
               <h5 className="card-title">{tutor.name}</h5>
               <p className="card-text">{tutor.subject}</p>
          
                  <button onClick={(event)=>{setClick(true)
                  setSearchTerm(tutor.Name)
                   
                 props.changeWord(tutor);
                 props.changeClick(true);
               
                }}  className="btn btn-primary">Profile</button> 
                <br/>
                <br/>

                 <button className="btn btn-primary" onClick={(event)=>{
                  addtofavourites(tutor)
                   }}>Add to Favourites</button>
              
              
              
          </div>
    </div>
 
 
 
 
             
           )})}
 
           </div>
           </div>
        );
           }
 
        


export default Card1;
