import { ADD_USER, FETCH_USER_FAILURE, FETCH_USER_REQUEST, FETCH_USER_SUCCESS } from 'actions/user.action';

const initialValue = {
  isLoading: false,
  message: null,
  users: [],
}

const reducer = (state = initialValue, { type, payload }) => {
  switch(type) {
    case ADD_USER: {
      return {
        ...state,
        users: [...state.users, payload],
      }
    }

    case FETCH_USER_REQUEST: {
      return {
        ...state,
        isLoading: true,
        message: null
      }
    }

    case FETCH_USER_FAILURE: {
      return {
        ...state,
        isLoading: false,
        message: payload.message
      }
    }

    case FETCH_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        message: null,
        users: payload
      }
    }

    default: {
      return state;
    }
  }
}

export default reducer;