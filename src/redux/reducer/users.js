import {
    LOAD_DATA_SUCCESS,
    DELETE_USER,
    ITEMS_IS_LOADING,
    SHOW_MODAL,
    GET_USER_ID
} from '../constants/action-types'

export function itemsIsLoading(state = false, action) {
    switch (action.type) {
        case ITEMS_IS_LOADING:
            return action.isLoading;
        default:
            return state;
    }
}

export function isModalShow(state = false, action) {
    switch (action.type) {
        case SHOW_MODAL:
            return action.showModal;
        default:
            return state;
    }
}

export function getUserId (state = '' , action) {
    switch (action.type) {
        case GET_USER_ID:
            return action.userId
        default:
            return state
    }
}

export function users(state = [], action) {
    switch (action.type) {
        case LOAD_DATA_SUCCESS:
            return action.users;        
        case DELETE_USER:
            return state.filter(state => state._id !== action.id)
        default:
            return state;
    }
}
