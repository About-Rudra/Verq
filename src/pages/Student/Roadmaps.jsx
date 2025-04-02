import React, { useState } from 'react';
import '../../styles/Student/Roadmaps.css';

const Roadmaps = () => {
  const [activeTab, setActiveTab] = useState('dsa');
  const [completedSteps, setCompletedSteps] = useState(new Set());

  const toggleStepCompletion = (roadmapId, stepId) => {
    const key = `${roadmapId}-${stepId}`;
    setCompletedSteps(prev => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  const roadmaps = {
    dsa: {
      title: "Data Structures & Algorithms",
      externalLink: "https://leetcode.com/discuss/general-discussion/494279/comprehensive-data-structure-and-algorithm-study-guide",
      steps: [
        { id: 1, title: "Basic Data Structures", topics: "Arrays, Strings, Linked Lists", duration: "2 weeks" },
        { id: 2, title: "Sorting Algorithms", topics: "Bubble, Merge, Quick, Heap Sort", duration: "1 week" },
        { id: 3, title: "Searching Algorithms", topics: "Binary Search, Hashing", duration: "1 week" },
        { id: 4, title: "Advanced Data Structures", topics: "Trees, Graphs, Heaps", duration: "3 weeks" },
        { id: 5, title: "Algorithm Paradigms", topics: "Recursion, DP, Greedy, Divide & Conquer", duration: "3 weeks" }
      ]
    },
    daa: {
      title: "Design & Analysis of Algorithms",
      externalLink: "https://www.geeksforgeeks.org/fundamentals-of-algorithms/",
      steps: [
        { id: 1, title: "Asymptotic Analysis", topics: "Big-O, Omega, Theta notations", duration: "1 week" },
        { id: 2, title: "Divide & Conquer", topics: "Master Theorem, Sample Problems", duration: "2 weeks" },
        { id: 3, title: "Dynamic Programming", topics: "Memoization, Tabulation, Problems", duration: "3 weeks" },
        { id: 4, title: "Graph Algorithms", topics: "Dijkstra, Floyd-Warshall, MST", duration: "3 weeks" },
        { id: 5, title: "NP-Completeness", topics: "P vs NP, Reduction techniques", duration: "2 weeks" }
      ]
    },
    cpp: {
      title: "C++ Programming",
      externalLink: "https://www.learncpp.com/",
      steps: [
        { id: 1, title: "C++ Basics", topics: "Syntax, Data Types, Operators", duration: "1 week" },
        { id: 2, title: "OOP in C++", topics: "Classes, Objects, Inheritance", duration: "2 weeks" },
        { id: 3, title: "STL", topics: "Containers, Algorithms, Iterators", duration: "2 weeks" },
        { id: 4, title: "Advanced C++", topics: "Templates, Smart Pointers, Move Semantics", duration: "3 weeks" },
        { id: 5, title: "C++ Projects", topics: "Build real-world applications", duration: "4 weeks" }
      ]
    },
    leetcode: {
      title: "LeetCode Preparation",
      externalLink: "https://neetcode.io/roadmap",
      steps: [
        { id: 1, title: "Easy Problems", topics: "Arrays, Strings, Basic Algorithms", duration: "2 weeks" },
        { id: 2, title: "Pattern Recognition", topics: "Two Pointers, Sliding Window", duration: "2 weeks" },
        { id: 3, title: "Medium Problems", topics: "Trees, Graphs, Backtracking", duration: "3 weeks" },
        { id: 4, title: "Hard Problems", topics: "Dynamic Programming, Advanced Graphs", duration: "3 weeks" },
        { id: 5, title: "Mock Interviews", topics: "Timed sessions, System Design", duration: "2 weeks" }
      ]
    },
    java: {
      title: "Java Programming",
      externalLink: "https://www.baeldung.com/java-tutorial",
      steps: [
        { id: 1, title: "Java Fundamentals", topics: "Syntax, OOP Concepts", duration: "2 weeks" },
        { id: 2, title: "Collections Framework", topics: "List, Set, Map, Stream API", duration: "2 weeks" },
        { id: 3, title: "Concurrency", topics: "Threads, Executors, Synchronization", duration: "3 weeks" },
        { id: 4, title: "JVM Internals", topics: "Memory Model, Garbage Collection", duration: "2 weeks" },
        { id: 5, title: "Frameworks", topics: "Spring, Hibernate, Microservices", duration: "4 weeks" }
      ]
    },
    systemDesign: {
      title: "System Design",
      externalLink: "https://github.com/donnemartin/system-design-primer",
      steps: [
        { id: 1, title: "Basic Concepts", topics: "Scalability, Latency, Throughput", duration: "2 weeks" },
        { id: 2, title: "Database Design", topics: "SQL vs NoSQL, Indexing, Sharding", duration: "2 weeks" },
        { id: 3, title: "Caching Strategies", topics: "CDN, Redis, Memcached", duration: "2 weeks" },
        { id: 4, title: "Distributed Systems", topics: "Load Balancing, Consensus", duration: "3 weeks" },
        { id: 5, title: "Case Studies", topics: "Design Twitter, Uber, Netflix", duration: "3 weeks" }
      ]
    }
  };

  return (
    <div className="roadmap-container">
      <h1 className="roadmap-header">Learning Roadmaps</h1>
      
      <div className="roadmap-tabs">
        {Object.keys(roadmaps).map(tab => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {roadmaps[tab].title}
          </button>
        ))}
      </div>
      
      <div className="roadmap-content">
        <div className="roadmap-header-section">
          <h2>{roadmaps[activeTab].title} Roadmap</h2>
          {roadmaps[activeTab].externalLink && (
            <a 
              href={roadmaps[activeTab].externalLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="external-link"
            >
              View Detailed Roadmap ↗️
            </a>
          )}
        </div>
        
        <div className="timeline">
          {roadmaps[activeTab].steps.map(step => {
            const stepKey = `${activeTab}-${step.id}`;
            const isCompleted = completedSteps.has(stepKey);
            
            return (
              <div 
                key={step.id} 
                className={`timeline-step ${isCompleted ? 'completed' : ''}`}
                onClick={() => toggleStepCompletion(activeTab, step.id)}
              >
                <div className="timeline-bullet"></div>
                <div className="timeline-content">
                  <h3>{step.title}</h3>
                  <p className="topics">{step.topics}</p>
                  <p className="duration">{step.duration}</p>
                  {isCompleted && <span className="completed-check">✓</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Roadmaps;