import jwt_decode from "jwt-decode";
import store, { setAuthenticated } from "../store";

const checkJwtCookies = () => {
    const jwtCookie = document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith("jwt_hp="));

    if (jwtCookie) {
        const jwt = jwtCookie.split("=")[1];
        try {
            const decodedJwt = jwt_decode(jwt);
            const currentTime = Date.now() / 1000;
            if (decodedJwt.exp < currentTime) {
                store.dispatch(setAuthenticated(false));
            } else {
                const userInfo = {
                    id: decodedJwt.roles,
                    email: decodedJwt.email,
                };
                store.dispatch(setAuthenticated(true));
            }
        } catch (error) {
            console.error("Invalid JWT token", error);
            store.dispatch(setAuthenticated(false));
        }
    } else {
        store.dispatch(setAuthenticated(false));
    }
};

const logout = () => {
    console.log("im here")
    document.cookie = "jwt_hp=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    store.dispatch(setAuthenticated(false));
};

export { checkJwtCookies, logout };