import ActionTypes from "../Constant/ActionTypes";

const initialState = {
    barang : []
}

function barangReducers (state = initialState, action){
    switch(action.type){
        case ActionTypes.GET_BARANG :
            return {...state}
        case ActionTypes.GET_BARANG_SUCCEED :
            return {...state, barang : action.payload}
        case ActionTypes.ADD_BARANG :
            return {...state}
        case ActionTypes.ADD_BARANG_SUCCEED :
            return {...state, barang : [...state.barang, action.payload]}
    }
}

export default barangReducers