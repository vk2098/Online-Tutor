import { render } from '@testing-library/react';
import React, {Component} from 'react'; 
import Tutors from './tutors.json'
import {useState} from 'react';
import Header from './header'
import Footer from './Footer'
import img1 from './image1.png';
import img2 from './image2.png';
import img3 from './image3.png';
import img5 from './image5.png';


function Home()
{
  
    return(
        <div>
          <Header/>
          <div className="row ">
          <div className="col-md-5">
        <br/>
        <br/>
        <br/>
       



        <div className="jumbotron jumbotron-fluid">
            <div className="container">
              <h1 className="display-4">Say hello to your private English tutor</h1>
              <p className="lead">Become fluent faster through one-on-one video chat lessons tailored to your goals.</p>
            </div>
          </div>






        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
              <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Email" aria-label="Search"/>
        <a href="signuppage.html"><button className="btn btn-outline-success" type="submit">GET STARTED</button></a>

              </form>

            </div>
          </nav>
        </div>
      




     <div className="col-md-7">
      <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={img1} className="d-block w-100" alt="..."/>
          </div>
          <div className="carousel-item">
            <img src={img2} className="d-block w-100" alt="..."/>
          </div>
          <div className="carousel-item">
            <img src={img3} className="d-block w-100" alt="..."/>
          </div>
        </div>
      </div>
    </div>

    <div className="col-md-6">
        <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={img5} className="d-block w-100" alt="..."/>
            </div>
        </div>
    </div>
  </div>
    
     
  <div className="col-md-6">
    <br/>
    <br/>
    
    <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4">English immersion from anywhere</h1>
          <p className="lead">Build English proficiency and confidence through real conversations with friendly tutors from the US, UK, Australia, and more. All you need is your device!</p>
        </div>
      </div>
      {/* {&nbsp} &nbsp &nbsp */}
              <button className="btn btn-outline-success" type="submit">START LEARNING</button>
        </div>

          
          </div>
          <Footer/>
        </div>
    );
}

export default Home;