
let initialState = {
  isUserLoggedIn: !!window.localStorage.getItem('isUserLoggedIn'),
}
const data = window.localStorage.getItem('data')
if(data && data.length){
 const newData = JSON.parse(data)
 initialState={
   ...initialState,
   ...newData
 }
}

export default function userReducer(state = initialState, action) {

  switch (action.type) {
    case 'USER_LOGIN': {
      if (action.data) {
        window.localStorage.setItem('isUserLoggedIn', true)
        window.localStorage.setItem('data', JSON.stringify(action.data))
       
        return {
          ...state,
          ...action.data,
          isUserLoggedIn: true
        }
      }
      return {}
    }
    case 'USER_DETAILS_UPDATE': {
      if (action.data) {
     
        window.localStorage.setItem('data', JSON.stringify( {
          ...state,
          ...action.data,
          isUserLoggedIn: true
        }))
        
        return {
          ...state,
          ...action.data,
          isUserLoggedIn: true
        }
      }
      return state
    }
    case 'USER_RESET': {
      window.localStorage.clear();
      return {}
    }
    default:
      return state
  }
}
