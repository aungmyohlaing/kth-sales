import React, { Component } from 'react';
import { Form, FormControl, FormGroup, Button, Col, Alert, InputGroup } from 'react-bootstrap';
// import RouterLink from '../../linkContainer';
import { Link } from 'react-router-dom';


export default class loginForm extends Component {
    render() {
        const { username, password, onChange, onSubmit, userValidationState, pwdValidationState, handlerAlertDismiss, alertVisible, handlerKeyPress } = this.props;
        function ShowAlert(props) {
            if (!props.show) {
                return null;
            }
            return (
                <Alert bsStyle="danger" onDismiss={handlerAlertDismiss} >
                    <h4>Oh snap! You got an error!</h4>
                    <p>User Name or Password Mismatched!</p>
                </Alert>
            );
        }
        return (
            <div>
                <Form horizontal>
                    <FormGroup controlId="formHorizontalLogin">
                        <Col sm={12}>
                            <h2 id="loginTitle">Login</h2>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalEmail" validationState={userValidationState}>
                        <Col sm={12}>
                            <InputGroup>
                                <InputGroup.Addon><i className="fa fa-user fa" aria-hidden="true"></i></InputGroup.Addon>
                                <FormControl
                                    name="username"
                                    type="text"
                                    value={username}
                                    onChange={onChange}
                                    placeholder="User Name"
                                />
                                <FormControl.Feedback />
                            </InputGroup>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalPassword" validationState={pwdValidationState}>
                        <Col sm={12}>
                            <InputGroup>
                                <InputGroup.Addon><i className="fa fa-lock fa" aria-hidden="true"></i></InputGroup.Addon>
                                <FormControl
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={onChange}
                                    onKeyPress={handlerKeyPress}
                                    placeholder="Password"
                                />
                                <FormControl.Feedback />
                            </InputGroup>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col sm={12}>
                            <Button bsStyle="primary" block
                                onClick={onSubmit}>
                                Sign in
                            </Button>
                        </Col>
                    </FormGroup>

                    <ShowAlert show={alertVisible} />
                    {/* <FormGroup>
                        <Col sm={12}>
                            Don't have an account? <Link to="/register">Create Here</Link> 
                        </Col>
                    </FormGroup> */}
                    <FormGroup>
                        <Col sm={12}>
                            <Link to="/reset">Forget Your Password?</Link> 
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );

    }
}   
