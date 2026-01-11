export default function SourcePanel() {
    return (
        <div className="mt-16 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 opacity-60 hover:opacity-100 transition-opacity">
            <div className="font-mono text-xs text-zinc-500">
                <p>SOURCES SCANNED:</p>
                <ul className="mt-2 space-y-1">
                    <li>reddit.com/r/Coffee</li>
                    <li>home-barista.com/forums</li>
                    <li>youtube.com/hoffmann (Transcripts)</li>
                </ul>
            </div>
            <div className="max-w-xs text-right">
                <p className="font-sans text-xs text-zinc-600 leading-relaxed">
                    Condour utilizes semantic analysis to group opinion clusters. 
                    No affiliate links. No sponsored content.
                </p>
            </div>
        </div>
    );
}