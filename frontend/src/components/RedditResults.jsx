import { motion } from 'framer-motion';
import { useState } from 'react';

export default function RedditResults({ results }) {
  const [expandedPost, setExpandedPost] = useState(null);
  const [showAllComments, setShowAllComments] = useState(false);
  
  if (!results) return null;

  const { productName, posts, comments, stats } = results;

  // Simple sentiment analysis
  const analyzeSentiment = (text) => {
    const positive = ['good', 'great', 'excellent', 'amazing', 'love', 'perfect', 'best', 'awesome', 'fantastic', 'recommend', 'solid', 'quality'];
    const negative = ['bad', 'terrible', 'awful', 'hate', 'worst', 'broken', 'issues', 'problems', 'disappointing', 'avoid', 'cheap', 'poor'];
    
    const words = text.toLowerCase().split(/\s+/);
    let positiveCount = 0;
    let negativeCount = 0;
    
    words.forEach(word => {
      if (positive.some(p => word.includes(p))) positiveCount++;
      if (negative.some(n => word.includes(n))) negativeCount++;
    });
    
    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  };

  // Calculate overall sentiment
  const allText = [...posts.map(p => p.title + ' ' + (p.selftext || '')), ...comments.map(c => c.body)].join(' ');
  const sentimentCounts = {
    positive: 0,
    negative: 0,
    neutral: 0
  };
  
  [...posts, ...comments].forEach(item => {
    const text = item.title || item.body || '';
    const sentiment = analyzeSentiment(text);
    sentimentCounts[sentiment]++;
  });

  const total = sentimentCounts.positive + sentimentCounts.negative + sentimentCounts.neutral;
  const sentimentPercentages = {
    positive: Math.round((sentimentCounts.positive / total) * 100) || 0,
    negative: Math.round((sentimentCounts.negative / total) * 100) || 0,
    neutral: Math.round((sentimentCounts.neutral / total) * 100) || 0
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full space-y-6"
    >
      {/* Stats Overview */}
      <div className="glass-panel p-6 rounded-xl">
        <h2 className="font-serif text-xl text-white mb-4">
          Reddit Analysis: <span className="text-zinc-400">{productName}</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-mono text-green-500">{stats.totalPosts}</div>
            <div className="text-xs text-zinc-400 uppercase tracking-wide">Posts Found</div>
          </div>
          <div>
            <div className="text-2xl font-mono text-green-500">{stats.totalComments}</div>
            <div className="text-xs text-zinc-400 uppercase tracking-wide">Comments</div>
          </div>
          <div>
            <div className="text-2xl font-mono text-green-500">{Math.round(stats.avgScore)}</div>
            <div className="text-xs text-zinc-400 uppercase tracking-wide">Avg Score</div>
          </div>
          <div>
            <div className="text-2xl font-mono text-green-500">{stats.subreddits.length}</div>
            <div className="text-xs text-zinc-400 uppercase tracking-wide">Subreddits</div>
          </div>
        </div>
      </div>

      {/* Sentiment Analysis */}
      <div className="glass-panel p-6 rounded-xl">
        <h3 className="font-serif text-lg text-white mb-4">Overall Sentiment</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-green-400">Positive</span>
                <span className="text-green-400">{sentimentPercentages.positive}%</span>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${sentimentPercentages.positive}%` }}
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-red-400">Negative</span>
                <span className="text-red-400">{sentimentPercentages.negative}%</span>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-2">
                <div 
                  className="bg-red-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${sentimentPercentages.negative}%` }}
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-zinc-400">Neutral</span>
                <span className="text-zinc-400">{sentimentPercentages.neutral}%</span>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-2">
                <div 
                  className="bg-zinc-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${sentimentPercentages.neutral}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="glass-panel p-6 rounded-xl">
        <h3 className="font-serif text-lg text-white mb-4">Top Discussions</h3>
        <div className="space-y-4">
          {posts.slice(0, 10).map((post, index) => {
            const isExpanded = expandedPost === post.id;
            const sentiment = analyzeSentiment(post.title + ' ' + (post.selftext || ''));
            const sentimentColor = sentiment === 'positive' ? 'text-green-400' : 
                                 sentiment === 'negative' ? 'text-red-400' : 'text-zinc-400';
            
            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-zinc-800 rounded-lg p-4 bg-zinc-900/20 cursor-pointer hover:bg-zinc-800/30 transition-colors"
                onClick={() => setExpandedPost(isExpanded ? null : post.id)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-white font-medium text-sm leading-tight flex-1 pr-4">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs ${sentimentColor}`}>
                      {sentiment === 'positive' ? '😊' : sentiment === 'negative' ? '😞' : '😐'}
                    </span>
                    <div className="text-xs text-green-500 font-mono">
                      ↑{post.score}
                    </div>
                    <div className="text-xs text-zinc-500">
                      {isExpanded ? '▼' : '▶'}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4 text-xs text-zinc-400 mb-2">
                  <span className="bg-green-500/10 px-2 py-1 rounded">r/{post.subreddit}</span>
                  <span>{post.num_comments} comments</span>
                  <span>u/{post.author}</span>
                </div>
                
                {isExpanded && post.selftext && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 pt-3 border-t border-zinc-700"
                  >
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      {post.selftext}
                    </p>
                    <a 
                      href={post.permalink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-xs text-green-400 hover:text-green-300"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View on Reddit →
                    </a>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Raw Comments */}
      <div className="glass-panel p-6 rounded-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-serif text-lg text-white">Raw Comments</h3>
          <button 
            onClick={() => setShowAllComments(!showAllComments)}
            className="text-xs text-green-400 hover:text-green-300 transition-colors"
          >
            {showAllComments ? 'Show Less' : `Show All ${comments.length}`}
          </button>
        </div>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {comments.slice(0, showAllComments ? comments.length : 15).map((comment, index) => {
            const sentiment = analyzeSentiment(comment.body);
            const sentimentColor = sentiment === 'positive' ? 'border-green-500/30' : 
                                 sentiment === 'negative' ? 'border-red-500/30' : 'border-zinc-700';
            
            return (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`border ${sentimentColor} rounded-lg p-4 bg-zinc-900/20`}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-400">u/{comment.author}</span>
                    {comment.subreddit && (
                      <span className="text-xs bg-green-500/10 px-2 py-0.5 rounded text-green-400">
                        r/{comment.subreddit}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs">
                      {sentiment === 'positive' ? '😊' : sentiment === 'negative' ? '😞' : '😐'}
                    </span>
                    <span className="text-xs text-green-500 font-mono">↑{comment.score}</span>
                  </div>
                </div>
                <p className="text-sm text-zinc-200 leading-relaxed">
                  {comment.body}
                </p>
                {comment.postTitle && (
                  <div className="mt-2 pt-2 border-t border-zinc-800">
                    <p className="text-xs text-zinc-500 italic">
                      From: "{comment.postTitle.slice(0, 60)}..."
                    </p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Subreddit Breakdown */}
      <div className="glass-panel p-6 rounded-xl">
        <h3 className="font-serif text-lg text-white mb-4">Sources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {stats.subreddits.map((subreddit) => {
            const subredditPosts = posts.filter(post => post.subreddit === subreddit);
            const avgScore = subredditPosts.length > 0 
              ? Math.round(subredditPosts.reduce((sum, post) => sum + post.score, 0) / subredditPosts.length)
              : 0;
            
            return (
              <div
                key={subreddit}
                className="flex justify-between items-center p-3 bg-green-500/5 border border-green-500/20 rounded-lg"
              >
                <div>
                  <span className="text-green-400 font-medium">r/{subreddit}</span>
                  <div className="text-xs text-zinc-400">
                    {subredditPosts.length} posts • avg ↑{avgScore}
                  </div>
                </div>
                <div className="text-xs text-zinc-500">
                  {Math.round((subredditPosts.length / posts.length) * 100)}%
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}