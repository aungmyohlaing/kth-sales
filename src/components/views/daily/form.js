import React, { Component } from "react";
import {
  Form,
  FormControl,
  Row,
  Col,
  Button,
  InputGroup,
} from "react-bootstrap";
import Service from "./service";
import DateTimePicker from "../../commons/datepicker";
import moment from "moment";
import SaveAlert from "../../commons/alert";
import Select from "../../commons/selectComponet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHashtag,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";

export default class CollectionForm extends Component {    
  constructor(props) {
    super(props);

    this.state = {
      customerById: [
        {
          _id: "",
          name: "",
          email: "",
          mobile: "",
          phone: "",
          capital: "",
          address1: "",
          address2: "",
        },
      ],
      customerid: "",
      amount: "",
      voucherno: "",
      selectedDate: new Date(),
      createDate: moment(),
      selectedOptions: "",      
      amountValidation: false,
      showAlert: false,
      alertStyle: "",
      alertMessage: "",
      cuamount: "",
      collectedamount: "",
      validated: false,
    };
   
    this.handlerChange = this.handlerChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.DatehandlerChange = this.DatehandlerChange.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onhandleDissmis = this.onhandleDissmis.bind(this);
    this.alertDissmis = this.alertDissmis.bind(this);
  }

  handlerChange(e) {
    var name = e.target.name;

    this.setState({
      [name]: e.target.value,
      voucherValidation: null,
      amountValidation: null,
      customerValidation: null,
    });
  }

  DatehandlerChange(date) {
    this.setState({ selectedDate: date });
  }

  onhandleDissmis() {
    this.setState({ showAlert: false });
  }

  selectedHandleChange = (selectedOptions) => {
      console.log("Selected Option" , selectedOptions)
    this.setState({ selectedOptions, selectValidation: null });
    if (selectedOptions === null || selectedOptions === undefined) {
      this.setState({ selectedOptions: "" });
    } else {
      Service()
        .getById(selectedOptions.value)
        .then((res) => {
          this.setState({
            customerById: res,
            voucherValidation: null,
            amountValidation: null,
            customerValidation: null,
            cuamount: "",
          });
        });
    }
  };

  alertDissmis() {
    setTimeout(() => {
      this.setState({ showAlert: false });
    }, 3000);
  }

  onSave() {

    const amountExpression = /^[0-9/./]*$/;
    let validAmount = amountExpression.test(
      String(this.state.amount).toLowerCase()
    );

    if (
      this.state.selectedOptions === undefined ||
      this.state.selectedOptions === ""
    ) {
      this.setState({ selectValidation: "error", validated: true });
    } else if (
      this.state.voucherno === undefined ||
      this.state.voucherno === ""
    ) {
      this.setState({ voucherValidation: "error", validated: true });
    } else if (this.state.amount === undefined || this.state.amount === "") {
        console.log('Amount', this.state.amount);
      this.setState({ validated: true});
    } else if (!validAmount) {
        this.setState({ amountValidation: true, validated: true });
    }
    else {
      Service()
        .checkVoucher(this.state.customerById._id, this.state.voucherno)
        .then((res) => {
          if (res) {
              this.setState({ validated: false });
            let collectionData = {
              customerid: this.state.customerById._id,
              voucherno: this.state.voucherno,
              selectedDate: this.state.selectedDate,
              createDate: this.state.createDate,
              amount: this.state.amount,
            };           

            Service()
              .save(collectionData)
              .then((res) => {
                let updatedAmount =
                  this.state.customerById.currentamount - this.state.amount;
                let updateCustomerAmt = {
                  customerid: this.state.customerById._id,
                  currentamount: updatedAmount,
                };

                Service()
                  .update_customer(updateCustomerAmt)
                  .then((res) => {
                    this.onCancel();
                  });

                this.setState({
                  showAlert: true,
                  alertStyle: "success",
                  alertMessage: "Successfully Saved!",
                });
                this.alertDissmis();
              });
          } else {
            this.setState({ voucherValidation: "error", validated: true });
            this.setState({
              showAlert: true,
              alertStyle: "danger",
              alertMessage: "Voucher number is not correct.",
            });
            this.alertDissmis();
          }
        });
    }
  }

