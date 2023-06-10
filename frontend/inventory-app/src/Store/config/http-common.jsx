export const API = (method, endpoint, content, data) =>{
    return {
        method : method,
        url :`https://inventory-app.cyclic.app/${endpoint}`,
        headers : {
            'Content-Type': !content ? 'application/json' : 'multipart/form-data',
            // 'Authorization': localStorage.getItem('token')
        },
        data : data
    }
}