import React, { Component } from 'react';
// import users from '../../../api/users';
import { Col, Nav, Navbar, Row } from 'react-bootstrap';
import LoginForm from './form';
import Storage from '../../commons/localStogare';
import Footer from '../../footer';
import axios from 'axios';
import {Link} from 'react-router-dom';

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
            alertVisible: false,
            validated: false               
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
        
        var loggedIn = Storage().get('loggedIn');        
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
        if (this.state.username === '' || this.state.password === ''){
            this.setState({ validated: true})
        }
        else if (this.state.username === undefined || this.state.username === '') {
            this.setState({ userValidationState: 'error' });
        } else if (this.state.password === undefined || this.state.password === '') {
            this.setState({ pwdValidationState: 'error' });
        }
        else {
            const { history } = this.props;
            this.setState({ validated: false })
            //let loginError;            
            let userdata = {
                username: this.state.username,
                password: this.state.password
            }

            axios.post('/api/auth', userdata)
                .then(res => {                    
                    if (res.data !== null) {
                        Storage(localStorage).set('loggedIn', true);
                        
                        var usersData = {
                            userid: res.data._id,
                            fullname: res.data.fullname,
                            email: res.data.email,
                            usertype: res.data.userType
                        }
                        Storage(localStorage).set('userinfo', usersData);                                          
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
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand as={Link} to="/home">KTH</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Nav.Link as={Link} to='/login'>Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
                <div className="container" style={{ 'marginTop': '35px','marginBottom':'95px' }}  >
                    <div>
                        <Row className="justify-content-center" >
                            <Col xs={12} sm={12} md={7} lg={5} >
                                <div >
                                    <LoginForm
                                        usernamee={this.state.username}
                                        password={this.state.password}
                                        onChange={this.handleChange}
                                        onSubmit={this.onSubmit}
                                        userValidationState={this.state.userValidationState}
                                        pwdValidationState={this.state.pwdValidationState}
                                        handlerAlertDismiss={this.handlerAlertDismiss}
                                        handlerKeyPress={this.handlerKeyPress}
                                        alertVisible={this.state.alertVisible}
                                        validated={this.state.validated}                                      
                                        users={this.state.users} />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div style={{ position: 'fixed', top: 'calc(100% - 80px)', width: '100%' }}>
                    <Footer />
                </div>
                
            </div>
        )
    }
}