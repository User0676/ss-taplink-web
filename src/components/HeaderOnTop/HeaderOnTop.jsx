import React, { useEffect, useState } from 'react';

const HeaderComponent = () => {
    const [scrollPrev, setScrollPrev] = useState(0);
    const [isOut, setIsOut] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY;

            if (scrolled > 100 && scrolled > scrollPrev) {
                setIsOut(true);
            } else {
                setIsOut(false);
            }
            setScrollPrev(scrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrollPrev]);

    return (
        <div className={`header ${isOut ? 'out' : ''}`}>
            {/* Ваш контент */}
        </div>
    );
};

export default HeaderComponent;