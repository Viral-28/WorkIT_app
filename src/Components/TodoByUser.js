import React, {Component} from 'react'
import { Card, ListGroup, Button, Form, NavLink } from 'react-bootstrap'
import TodoServices from '../services/todos.services';
import Loading from './Loading';
import { FacebookShareButton, FacebookIcon } from "react-share";
import { LinkedinShareButton, LinkedinIcon } from "react-share";
import './blogs.scss'

class  TodoByUser extends Component{

    constructor(props){
        super(props)
        this.state = {
            blogs:[],
            showBlogs:[],
            loading:true
        }
    }

    componentDidMount(){
        TodoServices.getAllTodos(this.props.userName).then(
            (response) => {
                console.log(response.todos)
                var fulltodos = response.todos
    
                this.setState({blogs: fulltodos, showBlogs: fulltodos})
                this.setState((currentState) => ({
                    showBlogs: currentState.blogs.filter((c) => c.userName === this.props.userName )
                }))
                this.setState({showBlogs: this.state.showBlogs.reverse(), loading:false})

                console.log('mounted')
                console.log(this.state)
            }
        )
    }

    render(){

        return(
            <div>
                <h1 className="entries">
                   Journal Entries
                </h1>
                {
                    this.state.loading === true
                    ? <Loading />
                    : this.state.showBlogs.map((post)=>{
                        return(
                            <Card className='blog-card' key = {post._id} style={{ width: '100%' }}>
                              
                                <NavLink 
                                href={`#post/${post._id}`}
                                target="_blank"
                                 ><Card.Title className="text-center blog-card-title"><h2>{post.title}</h2><Card.Subtitle className="mb-2 text-end blog-card-subtitle">{post.tag}</Card.Subtitle></Card.Title></NavLink>
                                <Card.Text className='blog-card-subtitle'>{`Author: ${post.userName}`}</Card.Text>
                               
                                
                                <Card.Text className='blog-card-text'>
                                {
                                    post.view!=='View Less ↑' && post.content.length > 200
                                    ?(post.content.slice(0,Math.min(post.content.length, 200))+'......').split("\n").map((line) => {
                                        return (
                                            <span>
                                                {line}
                                                <br />
                                            </span>
                                         )
                                    })
                                    :post.content.split("\n").map((line) => {
                                            return (
                                                <span>
                                                    {line}
                                                    <br />
                                                </span>
                                             )
                                        })
                                    }
                                </Card.Text>
                                <NavLink
                                onClick={(e)=> {
                                    this.setState( (currentState) => ({
                                        blogs: currentState.blogs.map((c)=> {
                                            if(c._id === post._id){
                                            
                                            if(c.view==='View Less ↑'){
                                                c.view='View More ↓'
                                            }
                                            else{
                                                c.view='View Less ↑'
                                            }}
                                            return c
                                        } )
                                    }))
                                }}
                                >{post.view}</NavLink>
                                
                                
                            </Card>
                        )
                    })
                }
            </div>
        )
    }
}

export default TodoByUser