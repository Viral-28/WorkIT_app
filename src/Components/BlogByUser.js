import React, {Component} from 'react'
import { Card, ListGroup, Button, Form, NavLink } from 'react-bootstrap'
import BlogServices from '../services/blogs.services';
import Loading from './Loading';
import { FacebookShareButton, FacebookIcon } from "react-share";
import { LinkedinShareButton, LinkedinIcon } from "react-share";
import './blogs.scss'

class  BlogByUser extends Component{

    constructor(props){
        super(props)
        this.state = {
            blogs:[],
            showBlogs:[],
            loading:true
        }
    }

    componentDidMount(){
        BlogServices.getPostByUser(this.props.userName).then(
            (response) => {
                console.log(response.posts)
                var fullblogs = response.posts
                for(const blog of fullblogs){
                    blog.commentVisibility='none'
                    blog.buttonText = 'See Comments'
                    blog.currentComment=''
                    blog.view='View More ↓'
                }
                this.setState({blogs: fullblogs, showBlogs: fullblogs})
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
                  Your Posts 
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
                                    
                                <Card.Subtitle className="mb-2 text-end blog-card-subtitle">Posted on: {post.postDate}</Card.Subtitle>
                                
                                <Card.Footer className='blog-card-footer'>
                                <Button 
                                className='btn-sm btn-comment'
                                style={localStorage.getItem("user")=== null? {display:'none'}:{display:'block'}}
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
                                            <Form.Group className="mb-3" controlId="formFirstName">
                                                <Form.Control 
                                                className='form-comment'
                                                type="text"
                                                placeholder="Write a comment"
                                                value={post.currentComment}
                                                onChange={(e)=>{
                                                    this.setState( (currentState) => ({
                                                        blogs: currentState.blogs.map((c) =>{
                                                            if(c.title === post.title) {
                                                                c.currentComment=e.target.value
                                                            }
                                                            return c
                                                        })
                                                    }))
                                                }} />
                                            </Form.Group>
                                            <Button
                                            className='btn-sm btn-reply'
                                            onClick = {(e)=>{
                                                BlogServices.addPostComment(post._id, this.props.userName,post.currentComment).then( () =>{
                                                    // window.location.reload();
                                                },error =>{
                                                    console.log('error commenr')
                                                })
                                                this.setState((currentState) => ({
                                                    blogs: currentState.blogs.map((c) =>{
                                                        if(c.title === post.title) {
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
                                </Card.Footer>
                            </Card>
                        )
                    })
                }
            </div>
        )
    }
}

export default BlogByUser