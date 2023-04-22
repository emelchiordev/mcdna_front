import React from "react";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Footer from "./components/Footer";
import { Router } from "react-router-dom";
import CatalogPage from "./pages/CatalogPage";
import PromotionPage from "./pages/PromotionPage";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";



const App = () => {
    return (
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
    )
}

export default App