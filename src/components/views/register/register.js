import React, { Component } from 'react';
import { Col, Nav, Navbar, Row, Well } from 'react-bootstrap';
import RegisterForm from '../register/form';
import RouterLink from '../../commons/linkContainer';
import axios from 'axios';
import Storage from '../../../components/commons/localStogare';
import Footer from '../../footer';

export default class register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fullname: '',
            email: '',
            username: '',
            password: '',
            confirmPwd: '',
            userFullNameValidation: null,
            emailValidation: null,
            userNameValidation: null,
            pwdValidation: null,
            conPwdValidation: null,
            showAlert: false,
            showUserAlert: false
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handlerAlertDismiss = this.handlerAlertDismiss.bind(this);
    }

    componentDidMount(){
        var loggedIn = Storage(localStorage).get('loggedIn');        
        if(loggedIn){
            this.props.history.push('/home');
        }
    }

    handleChange(event) {
        const name = event.target.name;
        this.setState({ [name]: event.target.value });
        this.setState({
            userFullNameValidation: null,
            emailValidation: null,
            userNameValidation: null,
            pwdValidation: null,
            conPwdValidation: null
        });

    }

    handlerAlertDismiss() {
        this.setState({ showAlert: false, showUserAlert: false });
    }

    onSubmit(event) {

        if (this.state.fullname === undefined || this.state.fullname === '') {
            this.setState({ userFullNameValidation: 'error' });
        }
        else if (this.state.email === undefined || this.state.email === '') {
            this.setState({ emailValidation: 'error' });
        }
        else if (!this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            this.setState({ emailValidation: 'error' });
        }
        else if (this.state.username === undefined || this.state.username === '') {
            this.setState({ userNameValidation: 'error' });
        }
        else if (this.state.password === undefined || this.state.password === '') {
            this.setState({ pwdValidation: 'error' });
        }
        else if (this.state.confirmPwd === undefined || this.state.confirmPwd === '') {
            this.setState({ conPwdValidation: 'error' });
        }
        else if (this.state.password !== this.state.confirmPwd) {
            this.setState({ showAlert: true });
        }
        else {

            var users = {
                fullname: this.state.fullname,
                email: this.state.email,
                username: this.state.username,
                password: this.state.password,
                userType: 'Admin',
                createDate: Date.now()
            }

            let paramusername = {
                username: this.state.username,
                email: this.state.email
            }


            axios.post('http://192.168.1.44:3001/api/checkuser', paramusername)
                .then(res => {                    
                    if (res.data !== null) {
                        this.setState({ showUserAlert: true });
                    }
                    else {
                        axios.post('http://192.168.1.44:3001/api/users', users)
                            .then(res => {
                                console.log(res);
                                this.setState({ fullname: '', email: '', username: '', password: '', confirmPwd: '' });
                                this.props.history.push('/thankyou');
                            })
                            .catch(err => {
                                console.error(err);
                            });
                    }
                })
                .catch(err => {
                    console.log(err);
                })


        }

    }

    render() {
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
                <div className="container" style={{ 'marginTop': '35px' }}>
                    <div>
                        <Row>
                            <Col xs={12} md={4} lg={4} lgOffset={4}>
                                <Well>
                                    <RegisterForm
                                        fullname={this.state.fullname}
                                        email={this.state.email}
                                        username={this.state.username}
                                        password={this.state.password}
                                        confirmPwd={this.state.confirmPwd}
                                        userFullNameValidation={this.state.userFullNameValidation}
                                        emailValidation={this.state.emailValidation}
                                        userNameValidation={this.state.userNameValidation}
                                        pwdValidation={this.state.pwdValidation}
                                        conPwdValidation={this.state.conPwdValidation}
                                        onChange={this.handleChange}
                                        onSubmit={this.onSubmit}
                                        showAlert={this.state.showAlert}
                                        showUserAlert={this.state.showUserAlert}
                                        handlerAlertDismiss={this.handlerAlertDismiss} />
                                </Well>
                            </Col>
                        </Row>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}
