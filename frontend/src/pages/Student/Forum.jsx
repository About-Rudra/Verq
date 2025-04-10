import React, { useState, useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaThumbsUp, FaThumbsDown, FaComment, FaBookmark, FaShare, FaEllipsisH } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../../styles/Student/Forum.css';

const Forum = () => {
  const { darkMode } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTabName] = useState("Forum");
  const [breadcrumbs] = useState([activeTabName]);

  // Sample forum threads
  const forumThreads = [
    {
      id: 1,
      title: "How to prepare for Google SWE interviews?",
      author: "Rahul Patel",
      avatar: "RP",
      date: "2 hours ago",
      category: "Interview Prep",
      tags: ["Google", "SWE", "DSA"],
      content: "I have an interview in 3 weeks. What topics should I focus on for coding rounds?",
      upvotes: 24,
      downvotes: 2,
      comments: 12,
      isBookmarked: false,
      isAnnouncement: false,
    },
    {
      id: 2,
      title: "Amazon Internship Experience 2025",
      author: "Priya Sharma",
      avatar: "PS",
      date: "1 day ago",
      category: "Internships",
      tags: ["Amazon", "SDE Intern", "Experience"],
      content: "Sharing my interview experience and tips for Amazon's internship process.",
      upvotes: 45,
      downvotes: 1,
      comments: 18,
      isBookmarked: true,
      isAnnouncement: false,
    },
    {
      id: 3,
      title: "Important: Placement Drive Updates",
      author: "Admin",
      avatar: "AD",
      date: "3 days ago",
      category: "Announcements",
      tags: ["Placements", "Updates"],
      content: "Microsoft and Goldman Sachs are visiting next week. Check the schedule!",
      upvotes: 102,
      downvotes: 0,
      comments: 25,
      isBookmarked: false,
      isAnnouncement: true,
    },
    {
      id: 4,
      title: "Best resources for System Design?",
      author: "Amit Kumar",
      avatar: "AK",
      date: "5 days ago",
      category: "Study Resources",
      tags: ["System Design", "Books", "Courses"],
      content: "Looking for recommendations on books/videos for system design prep.",
      upvotes: 32,
      downvotes: 3,
      comments: 14,
      isBookmarked: false,
      isAnnouncement: false,
    },
  ];

  // Filter threads based on active tab & search query
  const filteredThreads = forumThreads.filter(thread => {
    const matchesTab = 
      activeTab === 'all' || 
      (activeTab === 'announcements' && thread.isAnnouncement) || 
      thread.category.toLowerCase().includes(activeTab);
    
    const matchesSearch = 
      thread.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      thread.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTab && matchesSearch;
  });

  // Handle upvote/downvote
  const handleVote = (id, type) => {
    console.log(`${type} thread ${id}`);
  };

  // Handle bookmark
  const toggleBookmark = (id) => {
    console.log(`Toggled bookmark for thread ${id}`);
  };

  return (
    <div className={`dashboard-container ${darkMode ? 'dark-theme' : ''}`}>
      <div className="main-content">
        <div className="header">
          <div className="breadcrumbs">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                <span>{crumb}</span>
                {index < breadcrumbs.length - 1 && <span className="separator">›</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="forum-container">
          {/* Forum Header */}
          <div className="forum-header">
            <h1>Community Forum</h1>
            <p>Ask questions, share experiences, and connect with peers</p>
            
            {/* Search Bar */}
            <div className="forum-search">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search discussions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Forum Tabs */}
          <div className="forum-tabs">
            <button
              className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Threads
            </button>
            <button
              className={`tab-btn ${activeTab === 'interview' ? 'active' : ''}`}
              onClick={() => setActiveTab('interview')}
            >
              Interview Prep
            </button>
            <button
              className={`tab-btn ${activeTab === 'internships' ? 'active' : ''}`}
              onClick={() => setActiveTab('internships')}
            >
              Internships
            </button>
            <button
              className={`tab-btn ${activeTab === 'announcements' ? 'active' : ''}`}
              onClick={() => setActiveTab('announcements')}
            >
              Announcements
            </button>
          </div>

          {/* Thread List */}
          <div className="thread-list">
            <AnimatePresence>
              {filteredThreads.length > 0 ? (
                filteredThreads.map((thread) => (
                  <motion.div
                    key={thread.id}
                    className={`thread-card ${thread.isAnnouncement ? 'announcement' : ''}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="thread-header">
                      <div className="author-avatar">{thread.avatar}</div>
                      <div className="thread-meta">
                        <span className="author-name">{thread.author}</span>
                        <span className="thread-date">{thread.date}</span>
                        <span className="thread-category">{thread.category}</span>
                      </div>
                      {thread.isAnnouncement && (
                        <div className="announcement-badge">Announcement</div>
                      )}
                    </div>

                    <div className="thread-content">
                      <h3>{thread.title}</h3>
                      <p>{thread.content}</p>
                      <div className="thread-tags">
                        {thread.tags.map((tag, index) => (
                          <span key={index} className="tag">{tag}</span>
                        ))}
                      </div>
                    </div>

                    <div className="thread-actions">
                      <div className="vote-buttons">
                        <button onClick={() => handleVote(thread.id, 'upvote')}>
                          <FaThumbsUp /> {thread.upvotes}
                        </button>
                        <button onClick={() => handleVote(thread.id, 'downvote')}>
                          <FaThumbsDown /> {thread.downvotes}
                        </button>
                      </div>
                      <div className="comment-count">
                        <FaComment /> {thread.comments}
                      </div>
                      <div className="action-buttons">
                        <button 
                          className={`bookmark-btn ${thread.isBookmarked ? 'active' : ''}`}
                          onClick={() => toggleBookmark(thread.id)}
                        >
                          <FaBookmark />
                        </button>
                        <button className="share-btn">
                          <FaShare />
                        </button>
                        <button className="more-btn">
                          <FaEllipsisH />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  className="no-threads"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <p>No threads found. Start a new discussion!</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Create New Thread Button */}
          <motion.button
            className="create-thread-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            + New Thread
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Forum;