import { motion } from 'framer-motion';

export default function SentimentChart() {
    const bars = [20, 45, 30, 80, 75, 60, 90, 85, 40, 50, 70, 95];

    return (
        <div className="glass-panel p-6 rounded-xl h-full flex flex-col justify-between border-t border-t-zinc-700/50">
            <div className="flex justify-between items-end mb-4">
                <h3 className="text-zinc-400 text-xs font-mono tracking-wider uppercase">Sentiment Pulse</h3>
                <span className="text-signal-400 text-xs font-mono bg-signal-400/10 px-2 py-1 rounded">+12% vs avg</span>
            </div>
            
            <div className="flex items-end justify-between gap-2 h-32 w-full">
                {bars.map((height, i) => (
                    <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 0.5, delay: i * 0.05 }}
                        // NEW: Gradient Bars + Shadow Glow
                        className="w-full bg-gradient-to-t from-zinc-800 to-signal-500/80 rounded-t-sm shadow-neon relative group hover:from-zinc-700 hover:to-signal-400"
                    />
                ))}
            </div>
            
            <div className="flex justify-between mt-4 border-t border-zinc-800 pt-2 text-[10px] text-zinc-500 font-mono">
                <span>INCEPTION</span>
                <span>REAL-TIME</span>
            </div>
        </div>
    );
}