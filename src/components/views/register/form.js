import React, { Component } from "react";
import {
  Form,
  Col,
  InputGroup,  
  Button,
  Alert,
  Card
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLock
} from "@fortawesome/free-solid-svg-icons";

export default class registerForm extends Component {    
  render() {
    const {
      fullname,
      email,
      username,
      password,
      confirmPwd,      
      onChange,
      onSubmit,
      showUserAlert,
      emailValidation,      
      showAlert,
      handlerAlertDismiss,
      usertype,
      radiohandlerChange,
      validated
    } = this.props;

    function ShowAlert(props) {
      if (!props.show) {
        return null;
      }
      return (
        <Alert variant="danger" onClose={handlerAlertDismiss}>
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
        <Alert variant="danger" onClose={handlerAlertDismiss}>
          <h4>Oh snap! You got an error!</h4>
          <p>User Name Or Email Already Exist!</p>
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
      <Card>
          <Card.Header className="text-center" as="h2">
          Add User
          </Card.Header>
          <Card.Body>
        <Form validated={validated}>         
          <Form.Group controlId="formHorizontalUserType">
            <Col sm={12}>
              <Form.Check
                type="radio"
                name="rdoUserType"
                id="rdoUser"
                value="User"
                onChange={radiohandlerChange}
                inline
                checked={usertype === "User"}
                label="User"
              />
                              
              <Form.Check
              id="rdoAdmin"
                type="radio"
                name="rdoUserType"
                value="Admin"
                onChange={radiohandlerChange}
                inline
                checked={usertype === "Admin"}
                label="Admin"
              />                
            </Col>
          </Form.Group>
          <Form.Group
            controlId="formHorizontalFullName"            
          >
            <Col sm={12}>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">
                    <FontAwesomeIcon icon={faUser} />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  name="fullname"
                  value={fullname}
                  onChange={onChange}
                  type="text"
                  placeholder="Your Full Name"
                  required
                />
                <Form.Control.Feedback type="invalid">
                    Full name is required.
                  </Form.Control.Feedback>
              </InputGroup>
            </Col>
          </Form.Group>
          <Form.Group
            controlId="formHorizontalEmail"            
          >
            <Col sm={12}>
              <InputGroup className="mb-3">                
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  name="email"
                  type="email"
                  value={email}
                  onChange={onChange}
                  placeholder="Email"
                  required
                />
                <Form.Control.Feedback type="invalid">                    
                    <EmailValidated show={emailValidation} />
                  </Form.Control.Feedback>
              </InputGroup>
            </Col>
          </Form.Group>
          <Form.Group
            controlId="formHorizontalUserName"            
          >
            <Col sm={12}>
              <InputGroup className="mb-3">                
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">
                    <FontAwesomeIcon icon={faUser} />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  name="username"
                  type="text"
                  value={username}
                  onChange={onChange}
                  placeholder="User Name"
                  required
                />
                <Form.Control.Feedback type="invalid">
                    User name is required.
                </Form.Control.Feedback>
              </InputGroup>
            </Col>
          </Form.Group>
          <Form.Group
            controlId="formHorizontalPassword"            
          >
            <Col sm={12}>
              <InputGroup className="mb-3">               
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">
                    <FontAwesomeIcon icon={faLock} />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  name="password"
                  type="password"
                  value={password}
                  onChange={onChange}
                  placeholder="Password"
                  required
                />
                <Form.Control.Feedback type="invalid">
                    Password is required.
                </Form.Control.Feedback>
              </InputGroup>
            </Col>
          </Form.Group>
          <Form.Group
            controlId="formHorizontalConfirmPassword"            
          >
            <Col sm={12}>
              <InputGroup className="mb-3">
              <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">
                    <FontAwesomeIcon icon={faLock} />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  name="confirmPwd"
                  type="password"
                  value={confirmPwd}
                  onChange={onChange}
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
              <Button variant="primary" block onClick={onSubmit}>
                Submit
              </Button>
            </Col>
          </Form.Group>
        </Form>
        
        <ShowAlert show={showAlert} />
        <ShowUserAlreadyExistAlett show={showUserAlert} />
        </Card.Body>
        </Card>
      </div>
    );
  }
}
