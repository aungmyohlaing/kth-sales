import React, { Component } from 'react';
import { PageHeader, ButtonToolbar, Button } from 'react-bootstrap';
import Header from '../../header';
import Footer from '../../footer';
import UserList from './users';

export default class Users extends Component {

    constructor(props) {
        super(props);        

        this.onAddUserClick = this.onAddUserClick.bind(this);       
    }    

    onAddUserClick() {
        const { history } = this.props;
        history.push('/register');
    }
       
    render() {
        return (
            <div>
                <Header />
                <div id="mainview" className="container" style={{'marginBottom':'162px'}}>
                    <PageHeader>Users <small>user lists</small></PageHeader>
                    <div style={{ marginBottom: "20px" }}>
                        <ButtonToolbar>
                            <Button bsSize="large" bsStyle="primary" onClick={this.onAddUserClick} >Add User</Button>
                        </ButtonToolbar>
                    </div>                   
                    <UserList />
                </div>                
                <Footer />
            </div>
        )
    }
}

