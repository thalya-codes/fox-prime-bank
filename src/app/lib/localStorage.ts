import { verifyIfTokenIsExpired } from "./auth"

export function verifyIfUserHasAccessToken() {
    const accessToken = localStorage.getItem('access_token')

    if(!accessToken) return null
    const isTokenExpired= verifyIfTokenIsExpired(accessToken)

    if(isTokenExpired) {
        localStorage.removeItem('access_token')
        return null
    }
    
    return accessToken
}