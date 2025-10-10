import React from "react";
import Header from "./components/Header";
import Filters from "./components/Filters";
import Ads from "./components/Ads";
import Footer from "./components/Footer";
import ProductArea from "./components/ProductArea";

export default function App() {
    return (
        <>
            <Header />
            <main>
                <Filters />
                <ProductArea />
                <Ads />
            </main>
            <Footer />
        </>
    );
}
