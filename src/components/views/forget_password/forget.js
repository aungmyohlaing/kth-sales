import React, { Component } from 'react';
import {
    Form, FormControl, FormGroup, Button, Col, Navbar, Nav,
    InputGroup, Row, Well, Alert
} from 'react-bootstrap';
import RouterLink from '../../commons/linkContainer';
import axios from 'axios';
import Footer from '../../footer';

export default class ForgetPassword extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            confirmPwd: '',
            emailValidation: null,
            pwdValidation: null,
            comPwdValidation: null,
            showAlert: false,
            showUserAlert: false
        }

        this.handlerChange = this.handlerChange.bind(this);
        this.onSubmitClick = this.onSubmitClick.bind(this);
        this.handlerAlertDismiss = this.handlerAlertDismiss.bind(this);
    }

    handlerChange(e) {
        var name = e.target.name;
        this.setState({ [name]: e.target.value, emailValidation: null, pwdValidation: null, comPwdValidation: null });
    }

    handlerAlertDismiss() {
        this.setState({ showAlert: false, showUserAlert: false });
    }

    onSubmitClick() {

        if (this.state.email === '' || this.state.email === undefined) {
            this.setState({ emailValidation: 'error' });
        }
        else if (this.state.password === '' || this.state.password === undefined) {
            this.setState({ pwdValidation: 'error' });
        }
        else if (this.state.confirmPwd === '' || this.state.confirmPwd === undefined) {
            this.setState({ comPwdValidation: 'error' });
        }
        else if (this.state.password !== this.state.confirmPwd) {
            this.setState({ showAlert: true });
        }
        else {
            let paramemail = {               
                email: this.state.email
            }

            var updateparam = {
                email: this.state.email,
                password: this.state.passwordd
            }


            axios.post('/api/checkemail', paramemail)
                .then(res => {
                    if (res.data === null) {
                        this.setState({ showUserAlert: true });
                    }
                    else {
                        axios.put('/api/resetpassword', updateparam)
                        .then(res => {
                            console.log(res);

                            this.setState({email:'', password:'', confirmPwd:''});
                        })
                        .catch(err => {
                            console.log(err);
                        })
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
        //console.log('Reset Click')
    }

    render() {
        function ShowAlert(props) {
            if (!props.show) {
                return null;
            }
            return (
                <Alert bsStyle="danger" onDismiss={props.dissMiss} >
                    <h4>Oh snap! You got an error!</h4>
                    <p>Confirm Password Mismatched!</p>
                </Alert>
            );
        }

        function ShowUserAlreadyExistAlett(props){
            if(!props.show){
                return null;
            }
            return (
                <Alert bsStyle="danger" onDismiss={props.dissMiss} >
                    <h4>Oh snap! You got an error!</h4>
                    <p>Thener is no user with this email.</p>
                </Alert>
            );
        }

        return (
            <div>
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            KTH Ledger
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            <RouterLink to='/register'>Register</RouterLink>
                            <RouterLink to='/login'>Login</RouterLink>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <div className="container" style={{ 'margin-top': '35px' }}>
                    <div>
                        <Row>
                            <Col xs={12} md={4} lg={4} lgOffset={4}>
                                <Well>
                                    <Form horizontal>
                                        <FormGroup controlId="formHorizontalLogin">
                                            <Col sm={12}>
                                                <h2 id="loginTitle">Reset Your Password</h2>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup controlId="formHorizontalEmail" validationState={this.state.emailValidation} >
                                            <Col sm={12}>
                                                <InputGroup>
                                                    <InputGroup.Addon><i className="fa fa-envelope-o fa" aria-hidden="true"></i></InputGroup.Addon>
                                                    <FormControl
                                                        name="email"
                                                        type="text"
                                                        value={this.state.email}
                                                        onChange={this.handlerChange}
                                                        placeholder="Email"
                                                    />
                                                    <FormControl.Feedback />
                                                </InputGroup>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup controlId="formHorizontalPassword" validationState={this.state.pwdValidation} >
                                            <Col sm={12}>
                                                <InputGroup>
                                                    <InputGroup.Addon><i className="fa fa-lock fa" aria-hidden="true"></i></InputGroup.Addon>
                                                    <FormControl
                                                        name="password"
                                                        type="password"
                                                        value={this.state.password}
                                                        onChange={this.handlerChange}
                                                        placeholder="Password"
                                                    />
                                                    <FormControl.Feedback />
                                                </InputGroup>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup controlId="formHorizontalConfirmPassword" validationState={this.state.comPwdValidation} >
                                            <Col sm={12}>
                                                <InputGroup>
                                                    <InputGroup.Addon><i className="fa fa-lock fa" aria-hidden="true"></i></InputGroup.Addon>
                                                    <FormControl
                                                        name="confirmPwd"
                                                        type="password"
                                                        value={this.state.confirmPwd}
                                                        onChange={this.handlerChange}
                                                        placeholder="Confirm Password"
                                                    />
                                                    <FormControl.Feedback />
                                                </InputGroup>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup>
                                            <Col sm={12}>
                                                <Button bsStyle="primary" block
                                                    onClick={this.onSubmitClick}>
                                                    Submit
                                                </Button>
                                            </Col>
                                        </FormGroup>
                                    </Form>
                                    <ShowAlert show={this.state.showAlert} dissMiss={this.handlerAlertDismiss} />
                                    <ShowUserAlreadyExistAlett show={this.state.showUserAlert} dissMiss={this.handlerAlertDismiss} />
                                </Well>
                            </Col>
                        </Row>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}