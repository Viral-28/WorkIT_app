import React, { useState, useEffect } from "react";
import "./Quotes.css";
import { Accordion, Carousel,Container, Card, Col, Button, Row, Image } from 'react-bootstrap'




const url = "https://api.quotable.io/random";

const Quotes = () => {

    
  const [quotes, setQuotes] = useState([]);

  //Fetch Quotes from API
  const getQuote = () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setQuotes(data));
  };

  useEffect(() => {
    getQuote();
  }, []);

  const getNewQuote = () => {
    getQuote();
  };

  const tweetQuote = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quotes.content} - ${quotes.author}`;
    window.open(twitterUrl, "_blank");
  };

  const { content, author } = quotes;
  return (

    <center>
    <marquee> <h4>We hope you are having a good day! Enjoy your day ahead.</h4> </marquee>

    <div className="box-centerside">
      <div className="text">
      <br></br><br></br>

        <center><p>{content}</p></center>
      </div>
      <div className="author">
        <h5>{author}</h5>

        <div className="button-container">
          <center><button className="twitter-button" onClick={tweetQuote}>
            <i className="fab fa-twitter"></i>
          </button></center>        

          <center><button onClick={getNewQuote}><center>New Quote</center></button></center>        <br></br><br></br>
          <br></br><br></br>
          
        </div>
      </div>
    </div>
    </center>
  )
}

     // cards
     
    

 
export default Quotes;
