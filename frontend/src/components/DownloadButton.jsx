import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Loader2, Check } from 'lucide-react';

export default function DownloadButton() {
    const [state, setState] = useState('idle'); // idle | generating | ready

    const handleDownload = () => {
        setState('generating');
        setTimeout(() => setState('ready'), 2500);
    };

    return (
        <button 
            onClick={handleDownload}
            disabled={state !== 'idle'}
            className="group relative overflow-hidden bg-zinc-100 hover:bg-white text-zinc-900 px-6 py-3 rounded-lg font-medium text-sm transition-all active:scale-95 disabled:opacity-100 min-w-[180px]"
        >
            <div className="relative z-10 flex items-center justify-center gap-2">
                <AnimatePresence mode="wait">
                    {state === 'idle' && (
                        <motion.div 
                            key="idle"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className="flex items-center gap-2"
                        >
                            <Download className="w-4 h-4" />
                            <span>Export Dossier</span>
                        </motion.div>
                    )}
                    
                    {state === 'generating' && (
                        <motion.div 
                            key="gen"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className="flex items-center gap-2"
                        >
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Compiling PDF...</span>
                        </motion.div>
                    )}

                    {state === 'ready' && (
                        <motion.div 
                            key="ready"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="flex items-center gap-2 text-green-700"
                        >
                            <Check className="w-4 h-4" />
                            <span>Downloaded</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            
            {/* Progress Bar Background */}
            {state === 'generating' && (
                <motion.div 
                    layoutId="progress"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2.5 }}
                    className="absolute inset-0 bg-zinc-300/50 z-0"
                />
            )}
        </button>
    );
}