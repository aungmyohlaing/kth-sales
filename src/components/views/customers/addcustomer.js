import React, { Component } from 'react';
import { PageHeader, Grid, Row, Col, Image, Form, FormGroup, FormControl, ControlLabel, Button, ButtonToolbar } from 'react-bootstrap';
import Header from '../../header';
import Footer from '../../footer';
import userlogo from '../../images/user-placeholder.jpg';
import axios from 'axios';
import SaveAlert from '../../commons/alert';


export default class Customer extends Component {

    constructor(props){
        super(props);

        this.state={
            name:'',
            email:'',
            mobile:'',
            phone:'',
            salesamount:'',           
            address1:'',
            address2:'',
            nameValidation:null,
            mobileValidation:null,
            address1Validation:null,
            showAlert: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSaveClick = this.onSaveClick.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
        this.onAlertDissmis = this.onAlertDissmis.bind(this);

    }

    handleChange(event){
        var name = event.target.name;
        this.setState({[name]: event.target.value});
        this.setState({ nameValidation:null, mobileValidation:null, address1Validation:null })
    }

    onAlertDissmis(){
        setTimeout(()=>{
            this.setState({showAlert:false});
        }, 3000);
    }


    onSaveClick(){

        if (this.state.name === null || this.state.name === ''){
            this.setState({nameValidation:'error'});
        }
        else if (this.state.mobile === null || this.state.mobile === ''){
            this.setState({mobileValidation:'error'});
        }
        else if (this.state.address1 === null || this.state.address1 === ''){
            this.setState({address1Validation:'error'});
        }
        else {
            let customers = {
                name:this.state.name,
                email:this.state.email,
                mobile:this.state.mobile,
                phone:this.state.phone,
                salesamount: this.state.salesamount,
                currentamount: this.state.salesamount,
                address1:this.state.address1,
                address2:this.state.address2
            }
    
            axios.post('http://localhost:3001/api/customer',customers)
            .then(res => {                
                this.setState({showAlert:true});
                this.onAlertDissmis();
                this.onCancelClick();
            })
            .catch(err =>{
                console.log(err);
            })
        }
        
    }

    onCancelClick(){
        this.setState({
            name:'',
            email:'',
            mobile:'',
            phone:'',
            salesamount:'',            
            address1:'',
            address2:'',
            nameValidation:null, 
            mobileValidation:null, 
            address1Validation:null
        })
    }



    render() {
        return (
            <div>
                <Header />
                <div id="mainview" className="container">
                    <PageHeader>
                        Customers <small>add new customer</small>
                    </PageHeader>
                    <Grid>
                        <Form>

                            <Row>
                                <Col xs={12} md={2} lg={2}>
                                    <Image src={userlogo} circle thumbnail />
                                </Col>
                                <Col xs={12} md={10} lg={10}>
                                    <Grid fluid={true}>
                                        <Row>
                                            <Col xs={12} md={5} lg={5}>
                                                <FormGroup validationState={this.state.nameValidation}>
                                                    <ControlLabel>Customer Name</ControlLabel>
                                                    <FormControl 
                                                    name="name" 
                                                    type="text" 
                                                    value={this.state.name}
                                                    onChange={this.handleChange}
                                                    placeholder="Name"  />

                                                    <FormControl.Feedback />
                                                </FormGroup>
                                            </Col>
                                            <Col xs={12} md={5} lg={5}>
                                                <FormGroup>
                                                    <ControlLabel>Customer Email</ControlLabel>
                                                    <FormControl name="email" type="text" 
                                                    value={this.state.email}
                                                    onChange={this.handleChange}
                                                    placeholder="email" />

                                                    <FormControl.Feedback />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={12} md={5} lg={5}>
                                                <FormGroup validationState={this.state.mobileValidation}>
                                                    <ControlLabel>Customer Mobile</ControlLabel>
                                                    <FormControl name="mobile" 
                                                    type="text"
                                                    value={this.state.mobile}
                                                    onChange={this.handleChange} 
                                                    placeholder="mobile" />

                                                    <FormControl.Feedback />
                                                </FormGroup>
                                            </Col>
                                            <Col xs={12} md={5} lg={5}>
                                                <FormGroup>
                                                    <ControlLabel>Customer phone</ControlLabel>
                                                    <FormControl name="phone" 
                                                    type="text"
                                                    value={this.state.phone}
                                                    onChange={this.handleChange}
                                                    placeholder="phone" />

                                                    <FormControl.Feedback />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={12} md={10} lg={10}>
                                                <FormGroup validationState={this.state.address1Validation}>
                                                    <ControlLabel>Customer Address-1</ControlLabel>
                                                    <FormControl name="address1" 
                                                    componentClass="textarea" 
                                                    value={this.state.address1}
                                                    onChange={this.handleChange}
                                                    placeholder="address-1" />

                                                    <FormControl.Feedback />
                                                </FormGroup>
                                            </Col>                                            
                                        </Row>
                                        <Row>
                                            <Col xs={12} md={10} lg={10}>
                                                <FormGroup>
                                                    <ControlLabel>Customer Address-2</ControlLabel>
                                                    <FormControl name="address2" componentClass="textarea" 
                                                    value={this.state.address2}
                                                    onChange={this.handleChange}
                                                    placeholder="address-2" />

                                                    <FormControl.Feedback />
                                                </FormGroup>
                                            </Col>                                            
                                        </Row>
                                        <Row>
                                            <Col xs={12} md={5} lg={5}>
                                                <FormGroup>
                                                    <ControlLabel>Sales Amount</ControlLabel>
                                                    <FormControl name="salesamount" type="text" 
                                                    value={this.state.salesamount}
                                                    onChange={this.handleChange}
                                                    placeholder="Enter Sales Amount" />

                                                    <FormControl.Feedback />
                                                </FormGroup>
                                            </Col>                                                                                        
                                        </Row>
                                        <Row>
                                            <Col xs={12} md={10} lg={10}>
                                                <SaveAlert 
                                                showAlert={this.state.showAlert} 
                                                onDismiss={this.onAlertDissmis} 
                                                alertStyle="success" 
                                                alertMessage="Successfully Saved!" />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={12} md={10} lg={10} >
                                                <ButtonToolbar className="pull-right" >
                                                    <Button bsStyle="primary" onClick={this.onSaveClick} >Save</Button>
                                                    <Button bsStyle="danger" onClick={this.onCancelClick} >Cancel</Button>
                                                </ButtonToolbar>
                                            </Col>                                            
                                        </Row>
                                    </Grid>
                                </Col>
                            </Row>
                        </Form>
                    </Grid>
                </div>
                <Footer/>
            </div>
        )
    }
}