import userService from '../../components/views/users/service';
import { 
    LOAD_DATA_SUCCESS, 
    DELETE_USER, 
    ITEMS_IS_LOADING, 
    SHOW_MODAL,
    GET_USER_ID } from '../constants/action-types';
import Storage from '../../components/commons/localStogare';

export function itemsIsLoading(bool) {
    return {
        type: ITEMS_IS_LOADING,
        isLoading: bool
    };
}

export function isModalShow(bool){
    return {
        type: SHOW_MODAL,
        showModal: bool
    }
}

export function getUserId (id){
    return {
        type: GET_USER_ID,
        userId: id
    }
}

export function LoadDataSuccess(users) {    
    return {
        type: LOAD_DATA_SUCCESS ,
        users
    };
}

export function FetchUserData() {        
    return (dispatch) => {
        var userinfo = Storage(localStorage).get('userinfo');
        
        dispatch(itemsIsLoading(true));

        userService().getUsersNotEq(userinfo.userid)
        .then(res => { 
            dispatch(itemsIsLoading(false));      
              
            return res;            

        })        
        .then((res) => res)        
        .then((users) => dispatch(LoadDataSuccess(users)));
    }
}

export function DeleteUserSuccess(id) {
    return {
        type: DELETE_USER,
        id
    }
           
}

export function DeleteUser(id) {    
    return (dispatch) => {
        userService().delete(id)
        .then(res => {           
            dispatch(DeleteUserSuccess(id));
            dispatch(isModalShow(false));
            return "Delete Successfully!";

        })                       
        
    }
}