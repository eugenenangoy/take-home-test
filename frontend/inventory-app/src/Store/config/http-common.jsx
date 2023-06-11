export const API = (method, endpoint, data) =>{
    return {
        method : method,
        url :`https://inventory-app.cyclic.app/${endpoint}`,
        headers : {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
        data : data
    }
}
export const FILE_API = (method, endpoint, data) =>{
    return {
        method : method,
        url :`https://inventory-app.cyclic.app/${endpoint}`,
        headers : {
            'Content-Type': 'multipart/form-data',
            'Authorization': localStorage.getItem('token')
        },
        data : data
    }
}