// // import React, { useState, useEffect } from 'react';
// // import { FiMoon, FiSun, FiSearch, FiFilter, FiCode, FiBookmark, 
// //          FiBookOpen, FiChevronDown, FiChevronUp, FiExternalLink,
// //          FiStar, FiBarChart2, FiLayers } from 'react-icons/fi';
// // import '../../styles/student/questions.css';

// // const Questions = () => {
// //   const [darkMode, setDarkMode] = useState(false);
// //   const [questions, setQuestions] = useState([]);
// //   const [filteredQuestions, setFilteredQuestions] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [filters, setFilters] = useState({
// //     company: 'All',
// //     difficulty: 'All',
// //     topic: 'All',
// //     frequency: 'All',
// //     category: 'All'
// //   });
// //   const [expandedQuestion, setExpandedQuestion] = useState(null);
// //   const [savedQuestions, setSavedQuestions] = useState([]);
// //   const [activeFilterTab, setActiveFilterTab] = useState('all');

// //   // Full dataset of 150+ questions
// //   useEffect(() => {
// //     // This would normally come from an API
// //     const loadQuestions = async () => {
// //       try {
// //         // Mock data with 150+ questions
// //         const mockQuestions = [
// //           // Easy Questions (50)
// //           {
// //             id: 1,
// //             title: "Two Sum",
// //             company: "Amazon",
// //             frequency: 4.9,
// //             difficulty: "Easy",
// //             topics: ["Array", "Hash Table"],
// //             category: "Most Asked",
// //             description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
// //             solution: "Use a hash map to store each number's index as you iterate. For each number, check if (target - number) exists in the hash map.",
// //             leetcodeLink: "https://leetcode.com/problems/two-sum/"
// //           },
// //           {
// //             id: 2,
// //             title: "Valid Parentheses",
// //             company: "Facebook",
// //             frequency: 4.5,
// //             difficulty: "Easy",
// //             topics: ["String", "Stack"],
// //             category: "Most Asked",
// //             description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
// //             solution: "Use a stack to keep track of opening brackets. When you encounter a closing bracket, check if it matches the top of the stack.",
// //             leetcodeLink: "https://leetcode.com/problems/valid-parentheses/"
// //           },
// //           // ... (48 more easy questions)
          
// //           // Medium Questions (70)
// //           {
// //             id: 51,
// //             title: "Add Two Numbers",
// //             company: "Microsoft",
// //             frequency: 4.2,
// //             difficulty: "Medium",
// //             topics: ["Linked List", "Math"],
// //             category: "Most Asked",
// //             description: "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.",
// //             solution: "Initialize a dummy node and build the result linked list. Handle carry and different length lists properly.",
// //             leetcodeLink: "https://leetcode.com/problems/add-two-numbers/"
// //           },
// //           {
// //             id: 52,
// //             title: "Longest Substring Without Repeating Characters",
// //             company: "Google",
// //             frequency: 4.7,
// //             difficulty: "Medium",
// //             topics: ["String", "Sliding Window"],
// //             category: "Most Asked",
// //             description: "Given a string s, find the length of the longest substring without repeating characters.",
// //             solution: "Use a sliding window approach with a hash set to track characters in the current window.",
// //             leetcodeLink: "https://leetcode.com/problems/longest-substring-without-repeating-characters/"
// //           },
// //           // ... (68 more medium questions)
          
// //           // Hard Questions (30)
// //           {
// //             id: 121,
// //             title: "Merge k Sorted Lists",
// //             company: "Amazon",
// //             frequency: 4.3,
// //             difficulty: "Hard",
// //             topics: ["Linked List", "Heap"],
// //             category: "Most Asked",
// //             description: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
// //             solution: "Use a min-heap to efficiently get the next smallest node from all lists.",
// //             leetcodeLink: "https://leetcode.com/problems/merge-k-sorted-lists/"
// //           },
// //           {
// //             id: 122,
// //             title: "Median of Two Sorted Arrays",
// //             company: "Google",
// //             frequency: 4.8,
// //             difficulty: "Hard",
// //             topics: ["Array", "Binary Search"],
// //             category: "Most Asked",
// //             description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
// //             solution: "Perform binary search on the smaller array to find the correct partition point.",
// //             leetcodeLink: "https://leetcode.com/problems/median-of-two-sorted-arrays/"
// //           },
// //           // ... (28 more hard questions)
          
// //           // Additional questions with different categories
// //           {
// //             id: 151,
// //             title: "Design Underground System",
// //             company: "Uber",
// //             frequency: 3.8,
// //             difficulty: "Medium",
// //             topics: ["Design", "Hash Table"],
// //             category: "System Design",
// //             description: "Design an underground railway system to track customer travel times between different stations.",
// //             solution: "Use two hash tables - one to track active trips and another to accumulate statistics.",
// //             leetcodeLink: "https://leetcode.com/problems/design-underground-system/"
// //           }
// //         ];

