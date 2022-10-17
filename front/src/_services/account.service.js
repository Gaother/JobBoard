/**Those services are functions
 *  which help with the use of token
 *  and local storage
 */


let saveToken = (token) => {
    localStorage.setItem('token', token)
}

let logout = () => {
    localStorage.removeItem('token')
}

let isLogged = () => {
    let token = localStorage.getItem('token')
    
    return !!token
}

export const accountService = {
    saveToken, logout, isLogged
}