import React, { Component } from "react";
import {
  Row,
  Col,
  Form,
  FormControl,
  FormGroup,
  Button,
  Popover,
  OverlayTrigger,
} from "react-bootstrap";
import DateTimePicker from "../../commons/datepicker";
import moment from "moment";
import Select from "../../commons/selectComponet";
import SaveAlert from "../../commons/alert";
import Service from "./service";

export default class frmVoucher extends Component {
  constructor(props) {
    super(props);

    this.state = {
      voucherdate: new Date(),
      voucherno: "",
      itemno: "",
      itemname: "",
      currentqty: "",
      quantity: "",
      price: "",
      amount: "",
      selectedOptions: "",
      selectValidation: null,
      vouchernoValidation: null,
      itemnoValidation: null,
      itemnameValidation: null,
      quantityValidation: null,
      priceValidation: null,
      showAlert: false,
      alertStyle: "",
      alertMsg: "",
      createdate: moment(),
      voucherData: [
        {
          customerid: "",
          voucherno: "",
        },
      ],
      itemsData: [
        {
          voucherno: "",
          itemno: "",
        },
      ],
      selectTo: "",
      validated: false,
    };

    this.DatehandlerChange = this.DatehandlerChange.bind(this);
    this.onhandlerChange = this.onhandlerChange.bind(this);
    this.onHandlerKeyDown = this.onHandlerKeyDown.bind(this);
    this.onSaveClick = this.onSaveClick.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
    this.onhandleDissmis = this.onhandleDissmis.bind(this);
    this.alertDissmis = this.alertDissmis.bind(this);
    this.onCancelClick = this.onCancelClick.bind(this);
    this.selectedItemsHandleChange = this.selectedItemsHandleChange.bind(this);
  }

  // componentDidMount() {
  //     if (this.props.formtype === 'newvoucher'){
  //         this.setState({ selectTo: 'customers' });
  //         console.log("Select To", this.state.selectTo);
  //     }
  //     else this.setState({ selectTo: 'return-customers' });
  // }

  /**
   *
   * Set Current Date to Datepicker
   */
  DatehandlerChange(date) {
    this.setState({ voucherdate: date });
  }

  /*
    On Change event on Textbox and reset validation to null
    */
  onhandlerChange(e) {
    var name = e.target.name;
    this.setState({ [name]: e.target.value });
    this.setState({
      vouchernoValidation: null,
      itemnoValidation: null,
      itemnameValidation: null,
      priceValidation: null,
      quantityValidation: null,
    });
  }
  /**
   *
   * Enter on price text box to calculated amount to show
   */
  onHandlerKeyDown(e) {
    if (e.keyCode === 13) {
      var amount = this.state.price * this.state.quantity;
      this.setState({ amount: amount });
    }
  }

  /**
   * Dissmis alert when click on alert show after save successfully.
   */

  onhandleDissmis() {
    this.setState({ showAlert: false });
  }

  /**
   * Hide alert with timer
   */
  alertDissmis() {
    setTimeout(() => {
      this.setState({ showAlert: false });
    }, 3000);
  }

  /**
   *
   * Handle lost focus on price and quantity text box to calculate amount
   */
  handleOnBlur(e) {
    var amount = this.state.price * this.state.quantity;
    this.setState({ amount: amount });
  }

  /**
   * On change on Customer Select control
   */
  selectedHandleChange = (selectedOptions) => {
    this.setState({ selectedOptions, selectValidation: null });
    if (selectedOptions === null || selectedOptions === undefined) {
      //console.log('Selected Value Null');
      this.setState({ selectedOptions: "" });
    } else {
      Service()
        .getVocById(selectedOptions.value)
        .then((res) => {
          this.setState({ voucherData: res, itemsData: "", itemname: "" });
        });
    }
    //console.log(`Selected: ${selectedOptions.value}`);
  };

