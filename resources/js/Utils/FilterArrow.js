// useScrollableFilterBar.js
import { useRef, useState } from "react";

const useScrollableFilterBar = () => {
    const listRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNextClick = () => {
        if (currentIndex < listRef.current.children.length - 1) {
            setCurrentIndex(currentIndex + 1);
            listRef.current.style.transition = "transform 0.3s";
            listRef.current.style.transform = `translateX(-100px)`;
        }
    };

    const handlePrevClick = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            listRef.current.style.transition = "transform 0.3s";
            listRef.current.style.transform = "translateX(0)";
        }
    };

    return {
        listRef,
        currentIndex,
        handleNextClick,
        handlePrevClick,
    };
};

export default useScrollableFilterBar;
