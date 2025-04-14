import React, { Component } from "react"
import { Card, ListGroup, Button, Form, NavLink } from 'react-bootstrap'
import BlogServices from '../services/blogs.services';
import { FacebookShareButton, FacebookIcon } from "react-share";
import { LinkedinShareButton, LinkedinIcon } from "react-share";
import './blogs.scss'

class SingleBlog extends Component{
    constructor(props){
        super(props)
        this.state ={
            commentVisibility: 'none',
            buttonText: 'See Comments',
            comments:[],
            currentComment:''
        }
    }

    componentDidMount(){
        this.setState({commentVisibility: this.props.blog.commentVisibility, buttonText: this.props.blog.buttonText})
        this.setState({comments:this.props.blog.comments})
        this.setState({currentComment:this.props.blog.currentComment})
    }

    render(){
        const post = this.props.blog
        console.log(this.props.blog)
        return(
            <div>
            <Card className='blog-card' key = {post._id} style={{ width: '100%' }}>
                              
                              <NavLink 
                              href={`#post/${post._id}`}
                              target="_blank"
                               ><Card.Title className="text-center blog-card-title"><h2>{post.title}</h2><Card.Subtitle className="mb-2 text-end blog-card-subtitle">{post.tag}</Card.Subtitle></Card.Title></NavLink>
                              <Card.Text className='blog-card-subtitle'>{`Author: ${post.userName}`}</Card.Text>
                             
                              
                              <Card.Text className='blog-card-text'>
                              {
                                      post.content.split("\n").map((line) => {
                                          return (
                                              <span>
                                                  {line}
                                                  <br />
                                              </span>
                                           )
                                      })
                                  }
                              </Card.Text>
                                  
                              <Card.Subtitle className="mb-2 text-end blog-card-subtitle">Posted on: {post.postDate}</Card.Subtitle>
                              
                              <Card.Footer className='blog-card-footer'>
                              <Button 
                              className='btn-sm btn-comment'
                              style={localStorage.getItem("user")=== null? {display:'none'}:{display:'block'}}
                              onClick={
                                  (e) => {

                                    if(this.state.commentVisibility==='block'){
                                        this.setState({commentVisibility:'none', buttonText:'See Comments'})
                                    }
                                    else{
                                        this.setState({commentVisibility:'block', buttonText:'Hide Comments'})
                                    }
                                  }
                              }>{this.state.buttonText}
                              </Button>

                              <ListGroup variant="flush" style={{display:this.state.commentVisibility}}>
                                  {
                                      this.state.comments.length === 0
                                      ? <div>No comments</div>
                                      : this.state.comments.map((comment) => {
                                          console.log(comment)
                                          return <ListGroup.Item className="comment-list" key ={comment._id}>
                                              <Card className="comment-card">
                                                      <Card.Subtitle className="comment-sub">
                                                          {this.props.userName}
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
                                              value={this.props.currentComment}
                                              onChange={(e)=>{
                                                  this.setState({currentComment:e.target.value})
                                              }} />
                                          </Form.Group>
                                          <Button
                                          className='btn-sm btn-reply'
                                          onClick = {(e)=>{
                                              BlogServices.addPostComment(post._id, this.props.userName,this.props.currentComment).then( () =>{
                                                  // window.location.reload();
                                              },error =>{
                                                  console.log('error commenr')
                                              })
                                              this.setState((currentState)=>({
                                                  comments: currentState.comments.concat([{userName:this.props.userName, comment:this.props.currentComment}])
                                              }))
                                              
                                          }}
                                          > Reply</Button>
                                      </Form>    
                              </ListGroup>

                                  < FacebookShareButton className='footer-icon' url={'http://localhost:3000/#/post/'+post._id}>
                                    <FacebookIcon  size ={33} round/>
                                      </FacebookShareButton>
                                      < LinkedinShareButton className='footer-icon' url={'http://localhost:3000/#/post/'+post._id}>
                                    <LinkedinIcon  size ={33} round/>
                                      </LinkedinShareButton>
                              </Card.Footer>
                          </Card>
                        </div>
        )
    }
}

export default SingleBlog
