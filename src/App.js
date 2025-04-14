import React, {Component} from 'react';
import {Route, HashRouter} from 'react-router-dom';
import Home from './Components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Blog from './Components/Blog';
import Todo from './Components/Todo';
import LoginModal from './Components/LoginModal';
import SignUpModal from './Components/SignUpModal';
import $ from 'jquery';
import TopNav from './Components/TopNav';
import BlogId from './Components/BlogId';
import Footer from './Components/Footer/footer';
import SocialMedia from './Components/SocialMedia.js/SocialMedia';
import RealHome from './Components/RealHome';
import About from './Components/About';
import Contact from './Components/Contact/Contact';
import Quotes from './Components/Quotes';



class App extends Component{
	constructor(props){
        super(props)

        this.state = {
            credentials: {
                "emailid":'',
                "password":'',
                "firstName":'',
                "lastName":'',
                "phoneNumber":''},
            isLogged: false,
            blogs: [],
            loginShow: false,
            signUpShow: false
        }

        
    }

	writeBlog = (details) => {
		//blog should have tags, post, email
	}

    writeTodo=(details)=>{

    }

    userAuth = () =>{
        console.log(this.state)
        var api="http://localhost:3000/user/getAll"

        
        
        $.getJSON(api).then(function(data){
            this.setState({users: data})
            console.log(this.state)
        }.bind(this))
    }


	render(){
		return(
            <HashRouter>
				<TopNav/>
                
				<Route exact path ='/' component={RealHome}/>
				<Route path ='/home' component={ RealHome} />
				<Route path ='/quotes' component={Quotes} />
                <Route path ='/about' component={About} />
                <Route path ='/contact' component={Contact} />
                <Route path ='/blog' component={Home} />
				<Route path ='/myblogs' component={ (props) => <Blog credentials= {this.state.credentials} blogs={this.state.blogs} writeBlog = {(details)=>this.writeBlog(details)}/>} />				
				<Route path ='/todo' component={ (props) => <Todo credentials= {this.state.credentials} blogs={this.state.blogs} writeTodo = {(details)=>this.writeTodo(details)}/>} />				
                <Route exact path="/signup" component={SignUpModal} />
                <Route exact path="/login" component={LoginModal} />
                <Route  path="/post/:id" component={BlogId} />
             
                <SocialMedia />
          <Footer />
          </HashRouter>
		)
	}
}

export default App;
