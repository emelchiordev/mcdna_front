import React, { useState, useEffect } from "react";
import Navbar from "./container/NavBar";
import Homepage from "./pages/Homepage";
import Footer from "./components/Footer";
import { Router } from "react-router-dom";
import PublicCatalogPage from "./pages/PublicCatalogPage";
import PublicPromotionPage from "./pages/PublicPromotionPage";
import LoginPage from "./container/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { checkJwtCookies } from "./services/checkJwtCookies";
import CatalogUpdate from "./pages/CatalogUpdate";
import { API_URL } from "./services/config";
import ProtectedRoute from "./container/ProtectedRoute";




const App = () => {

    checkJwtCookies();


    return (
        <Provider store={store}>
            <BrowserRouter>
                <div container='fluid' className="vh-100 position-relative">
                    <Navbar></Navbar>
                    <Routes>

                        <Route path="/" element={<Homepage />} />
                        <Route path="/catalogue" element={<PublicCatalogPage />} />
                        <Route path="/promotions" element={<PublicPromotionPage />} />
                        <Route path="/gestion-catalogue" element={
                            <ProtectedRoute  >
                                <CatalogUpdate />
                            </ProtectedRoute>

                        } />
                        <Route path="/espace-prive" element={<LoginPage />} />
                    </Routes>
                    <Footer className="position-absolute bottom-0 left-0 right-0"></Footer>
                </div>
            </BrowserRouter>
        </Provider>
    )
}

export default App