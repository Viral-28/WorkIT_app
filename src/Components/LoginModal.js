import React, { Component } from 'react'
import { Modal, Row, Col, Container, Button, Form } from "react-bootstrap";
import {  NavLink } from "react-router-dom";

import AuthService from "../services/auth.services";
export default class LoginModal extends Component {

  constructor(props) {
    super(props);
    console.log("InLogin Modal")
    this.handleLogin = this.handleLogin.bind(this);
    // state of login component
    this.state = {
      emailid: "",
      password: "",
      loading: false,
      message: "",

      emailIdError: "",
      passwordError: "",
    };
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    // method to check validation functions

    AuthService.login(this.state.emailid, this.state.password).then(
      () => {

        // localStorage.setItem("userCat",fetch("http://localhost:8001/api/user/getPreferences?id="+JSON.parse(localStorage.getItem("user")).id).then((results) => { return results.json() })).then((results) => {return results;})
        this.props.history.push("/");

        window.location.reload();
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          loading: false,
          message: resMessage
        });
      }
    );
  }


  handleChange(e) {

    e.preventDefault();
    const { name, value } = e.target;
    let password = this.state.password;
    let email = this.state.emailId;
    const isValid = this.validate(name, value, email, password);
  };


  validate(name, value, email, password) {

    let emailIdError = "";
    let passwordError = "";
    var emailRegex = /([\w\.]+)@([\w\.]+)\.(\w+)/;
    // var passwordRegex = /^[A-Za-z]\w{7,14}$/;
    var passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;

    switch (name) {
      case "emailId":
        this.setState({ "emailid": value });
        if (emailRegex.test(value)) {
          emailIdError = ''
          this.setState({ emailIdError });
        } else {
          emailIdError = 'Invalid Email'
          this.setState({ emailIdError });
        }
        break;

      case "password":
        this.setState({ "password": value });
        if (passwordRegex.test(value)) {
          passwordError = ""
          this.setState({ passwordError });

        } else {
          passwordError = "Password incorrect. Please try again."
          this.setState({ passwordError });

        }
        break;
      default:
        break;
    }

  }


  render() {
    return (<>


      <Container id="container" style={{ 'minHeight': '100vh' }}>
        <Row>

          <div className="text-center pt-3 h1">
            Log In!!
          </div>
          <div className="text-center pt-3">
            Note : Fields marked with an asterisk(*) are mandatory
          </div>
          <Form className="login-form" onSubmit={this.handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <div className="form_1">
                <input type="text" autoComplete="off" required name="emailId" onChange={(e) => this.handleChange(e)} />
                <label htmlFor="name" className="label-name">
                  <span className="content-name">Enter email* </span>
                </label>
              </div>
              <div className="form_error" style={{ fontSize: 15, color: "red" }}> {this.state.emailIdError}</div>

            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <div className="form_1">
                <input type="password" autoComplete="off" required name="password" onChange={(e) => this.handleChange(e)} />
                <label htmlFor="name" className="label-name">
                  <span className="content-name">Enter password* </span>
                </label>
              </div>
              <div className="form_error" style={{ fontSize: 15, color: "red" }}> {this.state.passwordError}</div>
            </Form.Group>

            <div className="text-center">
              <Button className="btn-md btn-danger btn-block " type="submit">
                Submit
              </Button>&nbsp;&nbsp;
            </div>
            <div className="text-center pt-3">
              <span className="text-center pt-3">
                Not yet registered?
                &nbsp;&nbsp;
                <NavLink exact as={NavLink} to='/signup' href='#signup'> Sign Up</NavLink>
              </span>
            </div>

          </Form>
        </Row>
        {this.state.message && (
          <div className="form-group">
            <div style={{'background-color':'#212529','color':'#fff'}}
              className={
                this.state.successful
                  ? "alert alert-success"
                  : "alert alert-danger"
              }
              role="alert"
            >
              {this.state.message}
            </div>
          </div>
        )}
      </Container>
    </>
    )
  }
}
