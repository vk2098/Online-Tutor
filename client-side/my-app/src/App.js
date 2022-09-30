import logo from './logo.svg';
import './App.css';
import React, {Component, useState} from 'react';
import Card1 from './components/Card1';
import Header from './components/header';
import Scroll from './components/Scroll';
import Footer from './components/Footer';
import Display from './components/Display';
import Home from './components/Home';
import TutorsPage from './components/TutorsPage';
import Login from './components/Login';
import Signup from './components/Signup';
import TutorView from './components/tutorview';
import TutorEdit from './components/tutoredit';
import StudentSignup from './components/studentsignup';
import StudentSignin from './components/studentsigin';
import FavouriteList from './components/favouritelist';
import FavouritePage from './components/favouritespage';
import StudentAppointments from './components/studentappointments';
import { BrowserRouter, Routes, Route } from "react-router-dom";






const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={ <Login/> } />
        <Route path="/home" exact element={ <Home /> } />
        <Route path="/tutor/:id" exact element={ <TutorsPage/> } />
        <Route path="/tutor" exact element={ <TutorsPage/>} />
        <Route path="/login" exact element={ <Login/>} />
        <Route path="/signup" exact element={ <Signup/>} />
        <Route path="/tutorview/:id" element={ <TutorView/> }></Route>
        <Route path="/tutoredit/:id" element={ <TutorEdit/> }></Route>
        <Route path="/studentsignup" element={ <StudentSignup/> }></Route>
        <Route path="/studentlogin" element={ <StudentSignin/> }></Route>
        <Route path="favouritepage/:id" element={ <FavouritePage/> }></Route>
        <Route path="appointment/:id" element={ <StudentAppointments/> }></Route>
      </Routes>
    </BrowserRouter>
  );
};


export default App;


// const[word,setWord]=useState(null);
// const[click,setClick]=useState(false);
// if(click&&true)
// {
//   return (<div><Header/>
//        <Scroll/>
//   <Display object={word} changeClick={click=>setClick(click)}/>
//   <Footer/>
//   </div>
//   );

// }
// else 
// {
// return (
//   <div className="App">
    
//     <Header/>
//     <Scroll/>
    
//     <Card1 changeWord={word=>setWord(word)} changeClick={click=>setClick(click)} />
    
//     <Footer/>
//     {/* <Home/> */}
//   </div>
// );

// }