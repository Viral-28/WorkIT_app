import React, {Component} from 'react'
import { Card, ListGroup, Button, Form, NavLink } from 'react-bootstrap'
import { HashRouter, Route } from 'react-router-dom';
import BlogServices from '../services/blogs.services';
import SingleBlog from './SingleBlog';
import { FacebookShareButton, FacebookIcon } from "react-share";
import { LinkedinShareButton, LinkedinIcon } from "react-share";
import './blogs.scss'

class  BlogWithTag extends Component{

    constructor(props){
        super(props)
        // console.log(this.props.blogs)
        var addBlogs = this.props.blogs
        for(var blog of addBlogs){
            blog.commentVisibility='none'
            blog.buttonText = 'See Comments'
            blog.currentComment=''
            blog.view='View More ↓'
        }
        this.state = {
            blogs: addBlogs,
            tag: this.props.tag,
            selectedBlog: undefined
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.tag != this.props.tag){
            console.log(this.props.blogs)
            this.setState({blogs:this.props.blogs, tag: this.props.tag})
        }
    }

    render(){
        console.log(this.state)
        return(
            <div key={this.props.tag} style={{ 'minHeight': '100vh' }}>
                <h1>
                
                    {
                        this.props.tag!== 'All'
                        ? this.props.tag
                        :''
                    }
                
                </h1>
                {console.log(this.state.blogs)}
                {
                    this.state.selectedBlog !== undefined
                    ? <HashRouter><Route path ={`/home/${this.state.selectedBlog._id}`} component = { (props) => <SingleBlog blog={this.state.selectedBlog}/>}/></HashRouter>
                    : this.state.blogs.map((post)=>{
                        // console.log(post)
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
                                    
                                <Card.Subtitle className="mb-2 text-end blog-card-subtitle">Posted on: {post.postDate}</Card.Subtitle>
                                
                                <Card.Footer className='blog-card-footer'>
                                <Button 
                                className='btn-sm btn-comment'
                              
                                onClick={
                                    (e) => {
                                        this.setState( (currentState) => ({
                                            blogs: currentState.blogs.map( (c) =>{
                                                if(c.title === post.title) {
                                                    if(c.commentVisibility === 'block') {
                                                        c.commentVisibility='none'
                                                        c.buttonText='See Comments'
                                                    }
                                                    else {
                                                        c.commentVisibility='block'
                                                        c.buttonText='Hide Comments'
                                                    }
                                                }
                                                return c
                                            })
                                        }))
                                    }
                                }>{post.buttonText}
                                </Button>

                                <ListGroup variant="flush" style={{display:post.commentVisibility}}>
                                    {
                                        post.comments.length === 0
                                        ? <div>No comments</div>
                                        : post.comments.map((comment) => {
                                            return <ListGroup.Item className="comment-list" key ={comment._id}>
                                                <Card className="comment-card">
                                                        <Card.Subtitle className="comment-sub">
                                                            {comment.userName}
                                                        </Card.Subtitle >
                                                        <Card.Text className="comment-text">
                                                            {comment.comment}
                                                        </Card.Text>
                                                </Card>
                                            </ListGroup.Item>
                                        })
                                    }
                                        <Form className='form-tag'>
                                            <Form.Group className="mb-3" controlId="formFirstName"   style={localStorage.getItem("user")=== null? {display:'none'}:{display:'block'}}>
                                                <Form.Control 
                                                className='form-comment'
                                                type="text" 
                                                placeholder="Write a comment"
                                                value={post.currentComment}
                                                onChange={(e)=>{
                                                    this.setState( (currentState) => ({
                                                        blogs: currentState.blogs.map((c) =>{
                                                            if(c._id === post._id) {
                                                                c.currentComment=e.target.value
                                                            }
                                                            return c
                                                        })
                                                    }))
                                                }} />
                                            </Form.Group>
                                            <Button   style={localStorage.getItem("user")=== null? {display:'none'}:{display:'block'}}
                                            className='btn-sm btn-reply'
                                            onClick = {(e)=>{
                                                BlogServices.addPostComment(post._id, this.props.userName,post.currentComment).then( () =>{
                                                    // window.location.reload();
                                                },error =>{
                                                    console.log('error comment')
                                                })
                                                this.setState((currentState) => ({
                                                    blogs: currentState.blogs.map((c) =>{
                                                        if(c._id === post._id) {
                                                            c.comments = c.comments.concat([{userName:this.props.userName, comment:c.currentComment}])
                                                            console.log(c.comments)
                                                            c.currentComment=''
                                                        }
                                                        return c
                                                    })
                                                }))
                                            }}
                                            > Reply</Button>
                                        </Form>    
                                </ListGroup>

                                    < FacebookShareButton className='footer-icon' url={'http://localhost:3000/#/post/'+post._id}>
                                      <FacebookIcon size ={33} round/>
                                        </FacebookShareButton>
                                        < LinkedinShareButton className='footer-icon' url={'http://localhost:3000/#/post/'+post._id}>
                                      <LinkedinIcon  size ={33} round/>
                                        </LinkedinShareButton>
                                </Card.Footer>
                            </Card>
                        )
                    })
                }
            </div>
        )
    }
}

export default BlogWithTag