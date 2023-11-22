import {
    authActions,
} from '../actions/authActions'

const initialState = {
    isAuthenticated: false,
    user: null,
    error: null
}

const authReducer = (state = initialState, action) =>{
    switch(action.type){
        case authActions.LOGIN_REQUEST:
            console.log(action);
            return{
                ...state,
                user: action.payload,
                error: null
            }
        case authActions.LOGIN_SUCCESS:
            return{
                ...state,
                isAuthenticated: true,
            }
        case authActions.LOGIN_FAILURE:
            return{
                ...state,
                isAuthenticated: false,
                error: action.error
            }
        default:
            return state
    }
}

export default authReducer