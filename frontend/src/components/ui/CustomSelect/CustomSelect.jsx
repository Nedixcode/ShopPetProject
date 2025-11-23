import React, { useState } from "react";
import "./CustomSelect.css";

export default function CustomSelect({ options, value, onChange }) {
    const [open, setOpen] = useState(false);

    const handleSelect = (opt) => {
        onChange(opt);
        setOpen(false);
    };

    return (
        <div className="custom-select" onClick={() => setOpen(!open)}>
            🌆 {value}
            {open && (
                <div className="select-dropdown">
                    {options.map((opt, i) => (
                        <div key={i} className="select-option" onClick={() => handleSelect(opt)}>
                            {opt}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
