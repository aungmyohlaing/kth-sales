import { LOAD_CUSTOMER_BY_ID } from "../constants/action-types";


export function customer(state = {}, action) {
    switch (action.type) {
        case LOAD_CUSTOMER_BY_ID:
            return action.customer;        
        default:
            return state;
    }
}