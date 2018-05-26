import { combineReducers } from 'redux'
import { users, itemsIsLoading, isModalShow, getUserId } from './users';

export default combineReducers({
    users,
    itemsIsLoading,
    isModalShow,
    getUserId
});