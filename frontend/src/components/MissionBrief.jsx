import { motion } from 'framer-motion';

export default function MissionBrief() {
    return (
        <section className="w-full max-w-5xl mx-auto pt-32 pb-40 relative z-20">
            {/* Section Header */}
            <div className="mb-16 flex items-end gap-4 border-b border-zinc-800 pb-4 mx-6 md:mx-0">
                <h2 className="font-serif text-3xl md:text-4xl text-white">System Protocols</h2>
                <span className="font-mono text-xs text-green-500 mb-2">V2.0.4 CLASSIFIED</span>
            </div>

            {/* THE GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 md:px-0">
                
                {/* CARD 1: CORE DIRECTIVE */}
                <ProtocolCard 
                    title="01 CORE DIRECTIVE" 
                    subtitle="MISSION PARAMETERS"
                    delay={0}
                >
                    <p className="text-lg md:text-xl text-zinc-200 font-serif leading-relaxed mb-4">
                        Condour is a truth extraction engine.
                    </p>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                        We cut through marketing noise to reveal operational reality. Instead of relying on sponsored influencers or 5-star inflation, Condour scans raw, unstructured human discussions to surface recurring patterns, failures, and consensus.
                    </p>
                    <div className="mt-6 flex items-center gap-2">
                        <div className="h-px w-8 bg-green-500/50" />
                        <span className="font-mono text-[10px] uppercase text-green-500 tracking-widest">Context before consumption</span>
                    </div>
                </ProtocolCard>

                {/* CARD 2: CAPABILITIES */}
                <ProtocolCard 
                    title="02 CAPABILITIES" 
                    subtitle="CURRENT OPERATIONS"
                    delay={0.1}
                >
                    <ul className="space-y-4 text-sm text-zinc-400 font-mono">
                        <ListItem>Investigative scan of decentralized forums</ListItem>
                        <ListItem>Pattern recognition vs. isolated opinion</ListItem>
                        <ListItem>Signal extraction (Positives / Negatives)</ListItem>
                        <ListItem>Neutral, non-promotional report generation</ListItem>
                        <ListItem>Source transparency (No black boxes)</ListItem>
                    </ul>
                </ProtocolCard>

                {/* CARD 3: ACTIVE DEVELOPMENT */}
                <ProtocolCard 
                    title="03 DEV LOG" 
                    subtitle="BUILDING IN PUBLIC"
                    delay={0.2}
                >
                    <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                        Condour is in an iterative state. We prioritize <span className="text-white">clarity over volume</span>.
                    </p>
                    <div className="space-y-3">
                        <DevItem status="ACTIVE" text="Deep Semantic Pattern Detection" />
                        <DevItem status="ACTIVE" text="Long-term vs. Initial Impression Splitting" />
                        <DevItem status="PENDING" text="Visual Hierarchy Refinement" />
                    </div>
                </ProtocolCard>

                {/* CARD 4: EXCLUSION PARAMETERS */}
                <ProtocolCard 
                    title="04 EXCLUSION PARAMETERS" 
                    subtitle="WHAT WE ARE NOT"
                    delay={0.3}
                >
                    <div className="grid grid-cols-2 gap-4 h-full content-start">
                        <ExclusionItem text="Review Aggregator" />
                        <ExclusionItem text="Affiliate Platform" />
                        <ExclusionItem text="Recommendation Engine" />
                        <ExclusionItem text="Ad Network" />
                    </div>
                </ProtocolCard>

            </div>

            {/* THE QUOTE: CENTERED OUTSIDE THE GRID */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-24 text-center px-6"
            >
                <p className="font-serif text-2xl md:text-3xl text-white italic max-w-2xl mx-auto leading-relaxed">
                    "We do not tell you what to buy. We show you what happened."
                </p>
            </motion.div>

        </section>
    );
}

// --- SUB COMPONENTS ---

function ProtocolCard({ title, subtitle, children, delay }) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay }}
            className="group relative bg-zinc-900/40 backdrop-blur-md border border-zinc-800 p-8 hover:bg-zinc-900/60 transition-colors"
        >
            <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-zinc-700 group-hover:border-green-500 transition-colors" />
            <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-zinc-700 group-hover:border-green-500 transition-colors" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-zinc-700 group-hover:border-green-500 transition-colors" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-zinc-700 group-hover:border-green-500 transition-colors" />

            <div className="flex justify-between items-start mb-6">
                <h3 className="font-mono text-sm text-green-500 tracking-wider">{title}</h3>
                <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">{subtitle}</span>
            </div>
            
            {children}
        </motion.div>
    );
}

function ListItem({ children }) {
    return (
        <li className="flex items-start gap-3">
            <span className="text-green-500 mt-1">▹</span>
            <span>{children}</span>
        </li>
    );
}

function DevItem({ status, text }) {
    return (
        <div className="flex items-center gap-3 font-mono text-xs">
            <span className={`px-1.5 py-0.5 rounded ${status === 'ACTIVE' ? 'bg-green-500/20 text-green-400' : 'bg-zinc-800 text-zinc-500'}`}>
                {status}
            </span>
            <span className="text-zinc-300">{text}</span>
        </div>
    );
}

// 👇 THE FIX IS HERE: No opacity on parent, bright red icon, readable text
function ExclusionItem({ text }) {
    return (
        <div className="flex items-center gap-2">
            <span className="text-red-500 text-sm">✕</span>
            <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">{text}</span>
        </div>
    );
}