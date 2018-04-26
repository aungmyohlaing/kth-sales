import React, { Component } from 'react';
import { PageHeader, Row, Form, FormControl, FormGroup, InputGroup } from 'react-bootstrap';
import Service from './service';
import Header from '../../header';
import Footer from '../../footer';
import UserCards from '../../commons/userCard';

export default class CustomerList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            customers: [
                {
                    _id: '',
                    name: '',
                    email: '',
                    mobile: '',
                    phone: '',
                    currentamount: '',
                    salesamount:'',
                    address1: '',
                    address2: ''
                }
            ],
            searchresult: [
                {
                    _id: '',
                    name: '',
                    email: '',
                    mobile: '',
                    phone: '',
                    currentamount: '',
                    salesamount:'',
                    address1: '',
                    address2: ''
                }
            ],
            search:''
        }

        this.onHandleChange = this.onHandleChange.bind(this);
        this.checkname = this.checkname.bind(this);
    }

    componentDidMount() {
        Service().get().then(res => {
            this.setState({ customers: res, searchresult: res });           
        })

    }

    checkname(customer) {
        return customer.name === 'STK';
    }

    onHandleChange(e){
        var name = e.target.name;        
        this.setState({[name]:e.target.value});

        var SearchResult = this.state.customers.filter(function(customer){                  
            var nidex = customer.name.toLowerCase().indexOf(e.target.value.toLowerCase());
            if (nidex !== -1){
                return customer;
            } else return null;
             
        });
        
        this.setState({searchresult: SearchResult});        
    }

    render() {
        
        return (
            <div>
                <Header />
                <div id="mainview" className="container">
                    <PageHeader>Customer <small>List</small></PageHeader>
                    <Form>
                        <FormGroup bsSize="large">
                            <InputGroup>
                                <InputGroup.Addon><i className="fa fa-search fa" aria-hidden="true"></i></InputGroup.Addon>
                                <FormControl type="text" 
                                name="search"
                                placeholder="Search.."
                                value={this.state.search}
                                onChange={this.onHandleChange} />
                            </InputGroup>
                        </FormGroup>
                    </Form>
                    <Row>          
                        {/* Users Card Component */}
                        <UserCards dataList={this.state.searchresult} />                                 
                    </Row>
                </div>
                <Footer/>
            </div>
        )
    }
}