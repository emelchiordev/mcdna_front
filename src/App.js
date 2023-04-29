import React from "react";
import Navbar from "./container/NavBar";
import Homepage from "./pages/Homepage";
import Footer from "./components/Footer";
import { Router } from "react-router-dom";
import CatalogPage from "./pages/CatalogPage";
import PromotionPage from "./pages/PromotionPage";
import LoginPage from "./container/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { checkJwtCookies } from "./services/checkJwtCookies";



const App = () => {
    checkJwtCookies()
    console.log(process.env.API_URL)
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div container='fluid' className="vh-100 position-relative">
                    <Navbar></Navbar>
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route path="/catalogue" element={<CatalogPage />} />
                        <Route path="/promotions" element={<PromotionPage />} />
                        <Route path="/espace-prive" element={<LoginPage />} />

                    </Routes>
                    <Footer></Footer>
                </div>
            </BrowserRouter>
        </Provider>
    )
}

export default App