  onCancel() {
    this.setState({
      customerById: "",
      selectedOptions: "",      
      selectedVoucherOptions: "",
      selectedDate: new Date(),
      amount: "",
      cuamount: "",
      collectedamount: "",
      customerid: "",
      voucherno: "",
      customerValidation: null,
      amountValidation: null,
      selectValidation: null,
      selectVoucherValidation: null,
      voucherValidation: null,
      validated: false
    });
    // this.setState(() => this.initialState);
  }

  render() {
    return (
      <div>
        <Form noValidate validated={this.state.validated}>
          <Row>
            <Col sm={12} md={6} lg={6}>
              <h4 className="collecth2">
                Sales Amount:{" "}
                {this.state.customerById.salesamount === undefined ? (
                  <span className="empty-span">
                    <br />
                    Please select a customer to see amount
                  </span>
                ) : (
                  this.state.customerById.salesamount + " MMK"
                )}
              </h4>
            </Col>
            <Col sm={12} md={6} lg={6}>
              <h4 className="collecth2">
                Current Amount:{" "}
                {this.state.customerById.currentamount === undefined ? (
                  <span className="empty-span">
                    <br />
                    Please select a customer to see amount
                  </span>
                ) : (
                  this.state.customerById.currentamount + " MMK"
                )}
              </h4>
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={6} lg={6}>
              <Form.Group>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">
                      <FontAwesomeIcon icon={faUser} />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  
                  <Select
                    selectedOptions={this.state.selectedOptions}
                    placeHolder="Select a customer"
                    selectedHandleChange={this.selectedHandleChange}
                    selectTo="return-customers"                                 
                  />
                 <Form.Control 
                    type="text"
                    name="select"
                    onChange={this.handlerChange}
                    value={this.state.selectedOptions}                    
                    placeholder="Customer"
                    style={{ opacity: '0', position: 'absolute' }}
                    required>

                 </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Customer is required.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col sm={12} md={6} lg={6}>
              <DateTimePicker
                selected={this.state.selectedDate}
                onChange={this.DatehandlerChange}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={6} lg={6}>
              <Form.Group>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">
                      <FontAwesomeIcon icon={faHashtag} />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    type="text"
                    name="voucherno"
                    value={this.state.voucherno}
                    onChange={this.handlerChange}
                    placeholder="Voucher Number"
                    autoComplete="off"
                    required
                  ></FormControl>

                  <Form.Control.Feedback type="invalid">
                    Voucher number is required.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col sm={12} md={6} lg={6}>
              <Row>
                <Col sm={12} md={12} lg={12}>
                  <Form.Group>
                    <InputGroup className="mb-3">
                      <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">
                          <FontAwesomeIcon icon={faMoneyBill} />
                        </InputGroup.Text>
                      </InputGroup.Prepend>

                      <FormControl
                        type="number"
                        name="amount"
                        value={this.state.amount}
                        onChange={this.handlerChange}
                        placeholder="Amount"
                        autoComplete="off"
                        required
                      ></FormControl>
                     
                      <Form.Control.Feedback type="invalid">
                        {/* <AmountCheck show={this.state.amountValidation} /> */}
                        Amount is required.
                      </Form.Control.Feedback>
                      
                    </InputGroup>
                    <span className="empty-span" style={{ fontSize: '9pt' }} >* Amount must be in number.</span>
                  </Form.Group>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12} lg={12}>
              <SaveAlert
                showAlert={this.state.showAlert}
                onClose={this.onhandleDissmis}
                alertStyle={this.state.alertStyle}
                alertMessage={this.state.alertMessage}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12} lg={12}>
              <div className="pull-right">
                <Button variant="primary" size="lg" onClick={this.onSave}>
                  Save
                </Button>{" "}
                <Button variant="danger" size="lg" onClick={this.onCancel}>
                  Cancel
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
