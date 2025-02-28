import { useState } from 'react';
import { motion } from 'framer-motion';
import './App.css';

// Vite uses VITE_ prefix for environment variables
const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

const initialVideos = [
  { title: "Stock Market for Beginners", videoId: "p7HKvqRI_Bo" },
  { title: "How to Invest in ETFs", videoId: "pT7tW4miW0w" },
  { title: "Mutual Funds Explained", videoId: "R8u8oL2l-aM" },
  { title: "Cryptocurrency Investing", videoId: "iS2-SfolkJc" },
  { title: "Understanding Bonds", videoId: "IoV_ggmQ4nk" },
  { title: "Ethereum and Smart Contracts", videoId: "pWGLtjG-F5c" },
];

const blogs = [
  { title: "Stock Market vs. Cryptocurrency: Where Should You Invest?", description: "A comparison of traditional stocks and crypto investments." },
  { title: "Mutual Funds for Beginners: A Step-by-Step Guide", description: "Learn the basics of mutual funds and how to start investing." },
  { title: "How to Diversify Your Portfolio", description: "Tips to reduce risk and maximize returns." },
  { title: "The Rise of ESG Investing", description: "Explore sustainable investing trends." },
  { title: "Understanding Market Volatility", description: "What causes market ups and downs?" },
  { title: "Retirement Planning with Index Funds", description: "A simple strategy for long-term growth." },
];

const trendingNews = [
  { title: "Tech Stocks Surge in 2025", summary: "Analysts predict a boom in tech investments.", url: "https://www.google.com/search?q=tech+stocks+surge+2025" },
  { title: "Crypto Market Volatility Continues", summary: "Bitcoin and Ethereum face fluctuations.", url: "https://www.google.com/search?q=crypto+market+volatility+2025" },
  { title: "Federal Reserve Rate Cut Impact", summary: "How lower rates affect markets in 2025.", url: "https://www.google.com/search?q=federal+reserve+rate+cut+2025" },
  { title: "Emerging Markets Gain Momentum", summary: "Investment trends in developing economies.", url: "https://www.google.com/search?q=emerging+markets+2025" },
];

function App() {
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState(initialVideos);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  console.log('API Key:', YOUTUBE_API_KEY); // Log to verify key

  const fetchVideos = async () => {
    if (!query) {
      setError('Please enter a search term.');
      return;
    }

    if (!YOUTUBE_API_KEY) {
      setError('Invalid or missing YouTube API key. Please configure it in .env.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        query
      )}&type=video&maxResults=6&key=${YOUTUBE_API_KEY}`;
      console.log('Fetching from URL:', url);
      const response = await fetch(url);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
      }
      const data = await response.json();
      console.log('API Response:', data);
      if (!data.items || data.items.length === 0) {
        throw new Error('No videos found for this query.');
      }
      setVideos(
        data.items.map((item) => ({
          title: item.snippet.title,
          videoId: item.id.videoId,
        }))
      );
    } catch (err) {
      console.error('Fetch Error:', err.message);
      setError(`Failed to fetch videos: ${err.message}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const handleReadMore = (title) => {
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(title)}`;
    window.open(searchUrl, '_blank');
  };

  return (
    <div className="app-container">
      <motion.h1
        className="heading"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Financial Education Hub
      </motion.h1>

      <motion.div
        className="search-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search financial videos..."
          className="search-input"
        />
        <motion.button
          onClick={fetchVideos}
          className="search-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Search
        </motion.button>
      </motion.div>

      {loading && <p className="loading">Loading videos...</p>}
      {error && <p className="error">{error}</p>}

      <motion.div
        className="video-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        {videos.map((video, index) => (
          <motion.div
            key={index}
            className="video-card"
            whileHover={{ scale: 1.05 }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <h3 className="video-title">{video.title}</h3>
            <iframe
              width="100%"
              height="180"
              src={`https://www.youtube.com/embed/${video.videoId}`}
              frameBorder="0"
              allowFullScreen
              title={video.title}
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.h2
        className="section-heading blogs-heading"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        Financial Blogs
      </motion.h2>
      <motion.div
        className="blog-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        {blogs.map((blog, index) => (
          <motion.div
            key={index}
            className="blog-card"
            whileHover={{ scale: 1.05 }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.8 + index * 0.2, duration: 0.5 }}
          >
            <h3 className="blog-title">{blog.title}</h3>
            <p className="blog-description">{blog.description}</p>
            <button
              onClick={() => handleReadMore(blog.title)}
              className="read-more-button"
            >
              Read More
            </button>
          </motion.div>
        ))}
      </motion.div>

      <motion.h2
        className="section-heading news-heading"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.8 }}
      >
        Trending Financial News
      </motion.h2>
      <motion.div
        className="news-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
      >
        {trendingNews.map((news, index) => (
          <motion.div
            key={index}
            className="news-card"
            whileHover={{ scale: 1.05 }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.5 + index * 0.2, duration: 0.5 }}
          >
            <h3 className="news-title">{news.title}</h3>
            <p className="news-summary">{news.summary}</p>
            <a href={news.url} target="_blank" rel="noopener noreferrer" className="news-link">
              Read More on Google
            </a>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default App;