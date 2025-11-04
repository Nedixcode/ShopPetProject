import React, {Profiler} from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate} from "react-router-dom";
import Header from "./components/Header";
import Filters from "./components/Filters";
import Ads from "./components/Ads";
import Footer from "./components/Footer";
import ProductArea from "./components/ProductArea";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import AdminPanel from "./pages/adminPage";
import AdminRegistrationPage from "./pages/AdminRegistrationPage";
import { isTokenValid, isAdmin } from "./utils/auth";
import ProfilePage from "./pages/ProfilePage";
import SearchPage from "./pages/SearchPage";
import ResetPasswordPage from "./pages/ResetPasswordPage"

function ProtectedRoute({ children, adminOnly = false }) {
    const token = localStorage.getItem("token");

    if (!isTokenValid(token)) {
        localStorage.removeItem("token");
        return <Navigate to="/auth/login" replace />;
    }

    if (adminOnly && !isAdmin(token)) {
        return <Navigate to="/" replace />;
    }

    return children;
}

function AppContent() {

    const location = useLocation();
    const isAdminPage = location.pathname.startsWith("/admin");
    const token = localStorage.getItem("token");
    const adminLoggedIn = token && isTokenValid(token) && isAdmin(token);
    const isAuthPage = location.pathname.startsWith("/auth");
    const hideHeader = isAdminPage || isAuthPage;

    if (adminLoggedIn && location.pathname === "/") {
        return <Navigate to="/admin" replace />;
    }

    return (
        <>
            {!hideHeader && <Header />}
            <main>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <div className={"main-layout"}>
                                <Filters />
                                <ProductArea />
                                <Ads />
                            </div>
                        }
                    />
                    <Route path="/auth/login" element={<LoginPage />} />
                    <Route path="/auth/registration" element={<RegistrationPage />} />
                    <Route path="/auth/registration/admin" element={<AdminRegistrationPage />} />
                    <Route path="/profile" element={<ProfilePage/>} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute adminOnly>
                                <AdminPanel />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/reset/request" element={<ResetPasswordPage />} />
                </Routes>
            </main>
            {!hideHeader && <Footer />}
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

