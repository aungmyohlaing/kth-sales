import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import RegisterForm from '../register/form';
import axios from 'axios';
import Storage from '../../../components/commons/localStogare';
import Header from '../../header';
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
            usertype:'User',            
            emailValidation: false,            
            showAlert: false,
            showUserAlert: false,
            validated: false
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handlerAlertDismiss = this.handlerAlertDismiss.bind(this);
        this.radiohandleChange = this.radiohandleChange.bind(this);
    }

    componentDidMount() {
        let loggedIn = Storage(localStorage).get('loggedIn');
        let userinfo = Storage(localStorage).get('userinfo');
        if (!loggedIn) {
            this.props.history.push('/login');
        }
        else if (userinfo.usertype.toString().toLowerCase() !== 'admin'){
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

    radiohandleChange(e){
        this.setState({usertype:e.target.value})
    }

    onSubmit(event) {

        if (this.state.fullname === undefined || this.state.fullname === '') {
            this.setState({ validated: true });
        }
        else if (this.state.email === undefined || this.state.email === '') {
            this.setState({ emailValidation: 'error',validated: true });
        }
        else if (!this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            this.setState({ emailValidation: true, validated: true });
        }
        else if (this.state.username === undefined || this.state.username === '') {
            this.setState({ validated: true });
        }
        else if (this.state.password === undefined || this.state.password === '') {
            this.setState({ validated: true });
        }
        else if (this.state.confirmPwd === undefined || this.state.confirmPwd === '') {
            this.setState({ validated: true });
        }
        else if (this.state.password !== this.state.confirmPwd) {
            this.setState({ showAlert: true });
        }
        else {

            this.setState({ validated: false });
            var users = {
                fullname: this.state.fullname,
                email: this.state.email,
                username: this.state.username,
                password: this.state.password,
                userType: this.state.usertype,
                createDate: Date.now()
            }

            let paramusername = {
                username: this.state.username,
                email: this.state.email
            }


            axios.post('/api/checkuser', paramusername)
                .then(res => {
                    if (res.data !== null) {
                        this.setState({ showUserAlert: true });
                    }
                    else {
                        axios.post('/api/users', users)
                            .then(res => {                               
                                this.setState({ fullname: '', email: '', username: '', password: '', confirmPwd: '' });
                                this.props.history.push('/users');
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
                <Header />
                {/* <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand as={Link} to="/home">KTH</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Nav.Link as={Link} to='/login'>Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar> */}
                <div id="mainview" className="container">
                    <div className="container" style={{ 'marginTop': '50px', 'marginBottom':'25px'}}>
                        <div>
                            <Row className="justify-content-center">
                                <Col xs={12} md={6} lg={6} >
                                    <div>
                                        <RegisterForm
                                            fullname={this.state.fullname}
                                            email={this.state.email}
                                            username={this.state.username}
                                            password={this.state.password}
                                            confirmPwd={this.state.confirmPwd}                                           
                                            emailValidation={this.state.emailValidation}                                           
                                            onChange={this.handleChange}
                                            onSubmit={this.onSubmit}
                                            showAlert={this.state.showAlert}
                                            showUserAlert={this.state.showUserAlert}
                                            handlerAlertDismiss={this.handlerAlertDismiss} 
                                            usertype = {this.state.usertype}
                                            radiohandlerChange = {this.radiohandleChange}
                                            validated ={this.state.validated}
                                            />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}