// //         setQuestions(mockQuestions);
// //         setFilteredQuestions(mockQuestions);
// //         setLoading(false);
// //       } catch (err) {
// //         console.error("Failed to load questions", err);
// //         setLoading(false);
// //       }
// //     };

// //     loadQuestions();
// //   }, []);

// //   // Apply filters
// //   useEffect(() => {
// //     let results = questions;
    
// //     // Search term filter
// //     if (searchTerm) {
// //       results = results.filter(q => 
// //         q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //         q.description.toLowerCase().includes(searchTerm.toLowerCase())
// //       );
// //     }
    
// //     // Apply all other filters
// //     Object.entries(filters).forEach(([key, value]) => {
// //       if (value !== 'All') {
// //         results = results.filter(q => {
// //           if (key === 'frequency') {
// //             // Handle frequency ranges
// //             if (value === 'High') return q.frequency >= 4;
// //             if (value === 'Medium') return q.frequency >= 3 && q.frequency < 4;
// //             if (value === 'Low') return q.frequency < 3;
// //           }
// //           return q[key] === value;
// //         });
// //       }
// //     });
    
// //     // Apply category tab filter
// //     if (activeFilterTab !== 'all') {
// //       results = results.filter(q => q.category === activeFilterTab);
// //     }
    
// //     setFilteredQuestions(results);
// //   }, [searchTerm, filters, activeFilterTab, questions]);

// //   const toggleDarkMode = () => {
// //     setDarkMode(!darkMode);
// //     document.documentElement.setAttribute('data-theme', darkMode ? 'light' : 'dark');
// //   };

// //   const toggleQuestion = (id) => {
// //     setExpandedQuestion(expandedQuestion === id ? null : id);
// //   };

// //   const toggleSavedQuestion = (id, e) => {
// //     e.stopPropagation();
// //     setSavedQuestions(prev => 
// //       prev.includes(id) ? prev.filter(qId => qId !== id) : [...prev, id]
// //     );
// //   };

// //   const handleFilterChange = (filterName, value) => {
// //     setFilters(prev => ({ ...prev, [filterName]: value }));
// //   };

// //   // Extract unique values for filters
// //   const companies = ['All', ...new Set(questions.map(q => q.company))];
// //   const difficulties = ['All', 'Easy', 'Medium', 'Hard'];
// //   const topics = ['All', ...new Set(questions.flatMap(q => q.topics))];
// //   const frequencies = ['All', 'High (4+)', 'Medium (3-4)', 'Low (<3)'];
// //   const categories = ['All', 'Most Asked', 'System Design', 'Algorithms', 'Data Structures'];

// //   if (loading) {
// //     return (
// //       <div className="loading-screen">
// //         <div className="spinner"></div>
// //         <p>Loading interview questions...</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className={`interview-questions-page ${darkMode ? 'dark' : ''}`}>
// //       <header className="header">
// //         <div className="header-content">
// //           <h1>
// //             <FiBookOpen className="header-icon" />
// //             Interview Prep Hub
// //           </h1>
// //           <div className="header-actions">
// //             <button onClick={toggleDarkMode} className="theme-toggle">
// //               {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
// //               <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
// //             </button>
// //           </div>
// //         </div>
// //       </header>

// //       <div className="content-container">
// //         <aside className="sidebar">
// //           <div className="sidebar-section">
// //             <h3>
// //               <FiFilter className="icon" />
// //               Filters
// //             </h3>
            
// //             <div className="filter-group">
// //               <label>Company</label>
// //               <select 
// //                 value={filters.company} 
// //                 onChange={(e) => handleFilterChange('company', e.target.value)}
// //               >
// //                 {companies.map(company => (
// //                   <option key={company} value={company}>{company}</option>
// //                 ))}
// //               </select>
// //             </div>
            
// //             <div className="filter-group">
// //               <label>Difficulty</label>
// //               <select 
// //                 value={filters.difficulty} 
// //                 onChange={(e) => handleFilterChange('difficulty', e.target.value)}
// //               >
// //                 {difficulties.map(difficulty => (
// //                   <option key={difficulty} value={difficulty}>{difficulty}</option>
// //                 ))}
// //               </select>
// //             </div>
            
// //             <div className="filter-group">
// //               <label>Topic</label>
// //               <select 
// //                 value={filters.topic} 
// //                 onChange={(e) => handleFilterChange('topic', e.target.value)}
// //               >
// //                 {topics.map(topic => (
// //                   <option key={topic} value={topic}>{topic}</option>
// //                 ))}
// //               </select>
// //             </div>
            
// //             <div className="filter-group">
// //               <label>Frequency</label>
// //               <select 
// //                 value={filters.frequency} 
// //                 onChange={(e) => handleFilterChange('frequency', e.target.value)}
// //               >
// //                 {frequencies.map(freq => (
// //                   <option key={freq} value={freq.split(' ')[0]}>{freq}</option>
// //                 ))}
// //               </select>
// //             </div>
// //           </div>

