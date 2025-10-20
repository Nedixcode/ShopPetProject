import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Filters from "./components/Filters";
import Ads from "./components/Ads";
import Footer from "./components/Footer";
import ProductArea from "./components/ProductArea";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";

export default function App() {
    return (
        <Router>
            <Header />
            <main>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <Filters />
                                <ProductArea />
                                <Ads />
                            </>
                        }
                    />
                    <Route path="auth/login" element={<LoginPage />} />
                    <Route path="auth/registration" element={<RegistrationPage />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
}