  selectedVoucherNoHandleChange = (voucherno) => {
    this.setState({ voucherno, vouchernoValidation: null });
    if (voucherno === null || voucherno === undefined) {
      //console.log('Selected Value Null');
      this.setState({ voucherno: "" });
    } else {
      Service()
        .getItemByVoc(this.state.selectedOptions.value, voucherno.value)
        .then((res) => {
          this.setState({ itemsData: res, itemname: "", currentqty: "" });
        });
    }
    //console.log(`Selected:`, this.state.selectedOptions.value);
  };

  selectedItemsHandleChange = (itemno) => {
    this.setState({ itemno, itemnoValidation: null });
    if (itemno === null || itemno === undefined) {
      //console.log('Selected Value Null');
      this.setState({ itemno: "" });
    } else {
      Service()
        .getItemById(this.state.voucherno.value, itemno.value)
        .then((res) => {
          this.setState({
            itemname: res[0].itemname,
            currentqty: res[0].quantity,
            price: res[0].price,
          });
        });
    }
  };

  /**
   * Save data to mongo DB
   */
  onSaveClick() {
    var numbers = /^[0-9]+$/;

    if (
      this.state.selectedOptions === "" ||
      this.state.selectedOptions === undefined
    ) {
      this.setState({ selectValidation: "error", validated: true });
    } else if (
      this.state.voucherno === "" ||
      this.state.voucherno === undefined
    ) {
      this.setState({ vouchernoValidation: "error", validated: true });
    } else if (this.state.itemno === "" || this.state.itemno === undefined) {
      this.setState({ itemnoValidation: "error", validated: true });
    } else if (
      this.state.itemname === "" ||
      this.state.itemname === undefined
    ) {
      this.setState({ itemnameValidation: "error", validated: true });
    } else if (
      this.state.quantity === "" ||
      this.state.quantity === undefined
    ) {
      this.setState({ quantityValidation: "error", validated: true });
    } else if (this.state.price === "" || this.state.price === undefined) {
      this.setState({ priceValidation: "error", validated: true });
    } else if (!this.state.quantity.match(numbers)) {
      this.setState({ quantityValidation: "error", validated: true });
    } else {
      this.setState({ validated: false });

      if (this.props.formtype === "customers") {
        if (!this.state.price.match(numbers)) {
          this.setState({ priceValidation: "error", validated: true });
        } else {
          let newVoucherCollection = {
            customerid: this.state.selectedOptions.value,
            voucherdate: this.state.voucherdate,
            voucherno: this.state.voucherno,
            itemno: this.state.itemno,
            itemname: this.state.itemname,
            quantity: this.state.quantity,
            price: this.state.price,
            amount: this.state.amount,
            createdate: moment(),
          };

          Service()
            .newvoucher_save(newVoucherCollection)
            .then((res) => {
              let updateCustomer = {
                customerid: this.state.selectedOptions.value,
                amount: this.state.amount,
              };

              Service()
                .newvoucher_update_customer(updateCustomer)
                .then((res) => {
                  this.onCancelClick();
                  this.setState({
                    showAlert: true,
                    alertStyle: "success",
                    alertMsg: "Successfully Saved!",
                  });
                  this.alertDissmis();
                });
            });
        }
      } else {
        if (this.state.quantity > this.state.currentqty) {
          this.setState({ quantityValidation: "error" });
          this.setState({
            showAlert: true,
            alertStyle: "danger",
            alertMsg: "Return Quantity Can't Be More Then Current Quantity!",
          });
          this.alertDissmis();
        } else {
          let returnItemCollection = {
            customerid: this.state.selectedOptions.value,
            returndate: this.state.voucherdate,
            voucherno: this.state.voucherno.value,
            itemno: this.state.itemno.value,
            itemname: this.state.itemname,
            quantity: this.state.quantity,
            price: this.state.price,
            amount: this.state.amount,
            createdate: moment(),
          };

          Service()
            .returnitem_save(returnItemCollection)
            .then((res) => {
              console.log("Return Item Save", res);
              let updateCustomer = {
                customerid: this.state.selectedOptions.value,
                amount: this.state.amount,
              };

              Service()
                .returnitem_update_customer(updateCustomer)
                .then((res) => {
                  let updateVoucher = {
                    customerid: this.state.selectedOptions.value,
                    voucherno: this.state.voucherno.value,
                    itemno: this.state.itemno.value,
                    quantity: this.state.quantity,
                    amount: this.state.amount,
                  };

                  Service()
                    .returnitem_update_voucher(updateVoucher)
                    .then((res) => {
                      this.onCancelClick();
                      this.setState({
                        showAlert: true,
                        alertStyle: "success",
                        alertMsg: "Successfully Saved!",
                      });
                      this.alertDissmis();
                    });
                });
            });
        }
      }
    }
  }

