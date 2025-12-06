import { createContext, useContext, useState, useCallback } from "react";
import PopupMessage from "./PopupMessage";

const PopupContext = createContext();

export function PopupProvider({ children }) {
    const [popup, setPopup] = useState({ message: "", type: "info" });

    const showPopup = useCallback((message, type = "info", duration = 3000) => {
        setPopup({ message, type });
        if (duration) {
            setTimeout(() => setPopup({ message: "", type: "info" }), duration);
        }
    }, []);

    return (
        <PopupContext.Provider value={{ showPopup }}>
            {children}
            <PopupMessage
                message={popup.message}
                type={popup.type}
                onClose={() => setPopup({ message: "", type: "info" })}
            />
        </PopupContext.Provider>
    );
}

export const usePopup = () => useContext(PopupContext);
