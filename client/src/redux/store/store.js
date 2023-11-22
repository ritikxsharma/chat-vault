import {
    createStore,
    combineReducers
} from 'redux'
import authReducer from '../reducers/authReducer'
import userReducer from '../reducers/userReducer'
import countryReducer from '../reducers/countryReducer'


const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    country: countryReducer
})

const store = createStore(rootReducer)

export default store