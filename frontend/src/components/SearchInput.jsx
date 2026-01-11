import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Search, Zap } from 'lucide-react'; // Added Zap icon

export default function SearchInput({ onSearch, isLoading }) {
    const [input, setInput] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) onSearch(input);
    };

    const handleQuickScan = (text) => {
        setInput(text);
        onSearch(text);
    };

    // Syntax Highlighting Helper
    const getHighlightedText = () => {
        const match = input.match(/^(https?:\/\/|www\.)(.*)$/);
        if (match) {
            return (
                <>
                    <span className="text-zinc-500 font-normal">{match[1]}</span>
                    <span className="text-white font-medium drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">{match[2]}</span>
                </>
            );
        }
        return <span className="text-zinc-500 opacity-50">{input || "Paste a product URL..."}</span>;
    };

    return (
        <div className="w-full max-w-2xl mx-auto flex flex-col gap-6">
            
            {/* THE SEARCH BAR */}
            <motion.form 
                layoutId="search-container"
                onSubmit={handleSubmit}
                className="w-full relative group"
            >
                <div className="relative rounded-xl overflow-hidden flex shadow-2xl shadow-black/50">
                    {/* --- LEFT SIDE: THE INPUT --- */}
                    <div className="relative flex-grow">
                        {/* Layer 1: Glass */}
                        <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-xl border border-zinc-800 border-r-0 rounded-l-xl pointer-events-none z-0" />
                        {/* Layer 2: Text */}
                        <div aria-hidden="true" className="absolute inset-0 z-10 pl-6 pr-4 py-5 rounded-l-xl text-lg font-mono pointer-events-none flex items-center overflow-hidden whitespace-nowrap">
                            {getHighlightedText()}
                        </div>
                        {/* Layer 3: Input */}
                        <input 
                            type="text"
                            disabled={isLoading}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            className="relative z-20 w-full bg-transparent text-transparent caret-green-500 pl-6 pr-4 py-5 rounded-l-xl text-lg font-mono focus:outline-none"
                            spellCheck="false"
                        />
                    </div>

                    {/* --- RIGHT SIDE: THE BUTTON --- */}
                    <button 
                        type="submit"
                        disabled={!input || isLoading}
                        className="relative z-30 flex items-center justify-center w-16 bg-zinc-900 border border-zinc-800 border-l-zinc-700 rounded-r-xl text-green-500 hover:bg-green-500 hover:text-black transition-all duration-200 cursor-none"
                    >
                        {isLoading ? <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" /> : input ? <ArrowRight className="w-6 h-6" /> : <Search className="w-5 h-5 opacity-50" />}
                    </button>
                </div>
            </motion.form>

            {/* 👇 NEW: QUICK INTERCEPTS (Fills the void below) */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap justify-center gap-3"
            >
                <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest py-1.5">Intercepts:</span>
                
                <QuickChip onClick={() => handleQuickScan('https://amazon.com/sony-wh1000xm5')}>
                    Sony XM5
                </QuickChip>
                
                <QuickChip onClick={() => handleQuickScan('https://hermanmiller.com/aeron')}>
                    Aeron Chair
                </QuickChip>
                
                <QuickChip onClick={() => handleQuickScan('https://apple.com/iphone-15-pro')}>
                    iPhone 15 Pro
                </QuickChip>
            </motion.div>

        </div>
    );
}

// Mini Component for the "Ghost Buttons"
function QuickChip({ children, onClick }) {
    return (
        <button 
            onClick={onClick}
            type="button"
            className="group flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-zinc-800 bg-zinc-900/30 hover:bg-green-500/10 hover:border-green-500/30 transition-all cursor-none"
        >
            <Zap className="w-3 h-3 text-zinc-600 group-hover:text-green-500 transition-colors" />
            <span className="text-xs font-mono text-zinc-500 group-hover:text-green-400 transition-colors">
                {children}
            </span>
        </button>
    );
}