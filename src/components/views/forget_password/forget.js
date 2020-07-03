import React, { Component } from "react";
import {
  Form,
  FormControl,
  Button,
  Col,
  Navbar,
  Nav,
  InputGroup,
  Row,
  Alert,
  Card,
} from "react-bootstrap";
import axios from "axios";
import Footer from "../../footer";
import { Link } from "react-router-dom";

export default class ForgetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      confirmPwd: "",
      emailValidation: false,
      showAlert: false,
      showUserAlert: false,
      validated: false,
    };

    this.handlerChange = this.handlerChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlerAlertDismiss = this.handlerAlertDismiss.bind(this);
  }

  handlerChange(e) {
    var name = e.target.name;
    this.setState({
      [name]: e.target.value,
    });
  }

  handlerAlertDismiss() {
    this.setState({ showAlert: false, showUserAlert: false });
  }

  handleSubmit() {
    // const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }

    const emailExpression = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
    let validEmail = emailExpression.test(
      String(this.state.email).toLowerCase()
    );

    if (this.state.email === "" || this.state.email === null) {
      this.setState({ validated: true });
    } else if (!validEmail) {      
      this.setState({ validated: true, emailValidation: true });
    } else if (this.state.password === "" || this.state.password === null) {
      this.setState({ validated: true });
    } else if (this.state.confirmPwd === "" || this.state.confirmPwd === null) {
      this.setState({ validated: true });
    } else if (this.state.password !== this.state.confirmPwd) {
      this.setState({ showAlert: true });
    } else {
      this.setState({ validated: false });

      let paramemail = {
        email: this.state.email,
      };

      var updateparam = {
        email: this.state.email,
        password: this.state.passwordd,
      };

      axios
        .post("/api/checkemail", paramemail)
        .then((res) => {
          if (res.data === null) {
            this.setState({ showUserAlert: true });
          } else {
            axios
              .put("/api/resetpassword", updateparam)
              .then((res) => {
                console.log(res);

                this.setState({ email: "", password: "", confirmPwd: "" });
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  render() {    
    function ShowAlert(props) {
      if (!props.show) {
        return null;
      }
      return (
        <Alert variant="danger" onClose={props.dissMiss} dismissible>
          <h4>Oh snap! You got an error!</h4>
          <p>Confirm Password Mismatched!</p>
        </Alert>
      );
    }

    function ShowUserAlreadyExistAlett(props) {
      if (!props.show) {
        return null;
      }
      return (
        <Alert variant="danger" onClose={props.dissMiss} dismissible>
          <h4>Oh snap! You got an error!</h4>
          <p>Thener is no user with this email.</p>
        </Alert>
      );
    }

    function EmailValidated(props) {
      if (!props.show) {
        return <div>Email is required.</div>;
      }     

      return <div>Email is incorrect format.</div>;
    }

    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand as={Link} to="/home">
            KTH
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div
          className="container"
          style={{ marginTop: "35px", marginBottom: "82px" }}
        >
          <div>
            <Row className="justify-content-center">
              <Col xs={12} md={5} lg={5}>
                <Card>
                  <Card.Header>Reset your password</Card.Header>
                  <Card.Body>
                    <Form noValidate validated={this.state.validated}>
                      <Form.Group controlId="formHorizontalEmail">
                        <Col sm={12}>
                          <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                              <InputGroup.Text id="basic-addon1">
                                <i
                                  className="fa fa-envelope-o fa"
                                  aria-hidden="true"
                                ></i>
                              </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                              name="email"
                              type="email"
                              value={this.state.email}
                              onChange={this.handlerChange}
                              placeholder="Email"
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              <EmailValidated
                                show={this.state.emailValidation}
                              />
                            </Form.Control.Feedback>
                          </InputGroup>
                        </Col>
                      </Form.Group>
                      <Form.Group controlId="formHorizontalPassword">
                        <Col sm={12}>
                          <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                              <InputGroup.Text id="basic-addon1">
                                <i
                                  className="fa fa-lock fa"
                                  aria-hidden="true"
                                ></i>
                              </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                              name="password"
                              type="password"
                              value={this.state.password}
                              onChange={this.handlerChange}
                              placeholder="New Password"
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              Password is required.
                            </Form.Control.Feedback>
                          </InputGroup>
                        </Col>
                      </Form.Group>
                      <Form.Group controlId="formHorizontalConfirmPassword">
                        <Col sm={12}>
                          <InputGroup>
                            <InputGroup.Prepend>
                              <InputGroup.Text id="basic-addon1">
                                <i
                                  className="fa fa-lock fa"
                                  aria-hidden="true"
                                ></i>
                              </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                              name="confirmPwd"
                              type="password"
                              value={this.state.confirmPwd}
                              onChange={this.handlerChange}
                              placeholder="Confirm Password"
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              Confirm password is required.
                            </Form.Control.Feedback>
                          </InputGroup>
                        </Col>
                      </Form.Group>
                      <Form.Group>
                        <Col sm={12}>
                          <Button
                            variant="primary"
                            block
                            onClick={this.handleSubmit}
                          >
                            Submit
                          </Button>
                        </Col>
                      </Form.Group>
                    </Form>
                    <ShowAlert
                      show={this.state.showAlert}
                      dissMiss={this.handlerAlertDismiss}
                    />
                    <ShowUserAlreadyExistAlett
                      show={this.state.showUserAlert}
                      dissMiss={this.handlerAlertDismiss}
                    />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
        <div style={{ position: 'fixed', top: 'calc(100% - 80px)', width: '100%' }}>
        <Footer />
        </div>
      </div>
    );
  }
}
