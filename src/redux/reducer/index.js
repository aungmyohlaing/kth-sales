import { combineReducers } from 'redux'
import { users, itemsIsLoading, isModalShow, getUserId } from './users';
import { customer } from './customer';

export default combineReducers({
    users,
    itemsIsLoading,
    isModalShow,
    getUserId,
    customer
});