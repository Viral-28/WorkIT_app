import React from 'react';
import './TopNav.scss';

import { Container, Nav, Navbar, Form , FormControl, Button, NavDropdown, Col} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import AuthService from "../services/auth.services";
import '../css/mainTheme.scss'

const logout = () => {
  AuthService.logout();
  window.location.replace("/");
}

const TopNav = () => {
  return (
    <Navbar className='navbar-main sticky-top' bg="light" expand="lg">
       <Navbar.Brand className='navbar-title' href='/'>&nbsp; Work It</Navbar.Brand>
       
					{/* <Navbar.Brand href="#">Some Title</Navbar.Brand> */}
					<Navbar.Toggle style={{marginRight:'20px'}} aria-controls="navbar-bar-bar" className="nav-toggle" />
					<Navbar.Collapse id="navbar-bar-bar" >
            <Col>
					  <Nav
					    className="mr-auto my-2 my-lg-0 navbar-nav-part"
					    style={{ maxHeight: '100px' }}
					    navbarScroll
					  >
					    <Nav.Link activeClassName="active" exact as={NavLink} to='/' className='navbar-text' href="#home">HOME</Nav.Link>

              <Nav.Link activeClassName="active" as={NavLink} to='/quotes' className='navbar-text' href="#quotes">QUOTES</Nav.Link>
					    {/* <Nav.Link activeClassName="active" as={NavLink} to='/travel' className='navbar-text' href="#travel">TRAVEL</Nav.Link> */}
              <Nav.Link activeClassName="active" as={NavLink} to='/blog' className='navbar-text' href="#blog">BLOGS</Nav.Link>
						{
							localStorage.getItem('user') === null
							? <Nav.Link activeClassName="active" as={NavLink} to='/myblogs' className='navbar-text' href="#myblogs" disabled>MY POSTS</Nav.Link>
							: <Nav.Link activeClassName="active" as={NavLink} to='/myblogs' className='navbar-text' href="#myblogs">MY POSTS</Nav.Link>
            }
						{
							localStorage.getItem('user') === null
							? <Nav.Link activeClassName="active" as={NavLink} to='/todo' className='navbar-text' href="#todo" disabled>MY JOURNAL</Nav.Link>
							: <Nav.Link activeClassName="active" as={NavLink} to='/todo' className='navbar-text' href="#todo">MY JOURNAL</Nav.Link>

						}
              <Nav.Link activeClassName="active" exact as={NavLink} to='/about' className='navbar-text' href="#about">ABOUT</Nav.Link>
              <Nav.Link activeClassName="active" exact as={NavLink} to='/contact' className='navbar-text' href="#contact">CONTACT</Nav.Link>
            </Nav>
            </Col>
            <Col lg={3} className="d-flex justify-content-center">

            {!localStorage.getItem('user') ?
          <Navbar.Brand className='navbar-title' href='/'>&nbsp;Hi Guest!</Navbar.Brand> :
          <Navbar.Brand className='navbar-title' href='/'>&nbsp;Welcome {JSON.parse(localStorage.getItem("user")).firstName}!</Navbar.Brand>}

            <Nav>
                        {!localStorage.getItem('user') ?
              <Nav.Link to="/signup" activeClassName='active' exact as={NavLink}  href="#signup"className="button_sign navbar-text "><li>
                SIGN-UP
                </li></Nav.Link> : null}
            {!localStorage.getItem('user') ?
              <Nav.Link to="/login" activeClassName='active' exact as={NavLink} href="#login" className="button_sign navbar-text"><li>
                LOG-IN
                </li></Nav.Link> :
              <Nav.Link to="/" onClick={logout} exact as={NavLink}  href="#logout"  className="button_sign navbar-text"><li>
                LOG-OUT
                </li></Nav.Link>}
            </Nav>
            </Col>
					  
					</Navbar.Collapse>
          
      
				</Navbar>
  );
};


export default (TopNav);
