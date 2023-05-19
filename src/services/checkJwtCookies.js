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
                store.dispatch(setAuthenticated({ status: false, roles: [] }));
            } else {

                const roles = decodedJwt.roles
                store.dispatch(setAuthenticated({ status: true, roles }));
            }
        } catch (error) {
            store.dispatch(setAuthenticated({ status: false, roles: [] }));
        }
    } else {
        store.dispatch(setAuthenticated({ status: false, roles: [] }));
    }
};

const logout = () => {
    document.cookie = "jwt_hp=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    store.dispatch(setAuthenticated({ status: false, roles: [] }));
};

export { checkJwtCookies, logout };