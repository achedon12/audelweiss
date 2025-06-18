"use client";

import React, {useEffect, useState} from "react";

export default function AnimatedText({texts}: { texts: { id: number; entry: string }[] }) {
    const [currentText, setCurrentText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const handleTyping = () => {
            const fullText = texts[currentIndex].entry;
            if (isDeleting) {
                setCurrentText((prev) => prev.slice(0, -1));
            } else {
                setCurrentText((prev) => fullText.slice(0, prev.length + 1));
            }

            if (!isDeleting && currentText === fullText) {
                setTimeout(() => setIsDeleting(true), 1500);
            } else if (isDeleting && currentText === "") {
                setIsDeleting(false);
                setCurrentIndex((prev) => (prev + 1) % texts.length);
            }
        };

        const typingSpeed = isDeleting ? 75 : 150;
        const timeout = setTimeout(handleTyping, typingSpeed);

        return () => clearTimeout(timeout);
    }, [currentText, isDeleting, currentIndex, texts]);

    return (
        <span className="animated-text">
            <span className="text-awpink">{currentText}</span>
            <span className="cursor"></span>
        </span>
    );
}