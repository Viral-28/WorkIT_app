import React, {Component} from 'react'
import { Accordion, Carousel,Container, Card, Col, Button, Row } from 'react-bootstrap'
import './blogsWrite.scss';
import "./RealHome.css";

class RealHome extends Component{
    render(){
        return(
          <div style={{ 'minHeight': '100vh' }}>
            
                <Carousel>
                  <Carousel.Item>
                    <img
                      className="d-block w-100 h-20"
                      src="images/home2.jpg"
                      alt="First slide"
                    />
                    
                  </Carousel.Item>

                  <Carousel.Item>
                    <img
                      className="d-block  w-100 h-20"
                      src="images/c1.png"
                      alt="Second slide"
                    />
                  </Carousel.Item>

                </Carousel>
                

                <Container>
                
                <Row>
                
                        <Card className="home-cards">
                          {/* <Card.Img className='card-img' variant="top" src="images/foodCard.png" /> */}
                          <Card.Body className='card-body'>
                            <Card.Title>Read some Quotes and get yourself ready for the day.</Card.Title>
                            <Button className="btn-go-to" variant="primary" href="#quotes">Go to Quotes</Button>
                          </Card.Body>
                        </Card>

                        <Card className="home-cards">
                          {/* <Card.Img className='card-img' variant="top" src="images/foodCard.png" /> */}
                          <Card.Body className='card-body'>
                            <Card.Title>Want some inspiration? Go read the blogs written by the users and get yourself upgraded. Have a good day!</Card.Title>
                            <Button className="btn-go-to" variant="primary" href="#blog">Go to Blogs</Button>
                          </Card.Body>
                        </Card>

                        <Card className="home-cards">
                          {/* <Card.Img className='card-img' variant="top" src="images/foodCard.png" /> */}
                          <Card.Body className='card-body'>
                            <Card.Title>Had a long day? Get your keypad and start noting the things down in your very own journal. Happy writing!</Card.Title>
                            <Button className="btn-go-to" variant="primary" href="#todo">Go to My Journal</Button>
                          </Card.Body>
                        </Card>

                  
                  
                  </Row>
                </Container> 


            </div>
        )
    }
}

export default RealHome