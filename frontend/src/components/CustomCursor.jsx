import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e) => {
            if (['BUTTON', 'A', 'INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
                setIsHovering(true);
            }
        };

        const handleMouseOut = () => {
            setIsHovering(false);
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mouseout', handleMouseOut);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mouseout', handleMouseOut);
        };
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[100] mix-blend-difference"
            animate={{
                x: mousePosition.x - 12, // Re-centered (smaller offset)
                y: mousePosition.y - 12,
            }}
            transition={{ type: 'tween', ease: 'linear', duration: 0 }}
        >
            {/* The Crosshair HUD */}
            <div className={`relative w-6 h-6 transition-all duration-200 ${isHovering ? 'rotate-45' : 'rotate-0'}`}>
                
                {/* Smaller, tighter brackets */}
                <div className="absolute top-0 left-0 w-1.5 h-1.5 border-l border-t border-green-500" />
                <div className="absolute top-0 right-0 w-1.5 h-1.5 border-r border-t border-green-500" />
                <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-l border-b border-green-500" />
                <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-r border-b border-green-500" />

                {/* Center Dot */}
                <div className={`absolute top-1/2 left-1/2 w-0.5 h-0.5 bg-green-500 -translate-x-1/2 -translate-y-1/2 rounded-full`} />
            </div>

            {/* Coordinate Data - Moved closer to cursor */}
            <div className="absolute top-6 left-6 text-[8px] font-mono text-green-500 whitespace-nowrap opacity-40">
                {Math.round(mousePosition.x)}:{Math.round(mousePosition.y)}
            </div>
        </motion.div>
    );
}