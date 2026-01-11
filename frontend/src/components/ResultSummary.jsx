import { motion } from 'framer-motion';

export default function ResultSummary() {
    return (
        <div className="text-center mb-12">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <span className="text-zinc-500 font-mono text-xs tracking-[0.2em] uppercase">Consensus Verdict</span>
                <h2 className="font-serif text-5xl md:text-6xl text-zinc-100 mt-4 mb-2">
                    Cautiously Optimistic
                </h2>
                <div className="flex items-center justify-center gap-2 mt-4">
                    <div className="h-px w-12 bg-zinc-800"></div>
                    <span className="text-moss-400 font-medium">Safe to Buy</span>
                    <div className="h-px w-12 bg-zinc-800"></div>
                </div>
            </motion.div>
        </div>
    );
}