// //           <div className="sidebar-section">
// //             <h3>
// //               <FiBookmark className="icon" />
// //               Saved Questions
// //             </h3>
// //             {savedQuestions.length > 0 ? (
// //               <ul className="saved-questions-list">
// //                 {questions
// //                   .filter(q => savedQuestions.includes(q.id))
// //                   .map(q => (
// //                     <li key={q.id} onClick={() => toggleQuestion(q.id)}>
// //                       {q.title}
// //                       <span className={`difficulty-badge ${q.difficulty.toLowerCase()}`}>
// //                         {q.difficulty}
// //                       </span>
// //                     </li>
// //                   ))}
// //               </ul>
// //             ) : (
// //               <p className="empty-message">No saved questions yet</p>
// //             )}
// //           </div>
// //         </aside>

// //         <main className="main-content">
// //           <div className="category-tabs">
// //             {categories.map(category => (
// //               <button
// //                 key={category}
// //                 className={`tab-btn ${activeFilterTab === category ? 'active' : ''}`}
// //                 onClick={() => setActiveFilterTab(category === 'All' ? 'all' : category)}
// //               >
// //                 {category === 'Most Asked' && <FiStar className="tab-icon" />}
// //                 {category === 'System Design' && <FiLayers className="tab-icon" />}
// //                 {category === 'Algorithms' && <FiCode className="tab-icon" />}
// //                 {category === 'Data Structures' && <FiBarChart2 className="tab-icon" />}
// //                 {category}
// //               </button>
// //             ))}
// //           </div>

// //           <div className="search-bar">
// //             <div className="search-input">
// //               <FiSearch className="search-icon" />
// //               <input
// //                 type="text"
// //                 placeholder="Search questions by title or description..."
// //                 value={searchTerm}
// //                 onChange={(e) => setSearchTerm(e.target.value)}
// //               />
// //             </div>
// //             <div className="results-count">
// //               Showing {filteredQuestions.length} of {questions.length} questions
// //             </div>
// //           </div>

// //           <div className="questions-list">
// //             {filteredQuestions.length > 0 ? (
// //               filteredQuestions.map(question => (
// //                 <div 
// //                   key={question.id} 
// //                   className={`question-card ${question.difficulty.toLowerCase()} ${expandedQuestion === question.id ? 'expanded' : ''}`}
// //                   onClick={() => toggleQuestion(question.id)}
// //                 >
// //                   <div className="question-header">
// //                     <div className="question-title">
// //                       <h3>{question.title}</h3>
// //                       <div className="question-meta">
// //                         <span className={`difficulty-badge ${question.difficulty.toLowerCase()}`}>
// //                           {question.difficulty}
// //                         </span>
// //                         <span className="company-tag">{question.company}</span>
// //                         <span className="frequency">
// //                           <FiStar className="star-icon" />
// //                           {question.frequency.toFixed(1)}
// //                         </span>
// //                         <span className="category-tag">{question.category}</span>
// //                       </div>
// //                     </div>
// //                     <div className="question-actions">
// //                       <button 
// //                         className={`save-btn ${savedQuestions.includes(question.id) ? 'saved' : ''}`}
// //                         onClick={(e) => toggleSavedQuestion(question.id, e)}
// //                       >
// //                         <FiBookmark />
// //                       </button>
// //                       {expandedQuestion === question.id ? <FiChevronUp /> : <FiChevronDown />}
// //                     </div>
// //                   </div>
                  
// //                   {expandedQuestion === question.id && (
// //                     <div className="question-details">
// //                       <div className="topics">
// //                         {question.topics.map(topic => (
// //                           <span key={topic} className="topic-tag">{topic}</span>
// //                         ))}
// //                       </div>
// //                       <div className="description">
// //                         <h4>Description</h4>
// //                         <p>{question.description}</p>
// //                       </div>
// //                       <div className="solution">
// //                         <h4>Solution Approach</h4>
// //                         <p>{question.solution}</p>
// //                       </div>
// //                       <div className="actions">
// //                         <a 
// //                           href={question.leetcodeLink} 
// //                           target="_blank" 
// //                           rel="noopener noreferrer"
// //                           className="leetcode-link"
// //                         >
// //                           <FiExternalLink /> Solve on LeetCode
// //                         </a>
// //                         <button className="practice-btn">
// //                           <FiCode /> Practice in Editor
// //                         </button>
// //                       </div>
// //                     </div>
// //                   )}
// //                 </div>
// //               ))
// //             ) : (
// //               <div className="no-results">
// //                 <FiFilter size={48} />
// //                 <h3>No questions match your criteria</h3>
// //                 <p>Try adjusting your filters or search term</p>
// //               </div>
// //             )}
// //           </div>
// //         </main>
// //       </div>
// //     </div>
// //   );
// // };

// export default Questions;