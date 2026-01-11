import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Quote } from 'lucide-react';

export default function InsightCard({ type, title, children, delay }) {
    const isPositive = type === 'positive';
    
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay, duration: 0.5 }}
            className="glass-panel p-6 rounded-xl hover:bg-zinc-900/80 transition-colors cursor-default"
        >
            <div className="flex items-start gap-4 mb-4">
                {isPositive ? (
                    <CheckCircle2 className="w-5 h-5 text-moss-400 mt-1 shrink-0" />
                ) : (
                    <AlertCircle className="w-5 h-5 text-amber-500 mt-1 shrink-0" />
                )}
                <div>
                    <h3 className="text-zinc-200 font-medium text-lg leading-tight mb-2">{title}</h3>
                    <div className="text-zinc-400 text-sm leading-relaxed">
                        {children}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export function QuoteCard({ text, source, delay }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay }}
            className="bg-zinc-900 p-4 border-l-2 border-zinc-700 my-4"
        >
            <Quote className="w-4 h-4 text-zinc-600 mb-2 transform rotate-180" />
            <p className="font-serif italic text-zinc-300 text-lg">"{text}"</p>
            <p className="font-mono text-xs text-zinc-500 mt-3 uppercase tracking-wider">— {source}</p>
        </motion.div>
    )
}