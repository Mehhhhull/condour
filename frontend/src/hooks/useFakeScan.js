import { useState } from 'react';

// Simulated investigation stages
const LOG_MESSAGES = [
    "Resolving host...",
    "Bypassing marketing headers...",
    "Scanning Reddit (r/gadgets, r/buyitforlife)...",
    "Parsing 42 forum threads...",
    "Filtering bot traffic...",
    "Detecting affiliate bias...",
    "Synthesizing consensus...",
    "Finalizing verdict..."
];

export const useFakeScan = () => {
    const [status, setStatus] = useState('idle'); // idle | scanning | complete
    const [logs, setLogs] = useState([]);
    const [progress, setProgress] = useState(0);

    const startScan = (url) => {
        setStatus('scanning');
        setLogs([]);
        setProgress(0);

        let step = 0;
        
        // Recursive simulation loop
        const interval = setInterval(() => {
            if (step >= LOG_MESSAGES.length) {
                clearInterval(interval);
                setTimeout(() => setStatus('complete'), 800);
                return;
            }

            const newLog = LOG_MESSAGES[step];
            setLogs(prev => [...prev, { id: Date.now(), text: newLog }]);
            setProgress(((step + 1) / LOG_MESSAGES.length) * 100);
            step++;

        }, 800); // 800ms per step feels "thoughtful"
    };

    const reset = () => {
        setStatus('idle');
        setLogs([]);
        setProgress(0);
    };

    return { status, logs, progress, startScan, reset };
};