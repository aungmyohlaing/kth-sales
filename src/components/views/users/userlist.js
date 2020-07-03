import React, { Component } from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap';
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
                    <h2>Users <small>user lists</small></h2>
                    <hr/>
                    <div style={{ marginBottom: "20px" }}>
                        <ButtonToolbar>
                            <Button size="lg" variant="primary" onClick={this.onAddUserClick} >Add User</Button>
                        </ButtonToolbar>
                    </div>                   
                    <UserList />
                </div>                
                <Footer />
            </div>
        )
    }
}

