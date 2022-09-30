
import { render } from '@testing-library/react';
import React, {Component} from 'react';
import Tutors from './tutors.json'
import {useState, useEffect,useParams} from 'react';
import Display from './Display';
import axios from 'axios';


const favouritelist=(props)=> {
  //let {studentemail} = useParams();
    const[searchTerm,setSearchTerm]=useState('');
    const[temp,setTemp]=useState('');
    const[click,setClick]=useState(false);
    const [tutors, setTutors] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [img, setImg] = useState([]);
    const[fav,setFav]=useState([]);
    
   
    //console.log("hi"+props.id)

   


    const removefromfavourites = async(id) =>{
      try{           
          const deleteTutor = await axios.delete(`http://localhost:3000/favouritelist/${id._id}`)        
          
      }catch (err){
          alert(err.response.data.msg)
      }
  }


  
    useEffect( () => {

        setLoading(true);
        fetch('http://localhost:3000/favouritelist/'+props.id, {
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
             <input type="text" placeholder="Search..." onChange={(event)=>{setSearchTerm(event.target.value)}}/>
             <br></br>
             <br></br>
             <div className="row">{tutors.length==0?<div className="text-center h4">Favourites Not Available</div>:""}</div>
             <h1><u>List of Your Favourite Tutors</u></h1>
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
     
              <img src={ "/images/"+tutor.img } className="card-img-top " alt="..." style={{height:15+"rem",width:15+"rem"}}/>
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

                 { <button className="btn btn-primary" onClick={(event)=>{
                  removefromfavourites(tutor)
                   }}>Remove from Favourites</button> }
              
              
              
          </div>
    </div>
 
 
 
 
             
           )})}
 
           </div>
           </div>
        );
           }
 
        


export default favouritelist;
