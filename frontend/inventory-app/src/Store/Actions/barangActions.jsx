import ActionTypes from "../Constant/ActionTypes"

export const doGetBarang = () =>{
    return {
        type : ActionTypes.GET_BARANG
    }
}
export const doGetBarangSuceed = (payload) =>{
    return {
        type : ActionTypes.GET_BARANG_SUCCEED,
        payload
    }
}
export const doGetBarangFailed = (payload) =>{
    return {
        type : ActionTypes.GET_BARANG_FAILED,
        payload
    }
}
export const doAddBarang = (payload) =>{
    return {
        type : ActionTypes.ADD_BARANG,
        payload
    }
}
export const doAddBarangSucceed = (payload) =>{
    return {
        type : ActionTypes.ADD_BARANG_SUCCEED,
        payload
    }
}
export const doAddBarangFailed = (payload) =>{
    return {
        type : ActionTypes.ADD_BARANG_FAILED,
        payload
    }
}
export const doEditBarang = (payload) =>{
    return {
        type : ActionTypes.EDIT_BARANG,
        payload
    }
}
export const doEditBarangSucceed = (payload) =>{
    return {
        type : ActionTypes.EDIT_BARANG_SUCCEED,
        payload
    }
}
export const doEditBarangFailed = (payload) =>{
    return {
        type : ActionTypes.EDIT_BARANG_FAILED,
        payload
    }
}
export const doDeleteBarang = (payload) =>{
    return {
        type : ActionTypes.DELETE_BARANG,
        payload
    }
}
export const doDeleteBarangSucceed = (payload) =>{
    return {
        type : ActionTypes.DELETE_BARANG_SUCCEED,
        payload
    }
}
export const doDeleteBarangFailed = (payload) =>{
    return {
        type : ActionTypes.DELETE_BARANG_FAILED,
        payload
    }
}