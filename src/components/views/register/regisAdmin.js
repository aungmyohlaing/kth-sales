import React, { Component } from 'react';
import {
    Form, FormGroup, Col, InputGroup, FormControl, Button, Alert, Container, Nav,
    Navbar,
} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEnvelope,
    faLock
} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { Link } from "react-router-dom";
import Footer from '../../footer';

export default class RegisAdim extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            usertype: 'Admin',
            securityCode: '',
            emailValidation: false,
            pwdValidation: false,
            showAlert: false,
            showUserAlert: false,
            validated: false,
            errorMessage: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handlerAlertDismiss = this.handlerAlertDismiss.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        this.setState({ [name]: event.target.value });
        this.setState({
            emailValidation: null,
            pwdValidation: null
        });

    }

    handlerAlertDismiss() {
        this.setState({ showAlert: false, showUserAlert: false });
    }

    onSubmit() {
        /**
         * 
         */

        if (!this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            this.setState({ emailValidation: true, validated: true });
        }
        else if (this.state.password === undefined || this.state.password === '') {
            this.setState({ validated: true });
        }
        else {
            /**
             * Security Code to Check access "a?GE2rG<"
             */
            if (this.state.securityCode === 'a?GE2rG<') {
                this.setState({ validated: false });
                var users = {
                    fullname: '-',
                    email: this.state.email,
                    username: this.state.email,
                    password: this.state.password,
                    userType: this.state.usertype,
                    createDate: Date.now()
                }

                axios.post('/api/checkemail', { email: this.state.email })
                    .then(res => {
                        if (res.data != null) {
                            this.setState({ showAlert: true, errorMessage: 'Email is already in use' });
                        } else {
                            axios.post('/api/users', users)
                                .then(res => {
                                    this.setState({ fullname: '', email: '', username: '', password: '', confirmPwd: '' });
                                    this.props.history.push('/login');
                                })
                                .catch(err => {
                                    console.error(err);
                                });
                        }
                    })

            } else {
                this.setState({ showAlert: true, errorMessage: 'Security Code mismatch' })
            }
        }
    }



    render() {
        let self = this;
        const { email, password, securityCode, emailValidation, showAlert, validated, errorMessage } = this.state;

        function ShowAlert(props) {
            if (!props.show) {
                return null;
            }
            return (
                <Alert variant="danger" onClose={self.handlerAlertDismiss}>
                    <h4>Oh snap! You got an error!</h4>
                    <p>{props.message}</p>
                </Alert>
            );
        };

        function EmailValidated(props) {
            if (!props.show) {
                return <div>Email is required.</div>;
            }

            return <div>Email is incorrect format.</div>;
        };

        return (
            <div  >
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand as={Link} to="/home">KTH</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                        <Nav>
                            <Nav.Link as={Link} to='/login'>Login</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <div id="mainview" style={{ width: '450px', marginLeft: 'auto', marginRight: 'auto' }}>
                    <Container>
                        <div style={{ marginBottom: '40px', textAlign: 'center' }}><Col><h1>Create Admin</h1></Col></div>
                        <Form validated={validated}>

                            <FormGroup>
                                <Col>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="basic-addon1">
                                                <FontAwesomeIcon icon={faEnvelope} />
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                            name="email"
                                            type="email"
                                            value={email}
                                            onChange={this.handleChange}
                                            placeholder="Email"
                                            required
                                        />
                                        <FormControl.Feedback type="invalid">
                                            <EmailValidated show={emailValidation} />
                                        </FormControl.Feedback>
                                    </InputGroup>
                                </Col>
                            </FormGroup>
                            <FormGroup >
                                <Col sm={12}>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="basic-addon1">
                                                <FontAwesomeIcon icon={faLock} />
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                            name="password"
                                            type="password"
                                            value={password}
                                            onChange={this.handleChange}
                                            placeholder="Password"
                                            required
                                        />
                                        <FormControl.Feedback type="invalid">
                                            Password is required.
                                </FormControl.Feedback>
                                    </InputGroup>
                                </Col>
                            </FormGroup>
                            <FormGroup >
                                <Col sm={12}>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="basic-addon1">
                                                <FontAwesomeIcon icon={faLock} />
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                            name="securityCode"
                                            type="password"
                                            value={securityCode}
                                            onChange={this.handleChange}
                                            placeholder="Code"
                                            required
                                        />
                                        <FormControl.Feedback type="invalid">
                                            Security Code is required.
                                </FormControl.Feedback>
                                    </InputGroup>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col sm={12}>
                                    <Button variant="primary" block onClick={this.onSubmit}>
                                        Submit
                            </Button>
                                </Col>
                            </FormGroup>
                            <Col><ShowAlert show={showAlert} message={errorMessage} /></Col>
                        </Form>
                    </Container>
                </div>
                <Footer /> 
            </div>
        )
    }
}