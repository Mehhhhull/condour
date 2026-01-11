export default function LiveTicker() {
    return (
        <div className="w-full border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-sm py-2 overflow-hidden flex fixed top-0 left-0 z-40">
            <div className="flex gap-8 animate-marquee whitespace-nowrap text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                <span>● SCAN COMPLETE: SONY WH-1000XM5 [VERDICT: BUY]</span>
                <span>● SCAN COMPLETE: HERMAN MILLER AERON [VERDICT: BUY]</span>
                <span>● SCANNING: TESLA MODEL 3 HIGHLAND...</span>
                <span>● SCAN COMPLETE: DYSON ZONE [VERDICT: AVOID]</span>
                <span>● ANALYZING: IPHONE 15 PRO HEAT ISSUES...</span>
                <span>● SYSTEM LOAD: 42%</span>
                {/* Duplicate for seamless loop */}
                <span>● SCAN COMPLETE: SONY WH-1000XM5 [VERDICT: BUY]</span>
                <span>● SCAN COMPLETE: HERMAN MILLER AERON [VERDICT: BUY]</span>
                <span>● SCANNING: TESLA MODEL 3 HIGHLAND...</span>
            </div>
        </div>
    );
}