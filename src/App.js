import React from "react";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Footer from "./components/Footer";

const App = () => {
    return (
        <div container='fluid'>
            <div className={{ "minHeigth": "100vh" }}>
                <Navbar></Navbar>
                <Homepage></Homepage>
                <Footer></Footer>
            </div>

        </div>
    )
}

export default App