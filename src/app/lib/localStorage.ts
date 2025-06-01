export function verifyIfUserHasAccessToken() {
    const accessToken = localStorage.getItem('access_token')

    if(!accessToken) return null
    
    return accessToken
}