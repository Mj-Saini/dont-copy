'use client'
import React, { useEffect } from "react";

const DontCopy = () => {
    useEffect(() => {
        const handleCopy = async (e) => {
            e.preventDefault();
            try {
                await navigator.clipboard.writeText("🖕🖕");
             
            } catch (err) {
                console.error("Clipboard copy failed:", err);
            }
        };

        document.addEventListener("copy", handleCopy);
        return () => {
            document.removeEventListener("copy", handleCopy);
        };
    }, []);

    return (
        <div>
            please copy this text and try to paste anywhere you want
        </div>
    );
};

export default DontCopy;
