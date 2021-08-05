export const LOGIN_SUCCESS = "AUTH/LOGIN_SUCCESS";
export const LOGIN_FAILURE = "AUTH/LOGIN_FAILURE";
export const LOGOUT = "AUTH/LOGOUT";
export const REGISTER_SUCCESS = "AUTH/REGISTER_SUCCESS";
export const REGISTER_FAILURE = "AUTH/REGISTER_FAILURE";


const user = localStorage.getItem("user");
const initState = user ? { user, isSignedIn: true, isSignedUp: false, signInMessage: null, signUpMessage: null } : { user: null, isSignedIn: false, isSignedUp: false, signInMessage: null, signUpMessage: null };

const reducer = (state = initState, { type, payload }) => {
  switch(type) {
    case LOGIN_SUCCESS: {
      return {
        ...state,
        user: payload,
        isSignedIn: true,
        signInMessage: null
      }
    }

    case LOGIN_FAILURE: {
      return {
        ...state,
        user: null,
        isSignedIn: false,
        signInMessage: payload.message
      }
    }

    case LOGOUT: {
      return {
        ...state,
        user: null,
        isSignedIn: false
      }
    }

    case REGISTER_SUCCESS: {
      return {
        ...state,
        isSignedUp: true,
        signUpMessage: null
      }
    }

    case REGISTER_FAILURE: {
      return {
        ...state,
        isSignedUp: false,
        signUpMessage: payload.message
      }
    }

    default: {
      return state;
    }
  }
}

export default reducer;