import ActionTypes from "../Constant/ActionTypes";

const initialState = {
  barang: [],
};

function barangReducers(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.GET_BARANG:
      return { ...state };
    case ActionTypes.GET_BARANG_SUCCEED:
      return { ...state, barang: action.payload };
    case ActionTypes.ADD_BARANG:
      return { ...state };
    case ActionTypes.ADD_BARANG_SUCCEED:
      return { ...state, barang: action.payload };
    case ActionTypes.EDIT_BARANG:
      return { ...state };
    case ActionTypes.EDIT_BARANG_SUCCEED:
      state.barang.splice(
        state.barang.findIndex((i) => i.id == action.payload.id),
        1,
        action.payload
      );
      return {
        ...state,
        barang: [...state.barang],
      };
    case ActionTypes.EDIT_BARANG_FAILED:
      return { ...state, error: action.payload };
    case ActionTypes.DELETE_BARANG:
      return { ...state };
    case ActionTypes.DELETE_BARANG_SUCCEED:
      return {
        ...state,
        barang: state.payBank.filter((items) => items.id !== +action.payload),
      };
    default:
      return { ...state };
  }
}

export default barangReducers;