  /**
   * Clear text fields, Sekect abd date control
   */

  onCancelClick() {
    this.setState({
      voucherdate: new Date(),
      voucherno: "",
      itemno: "",
      itemname: "",
      quantity: "",
      price: "",
      amount: "",
      selectedOptions: "",
      selectValidation: null,
      vouchernoValidation: null,
      itemnoValidation: null,
      itemnameValidation: null,
      quantityValidation: null,
      priceValidation: null,
      showAlert: false,
      voucherData: "",
      itemsData: "",
      currentqty: "",
      validated: false
    });
  }

  render() {
    var self = this;
    const { formtype } = this.props;
    /**
     * Show pop up messages on price and quantity
     */
    const popoverFocus = (
      <Popover id="popover-positioned-scrolling-left" title="">
        Please enter numbers only.
      </Popover>
    );

    return (
      <div>
        <Form noValidate validated={this.state.validated}>
          <Row>
            <Col sm={12} md={6} lg={6}>
              <Form.Group>
                <Form.Label>Customers</Form.Label>
                <Select
                  selectedOptions={this.state.selectedOptions}
                  selectedHandleChange={this.selectedHandleChange}
                  placeHolder="Select a customer"
                  selectTo={formtype}
                />
                <Form.Control
                  type="text"
                  name="selectCustomer"
                  onChange={this.onhandlerChange}
                  value={this.state.selectedOptions}
                  placeholder="Customer"
                  style={{ opacity: "0", position: "absolute" }}
                  required
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  Customer is required.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col sm={12} md={6} lg={6}>
              <Form.Group>
                <Form.Label>Voucher Date</Form.Label>
                <DateTimePicker
                  selected={this.state.voucherdate}
                  onChange={this.DatehandlerChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={6} lg={6}>
              <Form.Group>
                <Form.Label>Voucher No.</Form.Label>

                {formtype === "customers" ? (
                  <Form.Control
                    name="voucherno"
                    type="text"
                    value={self.state.voucherno}
                    onChange={self.onhandlerChange}
                    placeholder="Voucher No."
                    required
                  ></Form.Control>
                ) : (
                  <div>
                    <Select
                      selectedOptions={self.state.voucherno}
                      selectedHandleChange={self.selectedVoucherNoHandleChange}
                      placeHolder="Select a voucher"
                      selectTo="voucherno"
                      voudata={self.state.voucherData}
                    ></Select>
                    <Form.Control
                      type="text"
                      name="selectVno"
                      onChange={self.onhandlerChange}
                      value={self.state.voucherno}
                      placeholder="Voucher No."
                      style={{ opacity: "0", position: "absolute" }}
                      required
                    ></Form.Control>
                    <Form.Control.Feedback type="invalid">
                      Voucher number is required.
                    </Form.Control.Feedback>
                  </div>
                )}
              </Form.Group>
            </Col>
            <Col sm={12} md={6} lg={6}>
              <Form.Group>
                <Form.Label>Item No.</Form.Label>
                {formtype === "customers" ? (
                  <FormControl
                    name="itemno"
                    type="text"
                    value={this.state.itemno}
                    onChange={this.onhandlerChange}
                    placeholder="Item No."
                    required
                  />
                ) : (
                  <div>
                    <Select
                      selectedOptions={self.state.itemno}
                      selectedHandleChange={self.selectedItemsHandleChange}
                      placeHolder="Select a item"
                      selectTo="itemno"
                      itemdata={self.state.itemsData}
                    />
                    <Form.Control
                      type="text"
                      name="selectItem"
                      onChange={this.onhandlerChange}
                      value={this.state.itemno}
                      placeholder="Item No."
                      style={{ opacity: "0", position: "absolute" }}
                      required
                    ></Form.Control>
                    <Form.Control.Feedback type="invalid">
                      Item number is required.
                    </Form.Control.Feedback>
                  </div>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={6} lg={6}>
              <Form.Group>
                <Form.Label>Item Name</Form.Label>
                <Form.Control
                  name="itemname"
                  type="text"
                  value={this.state.itemname}
                  onChange={this.onhandlerChange}
                  placeholder="Item Name"
                  readOnly={formtype === "returnvoucher" ? true : false}
                  required={formtype === "returnvoucher" ? false : true}
                />
                <Form.Control.Feedback type="invalid">
                  Item name is required.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            {formtype !== "returnvoucher" ? (
              <Col sm={12} md={6} lg={6}>
                <FormGroup>
                  <Form.Label>Quantity</Form.Label>
                  <OverlayTrigger
                    trigger="focus"
                    placement="bottom"
                    overlay={popoverFocus}
                  >
                    <FormControl
                      name="quantity"
                      type="text"
                      value={this.state.quantity}
                      onChange={this.onhandlerChange}
                      onBlur={this.handleOnBlur}
                      placeholder="Quantity"
                      maxLength={5}
                      required
                    />
                  </OverlayTrigger>
                  <Form.Control.Feedback type="invalid">
                    Quantity is required.
                  </Form.Control.Feedback>
                </FormGroup>
              </Col>
            ) : (
              <Row style={{ margin: "0px" }}>
                <Col sm={12} md={3} lg={3}>
                  <Form.Group>
                    <Form.Label>Current Quantity</Form.Label>
                    <Form.Control
                      name="currentqty"
                      type="text"
                      value={this.state.currentqty}
                      placeholder="Current Quantity"
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col sm={12} md={3} lg={3}>
                  <Form.Group>
                    <Form.Label>Return Quantity</Form.Label>
                    <OverlayTrigger
                      trigger="focus"
                      placement="bottom"
                      overlay={popoverFocus}
                    >
                      <FormControl
                        name="quantity"
                        type="text"
                        value={this.state.quantity}
                        onChange={this.onhandlerChange}
                        onBlur={this.handleOnBlur}
                        placeholder="Quantity"
                        maxLength={5}
                      />
                    </OverlayTrigger>
                    <Form.Control.Feedback type="invalid">
                      Return quantity is required.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
            )}
          </Row>
          <Row>
            <Col sm={12} md={6} lg={6}>
              <FormGroup>
                <Form.Label>Price</Form.Label>
                <OverlayTrigger
                  trigger="focus"
                  placement="bottom"
                  overlay={popoverFocus}
                >
                  <FormControl
                    name="price"
                    type="text"
                    value={this.state.price}
                    onChange={this.onhandlerChange}
                    onKeyDown={this.onHandlerKeyDown}
                    onBlur={this.handleOnBlur}
                    placeholder="Price"
                    readOnly={formtype === "returnvoucher" ? true : false}
                    required={formtype === "returnvoucher" ? false : true}
                  />
                </OverlayTrigger>
                <Form.Control.Feedback type="invalid">
                  Price is required.
                </Form.Control.Feedback>
              </FormGroup>
            </Col>
            <Col sm={12} md={6} lg={6}>
              <FormGroup>
                <Form.Label>Amount</Form.Label>{" "}
                <FormControl
                  name="amount"
                  type="text"
                  value={this.state.amount}
                  onChange={this.onhandlerChange}
                  placeholder="Amount"
                  readOnly={true}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12} lg={12}>
              <SaveAlert
                showAlert={this.state.showAlert}
                onDismiss={this.onhandleDissmis}
                alertStyle={this.state.alertStyle}
                alertMessage={this.state.alertMsg}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={12} lg={12}>
              <div className="pull-right">
                <Button variant="primary" size="lg" onClick={this.onSaveClick}>
                  Save
                </Button>{" "}
                <Button variant="danger" size="lg" onClick={this.onCancelClick}>
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
