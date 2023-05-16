import jwt_decode from "jwt-decode";
import store, { setAuthenticated } from "../src/store";
import { checkJwtCookies } from "../src/services/checkJwtCookies";

// Crée un mock pour la fonction `setAuthenticated` de Redux
jest.mock("../src/store", () => ({
    setAuthenticated: jest.fn(),
    dispatch: jest.fn(),
}));

// Crée un mock pour la fonction `jwt_decode`
jest.mock("jwt-decode", () => jest.fn());

// Crée un mock pour la fonction `console.error`
console.error = jest.fn();

describe("Véfication du composant checkJwtCookies", () => {
    afterEach(() => {
        jest.clearAllMocks();
        document.cookie = "";
    });

    test("Si aucun cookie n'est présent, on envoie le status de la connexion à false ainsi qu'un role vide au store", () => {
        checkJwtCookies();

        expect(store.dispatch).toHaveBeenCalledWith(
            setAuthenticated({ status: false, roles: [] })
        );
    });

    test("Supprime du store le role ainsi que le status de la connexion lorsque le token n'est plus valide", () => {
        const expiredJwt = "expired-jwt-token";
        document.cookie = `jwt_hp=${expiredJwt};`;

        const currentTime = Date.now() / 1000;
        jwt_decode.mockReturnValueOnce({ exp: currentTime - 100 });

        checkJwtCookies();

        expect(jwt_decode).toHaveBeenCalledWith(expiredJwt);
        expect(store.dispatch).toHaveBeenCalledWith(
            setAuthenticated({ status: false, roles: [] })
        );
    });

    test("Envoie le role de l'utilisateur ainsi que le status de la connexion au store lorsque le token est valide", () => {
        const validJwt = "valid-jwt-token";
        document.cookie = `jwt_hp=${validJwt};`;

        const currentTime = Date.now() / 1000;
        jwt_decode.mockReturnValueOnce({
            exp: currentTime + 100,
            roles: ["role1", "role2"],
        });

        checkJwtCookies();

        expect(jwt_decode).toHaveBeenCalledWith(validJwt);
        expect(store.dispatch).toHaveBeenCalledWith(
            setAuthenticated({ status: true, roles: ["role1", "role2"] })
        );
    });

    test("Affiche un message d'erreur lorsque le token n'est pas valide", () => {
        const invalidJwt = "invalid-jwt-token";
        document.cookie = `jwt_hp=${invalidJwt};`;

        jwt_decode.mockImplementationOnce(() => {
            throw new Error("Invalid JWT token");
        });

        checkJwtCookies();

        expect(jwt_decode).toHaveBeenCalledWith(invalidJwt);
        expect(console.error).toHaveBeenCalledWith(
            "Invalid JWT token",
            expect.any(Error)
        );
        expect(store.dispatch).toHaveBeenCalledWith(
            setAuthenticated({ status: false, roles: [] })
        );
    });
});

