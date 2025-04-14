import React, {Component} from "react";
import { ListGroup, Nav, Navbar } from "react-bootstrap";
import { Col, Container, Row } from "react-bootstrap";
import BlogWithTag from "./BlogWithTag";
import BlogServices from '../services/blogs.services';
import Loading from "./Loading";
import './blogs.scss'
//import Advertisements from "./Advertisements";


class Home extends Component{
    constructor(props){
        super(props)

        this.state={
            
            blogs: [],
            showBlogs: [],
            reload:1,
            tagsList:['All','Productivity','Self-care','Lifestyle','Grooming'],
            selectedTag:'All',
            currentUser: localStorage.getItem("user") !== null && localStorage.getItem("user") !== undefined
                    ? JSON.parse(localStorage.getItem("user")).userName
                    : ''
        }
    }

    componentDidMount(){
        BlogServices.getAllPosts().then(
            (response) => {
                console.log(response.posts)
                this.setState({blogs: response.posts, showBlogs: response.posts})
                this.setState({showBlogs: this.state.showBlogs.reverse()})
                console.log('mounted')
            }
        )
    }


    render(){
        console.log("render called")
        console.log(localStorage.getItem("user"))
        console.log(this.state)
        return(
            <Container>
                <Row>
                    <Col lg={2} md={3} sm={12}>
                        <Navbar expand='md'>
                        <Navbar.Toggle style={{backgroundColor:'#324049', color:'#e2f0e0'}} aria-controls="tagScroll" >View Tags</Navbar.Toggle>
                        <Navbar.Collapse id="tagScroll" >
                            <Nav navbarScroll>
                                <ListGroup className="my-2" vertical>
                                {
                                    this.state.tagsList.map((tag)=>{
                                        const lnk = 'blog/'+tag;
                                        return <ListGroup.Item className="tag-list-item">
                                        <Nav.Link 
                                            className='tag-list-itam-nav'
                                            key={tag} 
                                            onClick={(e)=> {
                                            console.log(tag)
                                            tag==='All'
                                            ? this.setState({showBlogs: this.state.blogs})
                                            : this.setState((currentState) => ({
                                                showBlogs: currentState.blogs.filter( (c) => {
                                                    return c.tag === tag
                                                })
                                            }))
                                            this.setState({selectedTag:tag})
                                            console.log('state changed')
                                        }} >{tag}</Nav.Link></ListGroup.Item>
                                    })
                                }
                                </ListGroup>
                                
                            </Nav>
                        </Navbar.Collapse>
                        </Navbar>
                    </Col>
                    <Col lg={7} md={9} sm={12} style={{marginTop:'10px'}}>
                    {console.log(this.state.currentUser)}
                        {
                            this.state.blogs.length === 0
                            ?  <Loading />
                            : <BlogWithTag tag={this.state.selectedTag} blogs={this.state.showBlogs} userName={this.state.currentUser}/>
                        }
                        
                    </Col>
                    <Col>
                    <div style={{marginTop:'20px'}}>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Home;