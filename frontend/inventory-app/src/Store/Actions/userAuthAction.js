import ActionTypes from "../Constant/ActionTypes"

export const doLogin = (payload) =>{
    return {
        type : ActionTypes.LOGIN_USER,
        payload
    }
}

export const doLoginSucceed = (payload) =>{
    return {
        type : ActionTypes.LOGIN_USER_SUCCEED,
        payload
    }
}
export const doRegisterUser = (payload) =>{
    return {
        type : ActionTypes.REGISTER_USER,
        payload
    }
}
export const doRegisterUserSucceed = (payload) =>{
    return {
        type : ActionTypes.REGISTER_USER_SUCCEED,
        payload
    }
}