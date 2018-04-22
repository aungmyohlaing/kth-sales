import React, { Component } from 'react';
import { Form, FormGroup, Col, InputGroup, FormControl, Button, Alert } from 'react-bootstrap';

export default class registerForm extends Component {

    render() {
        const { fullname, email, username, password, confirmPwd, userFullNameValidation, onChange, onSubmit, showUserAlert,
            emailValidation, userNameValidation, pwdValidation, conPwdValidation, showAlert, handlerAlertDismiss } = this.props;

        function ShowAlert(props) {
            if (!props.show) {
                return null;
            }
            return (
                <Alert bsStyle="danger" onDismiss={handlerAlertDismiss} >
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
                <Alert bsStyle="danger" onDismiss={handlerAlertDismiss} >
                    <h4>Oh snap! You got an error!</h4>
                    <p>User Name Or Email Already Exist!</p>
                </Alert>
            );
        }
        return (

            <div>

                <Form horizontal>
                    <FormGroup >
                        <Col sm={12}>
                            <h2> Register </h2>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalFullName" validationState={userFullNameValidation}>
                        <Col sm={12}>
                            <InputGroup>
                                <InputGroup.Addon><i className="fa fa-users fa" aria-hidden="true"></i></InputGroup.Addon>
                                <FormControl
                                    name="fullname"
                                    value={fullname}
                                    onChange={onChange}
                                    type="text"
                                    placeholder="Your Full Name"
                                />
                                <FormControl.Feedback />
                            </InputGroup>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalEmail" validationState={emailValidation}>
                        <Col sm={12}>
                            <InputGroup>
                                <InputGroup.Addon><i className="fa fa-envelope-o fa" aria-hidden="true"></i></InputGroup.Addon>
                                <FormControl
                                    name="email"
                                    type="text"
                                    value={email}
                                    onChange={onChange}
                                    placeholder="Email"
                                />
                                <FormControl.Feedback />
                            </InputGroup>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalUserName" validationState={userNameValidation}>
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
                    <FormGroup controlId="formHorizontalPassword" validationState={pwdValidation} >
                        <Col sm={12}>
                            <InputGroup>
                                <InputGroup.Addon><i className="fa fa-lock fa" aria-hidden="true"></i></InputGroup.Addon>
                                <FormControl
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={onChange}
                                    placeholder="Password"
                                />
                                <FormControl.Feedback />
                            </InputGroup>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalConfirmPassword" validationState={conPwdValidation} >
                        <Col sm={12}>
                            <InputGroup>
                                <InputGroup.Addon><i className="fa fa-lock fa" aria-hidden="true"></i></InputGroup.Addon>
                                <FormControl
                                    name="confirmPwd"
                                    type="password"
                                    value={confirmPwd}
                                    onChange={onChange}
                                    placeholder="Confirm Password"
                                />
                                <FormControl.Feedback />
                            </InputGroup>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={12}>
                            <Button bsStyle="primary" block
                                onClick={onSubmit}>
                                Register
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
                <ShowAlert show={showAlert} />
                <ShowUserAlreadyExistAlett show={showUserAlert} />
            </div>
        );
    }

}