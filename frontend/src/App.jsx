import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import SearchInput from './components/SearchInput';
import LoadingLog from './components/LoadingLog';
import ResultSummary from './components/ResultSummary';
import InsightCard, { QuoteCard } from './components/InsightCard';
import SourcePanel from './components/SourcePanel';
import SentimentChart from './components/SentimentChart'; 
import DownloadButton from './components/DownloadButton'; 
import CustomCursor from './components/CustomCursor'; 
import MissionBrief from './components/MissionBrief'; 
import { useFakeScan } from './hooks/useFakeScan';

export default function App() {
    const { status, logs, startScan, reset } = useFakeScan();

    return (
        <div className="min-h-screen w-full relative selection:bg-green-500/30 selection:text-green-100 bg-[#020402] cursor-none py-6 px-6 overflow-x-hidden">
            
            <CustomCursor />

            {/* --- BACKGROUND LAYERS (Fixed behind everything) --- */}
            <div className="radar-grid fixed inset-0 z-0 opacity-40" /> 
            <div className="radar-sweep fixed inset-0 z-0 opacity-50" />
            <div className="radar-vignette fixed inset-0 z-0" />
            <div className="noise-overlay fixed inset-0 z-50 pointer-events-none" />

            {/* 👇 THE NEON CHASSIS: Pure Green Border, No Text/Icons */}
            <div className="
                relative z-10 
                w-full min-h-[calc(100vh-3rem)] 
                border-[3px] border-green-500 
                rounded-3xl 
                shadow-[0_0_40px_rgba(34,197,94,0.15),inset_0_0_40px_rgba(34,197,94,0.05)]
                flex flex-col
            ">
                
                {/* MAIN CONTENT AREA */}
                <main className="flex-grow w-full max-w-6xl mx-auto px-6 pt-20 pb-20 flex flex-col relative">
                    
                    {/* Landing Hero */}
                    <AnimatePresence mode="wait">
                        {status === 'idle' && (
                            <motion.div 
                                key="hero"
                                exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                                transition={{ duration: 0.5 }}
                                className="flex flex-col items-center justify-center min-h-[40vh] relative"
                            >
                                <div className="reactor-glow" /> 
                                <Hero />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Search Input Area */}
                    <motion.div 
                        layout 
                        className={`w-full z-20 mx-auto transition-all duration-700 ${status === 'complete' ? 'max-w-full mb-8' : 'max-w-2xl mb-0'}`}
                    >
                        {status !== 'complete' ? (
                             <SearchInput onSearch={startScan} isLoading={status === 'scanning'} />
                        ) : (
                            <div className="flex justify-between items-center border-b border-green-900/50 pb-6">
                                <div>
                                    <h1 className="font-serif text-2xl text-white">Analysis Report: <span className="text-zinc-400">Sony WH-1000XM5</span></h1>
                                    <p className="font-mono text-xs text-green-500 mt-1">ID: #8921-X • LIVE DATA</p>
                                </div>
                                <div className="flex gap-4">
                                    <button onClick={reset} className="text-zinc-500 hover:text-white text-xs uppercase tracking-widest transition-colors cursor-none">
                                        New Scan
                                    </button>
                                    <DownloadButton />
                                </div>
                            </div>
                        )}
                    </motion.div>

                    {/* Scanning State */}
                    {status === 'scanning' && <LoadingLog logs={logs} />}

                    {/* Dashboard State */}
                    {status === 'complete' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className="w-full grid grid-cols-1 md:grid-cols-12 gap-6"
                        >
                            <div className="md:col-span-8 space-y-6">
                                <div className="glass-panel p-8 rounded-xl">
                                    <ResultSummary />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InsightCard type="positive" title="Build Quality" delay={0.2}>
                                        Consensus indicates the chassis feels heavier than competitors.
                                    </InsightCard>
                                    <InsightCard type="negative" title="Software Stability" delay={0.3}>
                                        Pattern detected: 14% of threads mention Wi-Fi disconnection issues.
                                    </InsightCard>
                                </div>
                                <QuoteCard 
                                    delay={0.4}
                                    text="Honestly, for the price, it beats the Sony alternatives. But do NOT install the app."
                                    source="Reddit user /u/AudiophileDave"
                                />
                            </div>
                            <div className="md:col-span-4 space-y-6">
                                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                                    <SentimentChart />
                                </motion.div>
                                <SourcePanel />
                            </div>
                        </motion.div>
                    )}
                </main>

                {/* Mission Brief Section (Inside the Box) */}
                {status === 'idle' && (
                    <div className="pb-12">
                        <MissionBrief />
                    </div>
                )}
            
            </div>
        </div>
    );
}