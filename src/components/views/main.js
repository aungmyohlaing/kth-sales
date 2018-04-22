import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './login/login';
import Home from './home/home';
import Register from './register/register';
import Thankyou from './register/thankyou';
import Customer from './customers/addcustomer';
import CustomerList from './customers/customerlist';
import CustomerDetail from './customers/details';
import Capital from './capital/addcalpital';
import Collection from './daily/collection';
import NewVoucher from './voucher/newVoucher';
import ResetPassword from './forget_password/forget';
import ReturnItems from './voucher/returnitems';

const Main = () => (
    <main>
        <Router>
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/home" component={Home}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/thankyou" component={Thankyou}/>
                <Route exact path="/customer/add" component={Customer}/>                                         
                <Route exact path="/customer/list" component={CustomerList}/>              
                <Route exact path="/customer/detail/:id" component={CustomerDetail}/>
                <Route exact path="/capital" component={Capital}/>
                <Route exact path="/collection" component={Collection}/>
                <Route exact path="/newvoucher" component={NewVoucher}/>
                <Route exact path="/reset" component={ResetPassword}/>
                <Route exact path="/returnitems" component={ReturnItems}/>
            </Switch>
        </Router>
    </main>
)

export default Main;