import React, { Component } from 'react'

import video from './Aboutvideo/video.mp4';
import "./About.css";
export class About extends Component {
  render() {
    return (
        <div className='about-page'>
          <div className='about-container'>
            <br></br>
          <h1 style={{textAlign:"center"}}><b>WORK IT!!</b></h1><br></br><br></br><br></br>
          
          <center>
          <video controls="controls" autoplay="autoplay" loop="loop" style={{height:"250px",width:"630px"}} >
          <source src={video} type="video/mp4"/>
          </video>
          </center>
          <br></br><br></br>

      
          <div class="row" style={{marginTop:"25px"}}>
            <div class="small-12 small-centered large-9 columns text-center">
              <h3><u>What are we?</u></h3>
              <h5 style={{margin:"40px"}}> <b>WORK IT</b> is a super friendly website that allows the user to write their thoughts
              and post it. Work It allows user to comment on the blogs and share their thoughts. We provide the user to create notes and save it for further use.
               </h5>
            </div>
          </div>
          <div class="row">
            <div class="small-12 small-centered large-9 columns text-center">
              <h3><u>What we offer?</u></h3>
              <h5 style={{margin:"40px"}}>To help you access some self motivating quotes, post and read the blogs. We offer My Journal functionality that will be used by the 
              user to store notes. </h5>
            </div>
          </div>
          
          </div>
        </div>
    )
  }
}

export default About