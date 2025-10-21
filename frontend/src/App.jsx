import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
    Navigate,
} from "react-router-dom";

import Header from "./components/Header";
import Filters from "./components/Filters";
import Ads from "./components/Ads";
import Footer from "./components/Footer";
import ProductArea from "./components/ProductArea";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import AdminPanel from "./pages/adminPage";

// 👇 Импортируем функции из utils
import { isTokenValid, isAdmin } from "./utils/auth";

// ====== Защищённый маршрут ======
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

    return (
        <>
            {!isAdminPage && <Header />}
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

                    {/* === Защищённый роут /admin === */}
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute adminOnly>
                                <AdminPanel />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </main>
            {!isAdminPage && <Footer />}
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
