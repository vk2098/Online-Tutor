import { render } from '@testing-library/react';
import React, {Component} from 'react'; 
import Tutors from './tutors.json'
import {useState} from 'react';
import Header from './header'
import Footer from './Footer'
import Card1 from './Card1';
import FavouriteList from './favouritelist';
import Scroll from './Scroll';
import Display from './Display';
import {useParams} from 'react-router-dom';


const favouritespage=()=>
{
    let {id}=useParams();
    const[word,setWord]=useState(null);
    const[click,setClick]=useState(false);
    const [img, setImg] = useState([]);

    console.log(id)
    
    if(click&&true)
    {
      return (<div><Header/>
           <Scroll/>
      <Display object={word} id={id} changeClick={click=>setClick(click)}/>
      <Footer/>
      </div>
      );
  
    }
   else 
   {
    return (
      
      <div className="App">
        
        <Header/>
        <Scroll/>
        
        <FavouriteList changeWord={word=>setWord(word)}  id={id} changeClick={click=>setClick(click)} />
        
        <Footer/>
        {/* <Home/> */}
      </div>
    );
    
  }
}
export default favouritespage;