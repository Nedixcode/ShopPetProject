import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate} from "react-router-dom";
import Header from "./components/layout/Header/Header";
import Filters from "./components/features/Filters/Filters";
import Footer from "./components/layout/Footer/Footer";
import ProductArea from "./components/features/ProductArea/ProductArea";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import AdminPanel from "./pages/adminPage";
import AdminRegistrationPage from "./pages/AdminRegistrationPage/AdminRegistrationPage";
import { isTokenValid, isAdmin } from "./utils/auth";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SearchPage from "./pages/SearchPage";
import ResetPasswordPage from "./pages/ResetPasswordPage/ResetPasswordPage";
import BasketPage from "./pages/BasketPage/BasketPage"

function ProtectedRoute({ children, adminOnly = false, userOnly = false }) {
    const token = localStorage.getItem("token");

    if (!isTokenValid(token)){
        localStorage.removeItem("token");
        return <Navigate to="/auth/login" replace />;
    }
    if (adminOnly && !isAdmin(token)) return <Navigate to="/" replace />;
    if (userOnly && isAdmin(token)) return <Navigate to="/" replace />;
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

    const [filters, setFilters] = useState({
        query: null,
        type: null,
        isInStock: null,
        minPrice: null,
        maxPrice: null,
        sortBy: "id",
        sortDirection: "asc",
        page: 0,
        size: 80,
    });

    return (
        <>
            {!hideHeader && <Header />}
            <main>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <div className={"main-layout"}>
                                <Filters onFilter={setFilters} />
                                <ProductArea filters={filters}/>
                            </div>
                        }
                    />
                    <Route
                        path="/user/basket"
                        element={
                            <ProtectedRoute userOnly>
                                <BasketPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute adminOnly>
                                <AdminPanel />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <ProfilePage />
                            </ProtectedRoute>
                        }
                    />

                    <Route path="/auth/login" element={<LoginPage />} />
                    <Route path="/auth/registration" element={<RegistrationPage />} />
                    <Route path="/auth/registration/admin" element={<AdminRegistrationPage />} />
                    <Route path="/search" element={<SearchPage />} />
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

