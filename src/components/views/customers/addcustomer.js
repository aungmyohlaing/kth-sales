import React, { Component } from "react";
import {
  Row,
  Col,
  Image,
  Form,
  FormGroup,
  FormControl,
  Button,
  InputGroup,
} from "react-bootstrap";
import Header from "../../header";
import Footer from "../../footer";
import userlogo from "../../images/businessman.png";
import axios from "axios";
import SaveAlert from "../../commons/alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faUser,
  faEnvelope,
  faMobile,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

export default class Customer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      mobile: "",
      phone: "",
      salesamount: "",
      address1: "",
      address2: "",
      nameValidation: null,
      mobileValidation: null,
      address1Validation: null,
      showAlert: false,
      validated: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSaveClick = this.onSaveClick.bind(this);
    this.onCancelClick = this.onCancelClick.bind(this);
    this.onAlertDissmis = this.onAlertDissmis.bind(this);
  }

  handleChange(event) {
    var name = event.target.name;
    this.setState({ [name]: event.target.value });
    this.setState({
      nameValidation: null,
      mobileValidation: null,
      address1Validation: null,
    });
  }

  onAlertDissmis() {
    setTimeout(() => {
      this.setState({ showAlert: false });
    }, 3000);
  }

  onSaveClick() {
    if (this.state.name === null || this.state.name === "") {
      this.setState({ validated: true });
    } else if (this.state.mobile === null || this.state.mobile === "") {
      this.setState({ validated: true });
    } else if (this.state.address1 === null || this.state.address1 === "") {
      this.setState({ validated: true });
    } else {
      this.setState({ validated: false });
      let customers = {
        name: this.state.name,
        email: this.state.email,
        mobile: this.state.mobile,
        phone: this.state.phone,
        salesamount: 0,
        currentamount: 0,
        address1: this.state.address1,
        address2: this.state.address2,
      };

      axios
        .post("/api/customer", customers)
        .then((res) => {
          this.setState({ showAlert: true });
          this.onAlertDissmis();
          this.onCancelClick();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  onCancelClick() {
    this.setState({
      name: "",
      email: "",
      mobile: "",
      phone: "",
      salesamount: "",
      address1: "",
      address2: "",
      nameValidation: null,
      mobileValidation: null,
      address1Validation: null,
      validated: false
    });
  }

  render() {
    return (
      <div>
        <Header />
        <div id="mainview" className="container">
          <h2>
            Customer <small>add new customer</small>
          </h2>
          <hr />
          <Form noValidate validated={this.state.validated}>
            <Row>
              <Col xs={12} md={2} lg={2}>
                <Row style={{ marginBottom: "15px" }}>
                  <Col>
                    <Image src={userlogo} roundedCircle thumbnail />
                  </Col>
                </Row>
              </Col>
              <Col xs={12} md={10} lg={10}>
                <Row>
                  <Col xs={12} md={6} lg={6}>
                    <Form.Group>
                      <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                          <InputGroup.Text id="basic-addon1">
                            <FontAwesomeIcon icon={faUser} />
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                          name="name"
                          type="text"
                          value={this.state.name}
                          onChange={this.handleChange}
                          placeholder="Name"
                          required
                        />

                        <Form.Control.Feedback type="invalid">
                          Customer name is required.
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6} lg={6}>
                    <FormGroup>
                      <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                          <InputGroup.Text id="basic-addon1">
                            <FontAwesomeIcon icon={faEnvelope} />
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                          name="email"
                          type="text"
                          value={this.state.email}
                          onChange={this.handleChange}
                          placeholder="Email"
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={6} lg={6}>
                    <FormGroup>
                      <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                          <InputGroup.Text id="basic-addon1">
                            <FontAwesomeIcon icon={faMobile} />
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                          name="mobile"
                          type="text"
                          value={this.state.mobile}
                          onChange={this.handleChange}
                          placeholder="Mobile Phone"
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Customer mobile number is required.
                        </Form.Control.Feedback>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col xs={12} md={6} lg={6}>
                    <FormGroup>
                      <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                          <InputGroup.Text id="basic-addon1">
                            <FontAwesomeIcon icon={faPhone} />
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                          name="phone"
                          type="text"
                          value={this.state.phone}
                          onChange={this.handleChange}
                          placeholder="Phone"
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={12} lg={12}>
                    <FormGroup>
                      <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                          <InputGroup.Text id="basic-addon1">
                            <FontAwesomeIcon icon={faAddressCard} />
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                          name="address1"
                          as="textarea"
                          value={this.state.address1}
                          onChange={this.handleChange}
                          placeholder="address-1"
                          required
                        />

                        <Form.Control.Feedback type="invalid">
                          Address is required.
                        </Form.Control.Feedback>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={12} lg={12}>
                    <FormGroup>
                      <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                          <InputGroup.Text id="basic-addon1">
                            <FontAwesomeIcon icon={faAddressCard} />
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                          name="address2"
                          as="textarea"
                          value={this.state.address2}
                          onChange={this.handleChange}
                          placeholder="address-2"
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={12} lg={12}>
                    <SaveAlert
                      showAlert={this.state.showAlert}
                      onClose={this.onAlertDissmis}
                      alertStyle="success"
                      alertMessage="Successfully Saved!"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={12} lg={12}>
                    <div className="pull-right">
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={this.onSaveClick}
                      >
                        Save
                      </Button>{" "}
                      <Button
                        variant="danger"
                        size="lg"
                        onClick={this.onCancelClick}
                      >
                        Cancel
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </div>
        <div style={{ position:'fixed', top: 'calc(100% - 80px)', width: '100%' }}>
        <Footer />
        </div>           
        
      </div>
    );
  }
}
