import React, {Component} from "react";
import { Nav } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { Container, Row, Col, Form,Button } from "react-bootstrap";
import { HashRouter, Route } from "react-router-dom";
import TodoByUser from "./TodoByUser";
import TodoServices from '../services/todos.services';
import './blogsWrite.scss';

class Todo extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            rowLength:2,
            heading:'',
            content:'',
            userName: localStorage.getItem("user") !== null && localStorage.getItem("user") !== undefined
            ? JSON.parse(localStorage.getItem("user")).userName
            : ''
        }
    }

    render(){

        const formSubmit = (e) =>{
            e.preventDefault()


            TodoServices.addTodo(
                this.state.heading,
                this.state.content,
                this.state.userName
                ).then( ()=>{
                    window.location.reload();
                },
                error =>{
                    console.log('error.respons')
                })

            const todo={ //add user id
                head:this.state.heading,
                content:this.state.content, 
            }
            this.props.writeTodo(todo)
            this.setState({rowLength:3,heading:'Title',content:'Write about your task',color:'grey'})

        }
        console.log(this.state)
        

        return(
            <Container>
                <Row >
                    <h2 className="d-flex justify-content-center">
                        Your Personal Space
                    </h2>
                </Row>
                <Row>
                   
                    <Col xs={12} >
                        <Form.Label><h5></h5></Form.Label>
                    </Col>
                    
                </Row>
                <Row>
                    
                    <Col xs={12} md={8}>
                        <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Control
                            style={{backgroundColor:'##FFFFFF', color:'##FFFFFF', border: '0.5px solid #002934'}}
                            as="textarea" rows={1}
                            placeholder='Title'
                            value={this.state.heading}
                            onChange={(e)=> {this.setState({heading:e.target.value})}}
                            />
                        </Form.Group>
                        </Form>
                    </Col>
                    
                </Row>
                <Row className="last-row">
                   
                    <Col xs={12} md={8}>
                    <Form onSubmit={formSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea2">
                            <Form.Control as="textarea" 
                            style={{backgroundColor:'#FFFFFF', color:'#000000', border: '0.5px solid #002934'}}
                            rows={this.state.rowLength}
                            placeholder='I am awesome...'
                            value={this.state.content}
                            onClick={(e)=>{this.setState({rowLength:10})}} 
                            onChange={(e)=> {this.setState({content:e.target.value})}}/>
                        </Form.Group>
                        {
                            this.state.heading !== '' && this.state.content !==''
                            ?<Button className="btn-post" variant="primary" type="submit">Add To Journal</Button>
                            :<Button className="btn-post" variant="primary" type="submit" disabled>Add to Journal</Button>
                        }
                    </Form>
                    </Col >
                    
                    
                </Row>
                <Row>
                  
                    <Col xs={12} md={8} className="user-blogs">
                        <TodoByUser userName={this.state.userName}/>
                    </Col>


                </Row>
                
            </Container>
        )
    }
}

export default Todo;