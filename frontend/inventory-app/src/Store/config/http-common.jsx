export const API = (method, endpoint, content, data) =>{
    return {
        method : method,
        url :`http://localhost:4000/${endpoint}`,
        headers : {
            'Content-Type': !content ? 'application/json' : 'multipart/form-data',
            // 'Authorization': localStorage.getItem('token')
        },
        data : data
    }
}