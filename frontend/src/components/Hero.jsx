import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <div className="text-center relative z-10">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
            >
                {/* The Title.
                    - "text-glow" creates that CRT monitor bloom effect
                    - Updated name to Condour
                */}
                <h1 className="font-serif text-7xl md:text-9xl text-white tracking-tighter mb-4 relative drop-shadow-[0_0_25px_rgba(34,197,94,0.6)]">
                    Condour.
                </h1>

                <p className="text-zinc-400 text-lg md:text-xl font-mono tracking-wide max-w-lg mx-auto">
                    <span className="text-green-500"></span> TRUTH EXTRACTION ENGINE
                </p>
            </motion.div>
        </div>
    );
}