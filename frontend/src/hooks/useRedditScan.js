import { useState } from 'react';
import redditService from '../services/redditService';

export function useRedditScan() {
  const [status, setStatus] = useState('idle');
  const [logs, setLogs] = useState([]);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const addLog = (message, type = 'info') => {
    setLogs(prev => [...prev, { 
      message, 
      type, 
      timestamp: Date.now() 
    }]);
  };

  const startScan = async (productInput) => {
    setStatus('scanning');
    setLogs([]);
    setError(null);
    setResults(null);

    try {
      // Step 1: Extract product name
      addLog('🔍 Analyzing product input...', 'info');
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const productName = redditService.extractProductName(productInput);
      addLog(`📝 Product identified: "${productName}"`, 'success');
      await new Promise(resolve => setTimeout(resolve, 600));

      // Step 2: Search Reddit and Tech Communities
      addLog('🌐 Searching Reddit & tech communities...', 'info');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const posts = await redditService.searchProduct(productInput);
      addLog(`📊 Found ${posts.length} discussions across tech forums`, 'success');
      await new Promise(resolve => setTimeout(resolve, 500));

      if (posts.length === 0) {
        addLog('❌ No discussions found for this product', 'error');
        setStatus('complete');
        setResults({ 
          productName, 
          posts: [], 
          comments: [], 
          stats: { totalPosts: 0, totalComments: 0, avgScore: 0, subreddits: [] }
        });
        return;
      }

      // Step 3: Fetch comments from top posts across different communities
      addLog('💬 Fetching opinions from tech communities...', 'info');
      await new Promise(resolve => setTimeout(resolve, 800));

      const allComments = [];
      
      // Group posts by subreddit to ensure diversity
      const postsBySubreddit = {};
      posts.forEach(post => {
        if (!postsBySubreddit[post.subreddit]) {
          postsBySubreddit[post.subreddit] = [];
        }
        postsBySubreddit[post.subreddit].push(post);
      });

      // Get top 2 posts from each subreddit (up to 10 total posts)
      const selectedPosts = [];
      Object.values(postsBySubreddit).forEach(subredditPosts => {
        selectedPosts.push(...subredditPosts.slice(0, 2));
      });
      
      const topPosts = selectedPosts.slice(0, 10); // Max 10 posts for comments

      for (let i = 0; i < topPosts.length; i++) {
        const post = topPosts[i];
        addLog(`📖 Reading r/${post.subreddit} community (${i + 1}/${topPosts.length})`, 'info');
        
        try {
          const comments = await redditService.getPostComments(post.permalink);
          // Add subreddit info to comments for better organization
          const commentsWithSubreddit = comments.map(comment => ({
            ...comment,
            subreddit: post.subreddit,
            postTitle: post.title
          }));
          allComments.push(...commentsWithSubreddit);
          await new Promise(resolve => setTimeout(resolve, 600));
        } catch (error) {
          addLog(`⚠️ Couldn't fetch comments from r/${post.subreddit}`, 'warning');
        }
      }

      // Step 4: Process results
      addLog('🧠 Processing raw feedback...', 'info');
      await new Promise(resolve => setTimeout(resolve, 1000));

      const processedResults = {
        productName,
        posts: posts,
        comments: allComments.slice(0, 50), // Limit to 50 comments
        stats: {
          totalPosts: posts.length,
          totalComments: allComments.length,
          avgScore: posts.length > 0 ? posts.reduce((sum, post) => sum + post.score, 0) / posts.length : 0,
          subreddits: [...new Set(posts.map(post => post.subreddit))]
        }
      };

      addLog(`✅ Analysis complete: ${allComments.length} comments processed`, 'success');
      await new Promise(resolve => setTimeout(resolve, 500));

      setResults(processedResults);
      setStatus('complete');

    } catch (error) {
      console.error('Reddit scan failed:', error);
      addLog(`❌ Scan failed: ${error.message}`, 'error');
      setError(error.message);
      setStatus('error');
    }
  };

  const reset = () => {
    setStatus('idle');
    setLogs([]);
    setResults(null);
    setError(null);
  };

  return {
    status,
    logs,
    results,
    error,
    startScan,
    reset
  };
}