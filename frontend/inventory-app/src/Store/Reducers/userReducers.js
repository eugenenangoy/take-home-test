import ActionTypes from "../Constant/ActionTypes";

const initialStates = {
  IsAuth: null,
  error: null,
  user: null,
};

function userReducers(state = initialStates, action) {
  switch (action.type) {
    case ActionTypes.LOGIN_USER:
      return { ...state };
    case ActionTypes.LOGIN_USER_SUCCEED:
      return { ...state, IsAuth: action.payload };
    case ActionTypes.LOGIN_USER_FAILED:
      return { ...state, error: action.payload };
    case ActionTypes.REGISTER_USER:
      return { ...state };
    case ActionTypes.REGISTER_USER_SUCCEED:
      return { ...state, user: action.payload };
    case ActionTypes.REGISTER_USER_FAILED:
      return { ...state, error: action.payload };
    default:
      return { ...state };
  }
}

export default userReducers;
