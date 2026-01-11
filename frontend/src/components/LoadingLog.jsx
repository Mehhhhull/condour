import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingLog({ logs }) {
    return (
        <div className="w-full max-w-2xl mx-auto mt-12 font-mono text-sm text-zinc-500 bg-zinc-900/30 p-6 rounded-lg border border-zinc-800/50 backdrop-blur-sm min-h-[200px] flex flex-col justify-end overflow-hidden">
            <div className="space-y-2">
                <AnimatePresence mode='popLayout'>
                    {logs.map((log) => (
                        <motion.div
                            key={log.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3"
                        >
                            <span className="text-moss-400 text-xs">➜</span>
                            <span>{log.text}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
                <motion.div 
                    animate={{ opacity: [0, 1, 0] }} 
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="w-2 h-4 bg-moss-500 mt-2"
                />
            </div>
        </div>
    );
}