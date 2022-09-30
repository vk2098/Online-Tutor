import { render } from '@testing-library/react';
import React, {Component} from 'react';
import Tutors from './tutors.json'
import {useState} from 'react';
import Display from './Display';
import scroll1 from './cover_1.png';
import scroll2 from './cover2.jpg';


function Scroll()
{
    return(
        <div>
<div className="col-md-2"></div>
    
    
      <div className="row ">

        <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={scroll1} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src={scroll2} className="d-block w-80" alt="..." width="100%" height="500px"/>
            </div>
           
          </div>
        </div>
        </div>
        </div>
        
        );


    }
    export default Scroll;