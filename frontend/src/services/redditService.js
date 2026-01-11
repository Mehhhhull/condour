// Reddit scraping service - no backend needed!
class RedditService {
  constructor() {
    this.baseUrl = 'https://www.reddit.com';
    // Try multiple CORS proxies as backup
    this.corsProxies = [
      'https://corsproxy.io/?',
      'https://cors-anywhere.herokuapp.com/',
      'https://api.allorigins.win/raw?url='
    ];
    this.currentProxy = 0;
  }

  // Extract product name from various URLs
  extractProductName(input) {
    if (!input.includes('http') && !input.includes('.')) {
      return input.trim();
    }

    try {
      const url = new URL(input);
      
      // Amazon
      if (url.hostname.includes('amazon')) {
        const match = url.pathname.match(/\/([^\/]+)\/dp\/[A-Z0-9]{10}/);
        if (match) return this.cleanProductName(match[1]);
      }
      
      // Generic URL - extract from path
      const pathParts = url.pathname.split('/').filter(part => part.length > 0);
      const lastPart = pathParts[pathParts.length - 1];
      return this.cleanProductName(lastPart);
      
    } catch (error) {
      return input.trim();
    }
  }

  cleanProductName(name) {
    return name
      .replace(/-/g, ' ')
      .replace(/_/g, ' ')
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Search Reddit for product mentions
  async searchProduct(productInput) {
    const productName = this.extractProductName(productInput);
    const searchQuery = encodeURIComponent(productName);
    
    const subreddits = [
      'BuyItForLife',
      'reviews', 
      'gadgets',
      'technology',
      'headphones', // for audio products
      'MechanicalKeyboards', // for keyboards
      'buildapc', // for PC components
      'frugal',
      'ProductPorn',
      'LinusTechTips', // Linus Tech Tips community
      'MKBHD', // Marques Brownlee community
      'UnboxTherapy', // Unbox Therapy community
      'hardware', // general hardware discussions
      'TechNewsToday',
      'TechReviews',
      'pcmasterrace', // PC enthusiasts
      'Android', // for Android products
      'apple', // for Apple products
      'GooglePixel', // for Google products
      'samsung', // for Samsung products
      'laptops', // for laptop reviews
      'monitors', // for monitor reviews
      'audiophile', // for high-end audio
      'BudgetAudiophile' // for budget audio gear
    ];

    const allPosts = [];
    
    for (const subreddit of subreddits) {
      try {
        const posts = await this.searchSubreddit(productName, subreddit);
        allPosts.push(...posts);
        await this.delay(500);
      } catch (error) {
        console.warn(`Failed to search r/${subreddit}:`, error);
      }
    }

    const uniquePosts = this.removeDuplicates(allPosts);
    return this.sortByRelevance(uniquePosts, productName);
  }

  async searchSubreddit(productName, subreddit) {
    const searchUrl = `${this.baseUrl}/r/${subreddit}/search.json?q=${encodeURIComponent(productName)}&sort=relevance&limit=10&restrict_sr=1`;
    
    // Try different CORS proxies
    for (let i = 0; i < this.corsProxies.length; i++) {
      try {
        const proxy = this.corsProxies[i];
        const proxiedUrl = proxy + encodeURIComponent(searchUrl);
        
        const response = await fetch(proxiedUrl, {
          headers: {
            'User-Agent': 'Candour/1.0 (Product Research Tool)'
          }
        });

        if (!response.ok) continue;
        
        const data = await response.json();
        
        if (!data.data || !data.data.children) {
          throw new Error('Invalid Reddit response');
        }
        
        return data.data.children.map(post => ({
          id: post.data.id,
          title: post.data.title,
          url: post.data.url,
          permalink: `${this.baseUrl}${post.data.permalink}`,
          score: post.data.score,
          num_comments: post.data.num_comments,
          created: post.data.created_utc,
          subreddit: post.data.subreddit,
          author: post.data.author,
          selftext: post.data.selftext,
          upvote_ratio: post.data.upvote_ratio
        }));
        
      } catch (error) {
        console.warn(`Proxy ${i + 1} failed:`, error);
        continue;
      }
    }
    
    throw new Error(`All CORS proxies failed for r/${subreddit}`);
  }

  // Fetch comments for a specific post
  async getPostComments(permalink) {
    const jsonUrl = `${permalink}.json?limit=100&sort=top`; // Get top 100 comments, sorted by score
    
    // Try different CORS proxies
    for (let i = 0; i < this.corsProxies.length; i++) {
      try {
        const proxy = this.corsProxies[i];
        const proxiedUrl = proxy + encodeURIComponent(jsonUrl);
        
        const response = await fetch(proxiedUrl);
        if (!response.ok) continue;
        
        const data = await response.json();
        
        if (data.length < 2) return [];
        
        return this.extractComments(data[1].data.children);
      } catch (error) {
        console.warn(`Comment fetch failed with proxy ${i + 1}:`, error);
        continue;
      }
    }
    
    console.warn('All proxies failed for comments');
    return [];
  }

  extractComments(commentData, depth = 0) {
    const comments = [];
    
    for (const comment of commentData) {
      if (comment.kind === 't1' && comment.data.body && comment.data.body !== '[deleted]') {
        comments.push({
          id: comment.data.id,
          author: comment.data.author,
          body: comment.data.body,
          score: comment.data.score,
          created: comment.data.created_utc,
          depth: depth
        });

        // Get replies
        if (comment.data.replies && comment.data.replies.data) {
          const replies = this.extractComments(comment.data.replies.data.children, depth + 1);
          comments.push(...replies);
        }
      }
    }
    
    return comments;
  }

  removeDuplicates(posts) {
    const seen = new Set();
    return posts.filter(post => {
      if (seen.has(post.id)) return false;
      seen.add(post.id);
      return true;
    });
  }

  sortByRelevance(posts, productName) {
    // Prioritize tech YouTuber communities and high-quality sources
    const techCommunityBonus = {
      'LinusTechTips': 3,
      'MKBHD': 3,
      'UnboxTherapy': 2,
      'hardware': 2,
      'BuyItForLife': 2,
      'buildapc': 2,
      'audiophile': 2,
      'technology': 1.5
    };

    return posts
      .filter(post => post.num_comments > 0) // Only posts with comments
      .sort((a, b) => {
        // Score by title relevance + engagement + community quality
        const aRelevance = this.calculateRelevance(a.title, productName);
        const bRelevance = this.calculateRelevance(b.title, productName);
        const aEngagement = a.score + (a.num_comments * 2);
        const bEngagement = b.score + (b.num_comments * 2);
        const aCommunityBonus = techCommunityBonus[a.subreddit] || 1;
        const bCommunityBonus = techCommunityBonus[b.subreddit] || 1;
        
        const aFinalScore = (aRelevance * aEngagement * aCommunityBonus);
        const bFinalScore = (bRelevance * bEngagement * bCommunityBonus);
        
        return bFinalScore - aFinalScore;
      })
      .slice(0, 20); // Top 20 most relevant posts
  }

  calculateRelevance(title, productName) {
    const titleLower = title.toLowerCase();
    const productLower = productName.toLowerCase();
    const words = productLower.split(' ');
    
    let score = 0;
    
    // Exact match bonus
    if (titleLower.includes(productLower)) score += 10;
    
    // Word match scoring
    words.forEach(word => {
      if (titleLower.includes(word)) score += 2;
    });
    
    return Math.max(score, 1);
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Format timestamp
  formatDate(timestamp) {
    return new Date(timestamp * 1000).toLocaleDateString();
  }
}

export default new RedditService();