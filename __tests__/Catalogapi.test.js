import axios from "axios";
import api from "./api";

jest.mock("axios");

describe("API functions", () => {
    const mockedResponse = { data: "mocked data" };

    beforeEach(() => {
        axios.post.mockClear();
        axios.get.mockClear();
        axios.delete.mockClear();
    });

    // Test setProduct function
    test("setProduct sends a POST request with the correct data", async () => {
        const product = { name: "Example Product" };

        axios.post.mockResolvedValueOnce(mockedResponse);

        const result = await api.setProduct(product);

        expect(axios.post).toHaveBeenCalledWith(
            api.API_URL + "products",
            product,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            }
        );
        expect(result).toEqual(mockedResponse);
    });

    // Add tests for other functions in a similar manner
});