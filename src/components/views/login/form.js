import React, { Component } from "react";
import {
  Form,
  FormControl,
  Button,
  Col,
  Alert,
  InputGroup,
  Card,
} from "react-bootstrap";
// import RouterLink from '../../linkContainer';
import { Link } from "react-router-dom";

export default class loginForm extends Component {
  render() {
    const {
      username,
      password,
      onChange,
      onSubmit,
      userValidationState,
      pwdValidationState,
      handlerAlertDismiss,
      alertVisible,
      handlerKeyPress,
      validated,
    } = this.props;
    function ShowAlert(props) {
      if (!props.show) {
        return null;
      }
      return (
        <Alert variant="danger" onClose={handlerAlertDismiss} dismissible>
          <h4>Oh snap! You got an error!</h4>
          <p>User Name or Password Mismatched!</p>
        </Alert>
      );
    }
    return (
      <div>
        <Card>
          <Card.Header className="text-center" as="h2">
            Login
          </Card.Header>
          <Card.Body>
            <Form validated={validated}>
              <Form.Group
                controlId="formHorizontalEmail"
                validationstate={userValidationState}
              >
                <Col sm={12}>
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon1">
                        <i className="fa fa-user fa" aria-hidden="true"></i>
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder="Username"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      name="username"
                      type="text"
                      value={username}
                      onChange={onChange}
                      autoComplete="off"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Username is required.
                    </Form.Control.Feedback>
                  </InputGroup>
                  {/* <InputGroup>
                                <InputGroup.Prepend><i className="fa fa-user fa" aria-hidden="true"></i></InputGroup.Prepend>
                                <FormControl
                                    name="username"
                                    type="text"
                                    value={username}
                                    onChange={onChange}
                                    placeholder="User Name"
                                />
                                <FormControl.Feedback />
                            </InputGroup> */}
                </Col>
              </Form.Group>
              <Form.Group
                controlId="formHorizontalPassword"
                validationstate={pwdValidationState}
              >
                <Col sm={12}>
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon1">
                        <i className="fa fa-lock fa" aria-hidden="true"></i>
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      name="password"
                      type="password"
                      value={password}
                      onChange={onChange}
                      onKeyPress={handlerKeyPress}
                      placeholder="Password"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Password is required.
                    </Form.Control.Feedback>
                  </InputGroup>
                  {/* <InputGroup>
                    <InputGroup.Prepend>
                      <i className="fa fa-lock fa" aria-hidden="true"></i>
                    </InputGroup.Prepend>
                    <FormControl
                      name="password"
                      type="password"
                      value={password}
                      onChange={onChange}
                      onKeyPress={handlerKeyPress}
                      placeholder="Password"
                    />
                    <FormControl.Feedback />
                  </InputGroup> */}
                </Col>
              </Form.Group>

              <Form.Group>
                <Col sm={12}>
                  <Button variant="primary" block onClick={onSubmit}>
                    Sign in
                  </Button>
                </Col>
              </Form.Group>

              <ShowAlert show={alertVisible} />
              {/* <Form.Group>
                        <Col sm={12}>
                            Don't have an account? <Link to="/register">Create Here</Link> 
                        </Col>
              </Form.Group> */}
              <Form.Group>
                <Col sm={12}>
                  <Link to="/reset">Forget Your Password?</Link>
                </Col>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
        {/* <Form horizontal>
                    <Form.Group controlId="formHorizontalLogin">
                        <Col sm={12}>
                            <h2 id="loginTitle">Login</h2>
                        </Col>
                    </Form.Group>
                    
                </Form> */}
      </div>
    );
  }
}
