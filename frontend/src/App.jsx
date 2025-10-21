import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Filters from "./components/Filters";
import Ads from "./components/Ads";
import Footer from "./components/Footer";
import ProductArea from "./components/ProductArea";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import AdminPanel from "./pages/adminPage";

function AppContent() {
    const location = useLocation();

    // Прячем Header и Footer в админке
    const isAdmin = location.pathname.startsWith("/admin");

    return (
        <>
            {!isAdmin && <Header />}
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
                    <Route path="/auth/login" element={<LoginPage />} />
                    <Route path="/auth/registration" element={<RegistrationPage />} />
                    <Route path="/admin" element={<AdminPanel />} />
                </Routes>
            </main>
            {!isAdmin && <Footer />}
        </>
    );
}

export default function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}
