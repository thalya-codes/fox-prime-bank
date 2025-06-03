import { jwtDecode } from "jwt-decode";
import { verifyIfUserHasAccessToken } from "./localStorage";
import { TTokenPayload } from "./auth";

export function getUserName() {
    const accessToken = verifyIfUserHasAccessToken();
    const decoded = (accessToken && jwtDecode(accessToken)) as TTokenPayload;
    const userName = decoded?.fullName?.split(' ')[0] || '';
    
    return userName;
}