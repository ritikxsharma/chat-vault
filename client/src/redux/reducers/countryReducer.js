const initialState = {
    callingCodes: [],
    countryName: [],
    countryFlags: []
}


const countryReducer = (state = initialState, action) =>{
    switch(action.type){
        case 'SET_COUNTRY_DATA':
            return{
                ...state,
                callingCodes: action.payload.callingCodes,
                countryNames: action.payload.countryNames,
                countryFlags: action.payload.countryFlags
            }
        default:
            return state
    }
}

export default countryReducer