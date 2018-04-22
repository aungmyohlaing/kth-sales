import React, { Component } from 'react';
// import users from '../../../api/users';
import { Col, Nav, Navbar, Row, Well } from 'react-bootstrap';
import LoginForm from './form';
import RouterLink from '../../commons/linkContainer';
import Storage from '../../commons/localStogare';
import Footer from '../../footer';
import axios from 'axios';

export default class login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            userrole: '',
            error: false,
            userValidationState: null,
            pwdValidationState: null,
            alertVisible: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handlerAlertDismiss = this.handlerAlertDismiss.bind(this);
        this.handlerKeyPress = this.handlerKeyPress.bind(this);
    }

    /** 
     * Checke User already login or not?
    */
    componentDidMount(){
        var loggedIn = Storage(localStorage).get('loggedIn');        
        if(loggedIn){
            this.props.history.push('/home');
        }
    }

    handleChange(event) {
        const name = event.target.name;
        this.setState({ [name]: event.target.value });
        this.setState({ userValidationState: null, pwdValidationState: null });

    }

    onSubmit(event) {
        if (this.state.username === undefined || this.state.username === '') {
            this.setState({ userValidationState: 'error' });
        } else if (this.state.password === undefined || this.state.password === '') {
            this.setState({ pwdValidationState: 'error' });
        }
        else {
            const { history } = this.props;
            //let loginError;

            let userdata = {
                username: this.state.username,
                password: this.state.password
            }

            axios.post('http://192.168.1.44:3001/api/auth', userdata)
                .then(res => {                    
                    if (res.data !== null) {
                        Storage(localStorage).set('loggedIn', true);
                        Storage(localStorage).set('username', this.state.username);
                        history.push('/home');
                    }
                    else {
                        this.setState({ alertVisible: true });
                    }
                    //this.props.history.push('/thankyou');

                })
                .catch(err => {
                    console.error(err);

                });            

        }

        //event.preventDefault();
    }

    handlerKeyPress(event) {
        if (event.key === 'Enter') {
            this.onSubmit();
        }
    }

    handlerAlertDismiss() {
        console.log('alert click');
        this.setState({ alertVisible: false });
    }

    render() {
        return (
            <div>
                <Navbar inverse collapseOnSelect fluid>
                    <Navbar.Header>
                        <Navbar.Brand>
                            KTH
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
                <div className="container" style={{ 'marginTop': '35px' }}  >
                    <div>
                        <Row >
                            <Col xs={12} md={4} lg={4} lgOffset={4} className="text-center">
                                <Well>
                                    <LoginForm
                                        usernamee={this.state.username}
                                        password={this.state.password}
                                        onChange={this.handleChange}
                                        onSubmit={this.onSubmit}
                                        userValidationState={this.state.userValidationState}
                                        pwdValidationState={this.state.pwdValidationState}
                                        handlerAlertDismiss={this.handlerAlertDismiss}
                                        handlerKeyPress={this.handlerKeyPress}
                                        alertVisible={this.state.alertVisible} />
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