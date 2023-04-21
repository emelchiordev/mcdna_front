import React from "react";
import Navbar from "./components/Navbar";
import Homepage from "./pages/homepage";

const App = () => {
    return (
        <div container='fluid'>
            <Navbar></Navbar>
            <Homepage></Homepage>
        </div>
    )
}

export default App