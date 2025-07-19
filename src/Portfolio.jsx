import React, { useState, useEffect, useRef } from 'react';
import { Send, Moon, Sun, RotateCcw, User, Code, Briefcase, Mail, MessageSquare, Lightbulb, ChevronUp, ChevronDown } from 'lucide-react';

const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });
  
  const [messages, setMessages] = useState([]);
  const [currentWord, setCurrentWord] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const dynamicWords = ['apps', 'AI tools', 'web apps', 'Chrome extensions', 'side projects', 'experiences'];

  // Scroll to bottom when new messages are added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    messagesContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Check if user can scroll
  const checkScrollButtons = () => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      setShowScrollButtons(scrollHeight > clientHeight);
    }
  };

  useEffect(() => {
    scrollToBottom();
    checkScrollButtons();
  }, [messages]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollButtons);
      return () => container.removeEventListener('scroll', checkScrollButtons);
    }
  }, [messages.length]);

  // Dark mode persistence
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('darkMode', darkMode.toString());
    }
  }, [darkMode]);

  // Dynamic word cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % dynamicWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Format timestamp like modern chat platforms
  const formatTimestamp = (date) => {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Response database
  const responses = {
    about: {
      text: "I'm a passionate developer who believes in building products that people genuinely love to use. With a background in full-stack development and a keen eye for design, I focus on creating experiences that are both technically excellent and delightfully intuitive. I'm constantly exploring new technologies and methodologies to push the boundaries of what's possible on the web.",
      prompts: [
        { text: "What's your background?", icon: User, key: "background" },
        { text: "What projects have you built?", icon: Code, key: "projects" },
        { text: "What's your development philosophy?", icon: Lightbulb, key: "philosophy" }
      ]
    },
    background: {
      text: "I started my journey in computer science with a fascination for how technology can solve real-world problems. Over the years, I've worked across various domains - from fintech startups to enterprise solutions. I have a Master's degree in Computer Science and have been building for the web for over 5 years. My experience spans both frontend and backend development, with a particular passion for creating seamless user experiences.",
      prompts: [
        { text: "What projects have you built?", icon: Code, key: "projects" },
        { text: "What tools do you use?", icon: Briefcase, key: "stack" },
        { text: "Can we work together?", icon: MessageSquare, key: "collaborate" }
      ]
    },
    projects: {
      text: "I've built a diverse range of projects that showcase my passion for innovation:\n\n🚀 **TaskFlow AI** - An intelligent project management tool that uses AI to predict project timelines and optimize resource allocation\n\n💰 **CryptoTracker Pro** - A real-time cryptocurrency portfolio tracker with advanced analytics and alerts\n\n🛒 **ShopSmart** - An e-commerce platform with AI-powered product recommendations\n\n📱 **MoodSpace** - A mental wellness app that helps users track and improve their emotional well-being\n\nEach project taught me something new about user experience, technical architecture, and the importance of solving real problems.",
      prompts: [
        { text: "Tell me about TaskFlow AI", icon: Code, key: "taskflow" },
        { text: "What tools do you use?", icon: Briefcase, key: "stack" },
        { text: "How can I contact you?", icon: Mail, key: "contact" }
      ]
    },
    taskflow: {
      text: "**TaskFlow AI** is one of my most ambitious projects - a next-generation project management platform that leverages machine learning to make teams more productive.\n\n✨ **Key Features:**\n• AI-powered timeline predictions based on historical data\n• Smart resource allocation and workload balancing\n• Automated progress tracking and bottleneck detection\n• Integration with popular tools like Slack, GitHub, and Jira\n\n🛠 **Tech Stack:** React, Node.js, Python (for ML models), PostgreSQL, Redis, Docker\n\nThe platform has helped teams reduce project delivery time by an average of 23% while improving resource utilization.",
      prompts: [
        { text: "What other projects have you built?", icon: Code, key: "projects" },
        { text: "What's your tech stack?", icon: Briefcase, key: "stack" },
        { text: "Can we collaborate?", icon: MessageSquare, key: "collaborate" }
      ]
    },
    stack: {
      text: "I work with modern, battle-tested technologies that enable me to build scalable and maintainable applications:\n\n**Frontend:** React, Next.js, TypeScript, Tailwind CSS, Framer Motion\n**Backend:** Node.js, Python, Express, FastAPI, GraphQL\n**Databases:** PostgreSQL, MongoDB, Redis\n**Cloud & DevOps:** AWS, Vercel, Docker, GitHub Actions\n**AI/ML:** OpenAI API, TensorFlow, Pandas, NumPy\n**Design:** Figma, Adobe Creative Suite\n\nI believe in choosing the right tool for the job while maintaining consistency and focusing on developer experience and performance.",
      prompts: [
        { text: "What projects showcase these skills?", icon: Code, key: "projects" },
        { text: "What's your development philosophy?", icon: Lightbulb, key: "philosophy" },
        { text: "Let's work together", icon: MessageSquare, key: "collaborate" }
      ]
    },
    philosophy: {
      text: "My development philosophy centers around three core principles:\n\n🎯 **User-First Design** - Every technical decision should ultimately serve the user's needs and create delightful experiences\n\n⚡ **Performance & Accessibility** - Fast, accessible applications aren't just nice-to-have, they're essential for reaching and serving everyone\n\n🔄 **Continuous Learning** - Technology evolves rapidly, so I'm constantly experimenting with new tools, patterns, and approaches to stay at the cutting edge\n\nI believe the best software is invisible - it just works, feels natural, and empowers users to accomplish their goals effortlessly.",
      prompts: [
        { text: "What projects reflect this philosophy?", icon: Code, key: "projects" },
        { text: "What tools do you use?", icon: Briefcase, key: "stack" },
        { text: "How can we work together?", icon: MessageSquare, key: "collaborate" }
      ]
    },
    collaborate: {
      text: "I'm always excited to work on meaningful projects with passionate people! Whether you're a startup looking to build your MVP, an established company wanting to innovate, or a fellow developer interested in collaboration, I'd love to hear from you.\n\n💼 **What I offer:**\n• Full-stack development expertise\n• Product strategy and technical consultation\n• UI/UX design and prototyping\n• AI integration and automation\n\n🤝 **Ideal collaborations:**\n• SaaS platforms and web applications\n• AI-powered tools and automation\n• Consumer apps with complex technical requirements\n• Open source projects that make a difference",
      prompts: [
        { text: "How can I contact you?", icon: Mail, key: "contact" },
        { text: "What's your availability?", icon: User, key: "availability" },
        { text: "Tell me about your process", icon: Lightbulb, key: "process" }
      ]
    },
    availability: {
      text: "I'm currently available for new projects and collaborations! I typically work with 2-3 clients at a time to ensure each project gets the attention and quality it deserves.\n\n📅 **Timeline:** Most projects can start within 1-2 weeks\n⏰ **Commitment:** I believe in deep, focused work rather than juggling too many projects\n🌍 **Location:** I work remotely but love collaborating across time zones\n\nI prefer working on projects where I can be involved from strategy through execution, ensuring we build something truly exceptional together.",
      prompts: [
        { text: "How can I contact you?", icon: Mail, key: "contact" },
        { text: "What's your process like?", icon: Lightbulb, key: "process" },
        { text: "What projects have you built?", icon: Code, key: "projects" }
      ]
    },
    process: {
      text: "My development process is designed to minimize risk while maximizing value delivery:\n\n🔍 **Discovery Phase** - Deep dive into your goals, user needs, and technical requirements\n📋 **Strategy & Planning** - Create detailed roadmaps, wireframes, and technical architecture\n🚀 **Iterative Development** - Build in 2-week sprints with regular demos and feedback loops\n✅ **Quality Assurance** - Comprehensive testing, performance optimization, and security review\n🎯 **Launch & Beyond** - Deployment, monitoring, and ongoing support\n\nI believe in transparent communication, regular updates, and delivering working software early and often.",
      prompts: [
        { text: "Let's start a project together", icon: MessageSquare, key: "contact" },
        { text: "What tools do you use?", icon: Briefcase, key: "stack" },
        { text: "Tell me about your projects", icon: Code, key: "projects" }
      ]
    },
    contact: {
      text: "Ready to build something amazing together? I'd love to hear about your project and explore how we can bring your vision to life.\n\n📧 **Email:** hello@yourportfolio.com\n💼 **LinkedIn:** /in/yourprofile\n🐙 **GitHub:** /yourusername\n📅 **Calendar:** Schedule a call at calendly.com/yourname\n\n⚡ **Quick Response Promise:** I typically respond to project inquiries within 24 hours. For urgent matters, feel free to mention it in your message.\n\nLooking forward to hearing from you!",
      prompts: [
        { text: "Tell me about yourself", icon: User, key: "about" },
        { text: "What projects have you built?", icon: Code, key: "projects" },
        { text: "What's your availability?", icon: MessageSquare, key: "availability" }
      ]
    }
  };

  const initialPrompts = [
    { text: "Who are you?", icon: User, key: "about" },
    { text: "What projects have you built?", icon: Code, key: "projects" },
    { text: "What tools do you use?", icon: Briefcase, key: "stack" },
    { text: "Can we work together?", icon: MessageSquare, key: "collaborate" }
  ];

  const handlePromptClick = (promptKey) => {
    const promptText = initialPrompts.find(p => p.key === promptKey)?.text || 
                      Object.values(responses).flatMap(r => r.prompts).find(p => p.key === promptKey)?.text || 
                      'Tell me more';
    
    setInputValue(promptText);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      type: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simple keyword matching for custom messages
    const input = inputValue.toLowerCase();
    let responseKey = 'about'; // default

    if (input.includes('project') || input.includes('build') || input.includes('work')) {
      responseKey = 'projects';
    } else if (input.includes('tech') || input.includes('tool') || input.includes('stack')) {
      responseKey = 'stack';
    } else if (input.includes('contact') || input.includes('email') || input.includes('reach')) {
      responseKey = 'contact';
    } else if (input.includes('collaborate') || input.includes('work together') || input.includes('hire')) {
      responseKey = 'collaborate';
    } else if (input.includes('philosophy') || input.includes('approach') || input.includes('believe')) {
      responseKey = 'philosophy';
    }

    setTimeout(() => {
      const response = responses[responseKey];
      const botMessage = {
        type: 'bot',
        text: response.text,
        prompts: response.prompts,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const resetConversation = () => {
    setMessages([]);
  };

  const theme = {
    bg: darkMode ? 'bg-gray-950' : 'bg-white',
    surface: darkMode ? 'bg-gray-900' : 'bg-gray-50',
    surfaceElevated: darkMode ? 'bg-gray-800' : 'bg-white',
    surfaceHover: darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100',
    text: darkMode ? 'text-gray-100' : 'text-gray-900',
    textMuted: darkMode ? 'text-gray-400' : 'text-gray-600',
    textSubtle: darkMode ? 'text-gray-500' : 'text-gray-500',
    border: darkMode ? 'border-gray-800' : 'border-gray-200',
    borderSubtle: darkMode ? 'border-gray-700' : 'border-gray-100',
    accent: 'bg-blue-600',
    accentHover: 'hover:bg-blue-700',
    userBubble: darkMode ? 'bg-blue-600' : 'bg-blue-600',
    botBubble: darkMode ? 'bg-gray-800' : 'bg-gray-100',
    promptPill: darkMode ? 'bg-gray-800 hover:bg-gray-700 border-gray-700' : 'bg-white hover:bg-gray-50 border-gray-200'
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme.bg} ${theme.text} font-rethink`}>
      {/* Header with Blur Effect */}
      <header className={`${darkMode ? 'bg-transparent' : theme.surfaceElevated} sticky top-0 z-50 backdrop-blur-lg bg-opacity-80`}>
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <h1 className="font-semibold text-lg">Alex Portfolio</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            {messages.length > 0 && (
              <button
                onClick={resetConversation}
                className={`p-2 rounded-lg ${theme.surfaceHover} transition-colors`}
                title="Reset conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg ${theme.surfaceHover} transition-colors`}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-6 relative">
        {/* Hero Section */}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-8">
            {/* Logo and Title */}
            <div className="text-center">
              <div className="flex justify-center mb-8">
                <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg">
                  <img 
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRkZEQjAwIi8+CjxwYXRoIGQ9Ik01MCA5MEM3Mi4wOTE0IDkwIDkwIDcyLjA5MTQgOTAgNTBDOTAgMjcuOTA4NiA3Mi4wOTE0IDEwIDUwIDEwQzI3LjkwODYgMTAgMTAgMjcuOTA4NiAxMCA1MEMxMCA3Mi4wOTE0IDI3LjkwODYgOTAgNTAgOTBaIiBmaWxsPSJ3aGl0ZSIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIzIi8+CjxwYXRoIGQ9Ik0yMCA0MEMzMCA0MCA0MCAzMCA0MCAzMEM0MCAzMCA1MCAyNSA2MCAzMEM2MCAzNSA3MCA0MCA4MCA0MEw4MCA0NUw3MCA1MEw2MCA1MEw0MCA1MEwzMCA1MEwyMCA0NUwyMCA0MFoiIGZpbGw9ImJsYWNrIi8+CjxjaXJjbGUgY3g9IjM4IiBjeT0iNTgiIHI9IjMiIGZpbGw9ImJsYWNrIi8+CjxjaXJjbGUgY3g9IjYyIiBjeT0iNTgiIHI9IjMiIGZpbGw9ImJsYWNrIi8+CjxsaW5lIHgxPSI0OCIgeTE9IjY1IiB4Mj0iNDgiIHkyPSI3NSIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPHA+YXRoIGQ9Ik0zNSA3OEM0MCA3NSA0NSA3NSA1MCA3NUM1NSA3NSA2MCA3NSA2NSA3OCIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGZpbGw9Im5vbmUiLz4KPC9zdmc+" 
                    alt="Alex Avatar" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h2 className="text-7xl md:text-8xl font-bold mb-4 leading-tight">
                I build lovable
                <br />
                <span className="inline-block transition-all duration-500 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
                  {dynamicWords[currentWord]}
                </span>
              </h2>
            </div>

            {/* Main Input Field with Increased Height */}
            <div className="w-full max-w-3xl">
              <div className={`${theme.surfaceElevated} border ${theme.border} rounded-2xl p-8 shadow-sm`}>
                <div className="flex items-center space-x-4">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="What do you want to know?"
                    className={`flex-1 bg-transparent outline-none ${theme.text} placeholder-gray-400 font-normal text-xl py-4`}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className={`p-4 rounded-full ${theme.accent} ${theme.accentHover} disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
                  >
                    <Send className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Feature Buttons */}
            <div className="flex flex-wrap gap-3 justify-center">
              {initialPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handlePromptClick(prompt.key)}
                  className={`px-5 py-3 rounded-xl ${theme.promptPill} border transition-all duration-200 hover:scale-105 font-medium flex items-center gap-2 text-sm`}
                >
                  <prompt.icon className="w-4 h-4" />
                  {prompt.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.length > 0 && (
          <div className="relative">
            <div ref={messagesContainerRef} className="space-y-6 mb-6 max-h-[70vh] overflow-y-auto">
              {messages.map((message, index) => (
                <div key={index} className="space-y-2">
                  <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} items-start gap-3`}>
                    {/* Avatar for bot messages */}
                    {message.type === 'bot' && (
                      <div className="w-8 h-8 rounded-full overflow-hidden shadow-sm flex-shrink-0 mt-1">
                        <img 
                          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRkZEQjAwIi8+CjxwYXRoIGQ9Ik01MCA5MEM3Mi4wOTE0IDkwIDkwIDcyLjA5MTQgOTAgNTBDOTAgMjcuOTA4NiA3Mi4wOTE0IDEwIDUwIDEwQzI3LjkwODYgMTAgMTAgMjcuOTA4NiAxMCA1MEMxMCA3Mi4wOTE0IDI3LjkwODYgOTAgNTAgOTBaIiBmaWxsPSJ3aGl0ZSIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIzIi8+CjxwYXRoIGQ9Ik0yMCA0MEMzMCA0MCA0MCAzMCA0MCAzMEM0MCAzMCA1MCAyNSA2MCAzMEM2MCAzNSA3MCA0MCA4MCA0MEw4MCA0NUw3MCA1MEw2MCA1MEw0MCA1MEwzMCA1MEwyMCA0NUwyMCA0MFoiIGZpbGw9ImJsYWNrIi8+CjxjaXJjbGUgY3g9IjM4IiBjeT0iNTgiIHI9IjMiIGZpbGw9ImJsYWNrIi8+CjxjaXJjbGUgY3g9IjYyIiBjeT0iNTgiIHI9IjMiIGZpbGw9ImJsYWNrIi8+CjxsaW5lIHgxPSI0OCIgeTE9IjY1IiB4Mj0iNDgiIHkyPSI3NSIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPHA+YXRoIGQ9Ik0zNSA3OEM0MCA3NSA0NSA3NSA1MCA3NUM1NSA3NSA2MCA3NSA2NSA3OCIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGZpbGw9Im5vbmUiLz4KPC9zdmc+" 
                          alt="Alex Avatar" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    <div className={`max-w-2xl ${message.type === 'user' 
                      ? `${theme.userBubble} text-white` 
                      : `${theme.botBubble}`
                    } rounded-2xl px-4 py-3`}>
                      <div className="whitespace-pre-wrap font-normal leading-relaxed">{message.text}</div>
                    </div>
                  </div>
                  
                  {/* Timestamp */}
                  <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <span className={`text-xs ${theme.textSubtle} px-2 font-normal ${message.type === 'bot' ? 'ml-11' : ''}`}>
                      {formatTimestamp(message.timestamp)}
                    </span>
                  </div>
                  
                  {/* Prompt Suggestions for Bot Messages */}
                  {message.type === 'bot' && message.prompts && (
                    <div className="flex flex-wrap gap-2 mt-3 ml-11">
                      {message.prompts.map((prompt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handlePromptClick(prompt.key)}
                          className={`px-3 py-1.5 rounded-full text-sm ${theme.promptPill} border transition-all duration-200 hover:scale-105 font-medium flex items-center gap-1.5`}
                        >
                          <prompt.icon className="w-3 h-3" />
                          {prompt.text}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="space-y-2">
                  <div className="flex justify-start items-start gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden shadow-sm flex-shrink-0 mt-1">
                      <img 
                        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRkZEQjAwIi8+CjxwYXRoIGQ9Ik01MCA5MEM3Mi4wOTE0IDkwIDkwIDcyLjA5MTQgOTAgNTBDOTAgMjcuOTA4NiA3Mi4wOTE0IDEwIDUwIDEwQzI3LjkwODYgMTAgMTAgMjcuOTA4NiAxMCA1MEMxMCA3Mi4wOTE0IDI3LjkwODYgOTAgNTAgOTBaIiBmaWxsPSJ3aGl0ZSIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIzIi8+CjxwYXRoIGQ9Ik0yMCA0MEMzMCA0MCA0MCAzMCA0MCAzMEM0MCAzMCA1MCAyNSA2MCAzMEM2MCAzNSA3MCA0MCA4MCA0MEw4MCA0NUw3MCA1MEw2MCA1MEw0MCA1MEwzMCA1MEwyMCA0NUwyMCA0MFoiIGZpbGw9ImJsYWNrIi8+CjxjaXJjbGUgY3g9IjM4IiBjeT0iNTgiIHI9IjMiIGZpbGw9ImJsYWNrIi8+CjxjaXJjbGUgY3g9IjYyIiBjeT0iNTgiIHI9IjMiIGZpbGw9ImJsYWNrIi8+CjxsaW5lIHgxPSI0OCIgeTE9IjY1IiB4Mj0iNDgiIHkyPSI3NSIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPHA+YXRoIGQ9Ik0zNSA3OEM0MCA3NSA0NSA3NSA1MCA3NUM1NSA3NSA2MCA3NSA2NSA3OCIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGZpbGw9Im5vbmUiLz4KPC9zdmc+" 
                        alt="Alex Avatar" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className={`${theme.botBubble} rounded-2xl px-4 py-3`}>
                      <div className="flex space-x-1">
                        <div className={`w-2 h-2 bg-gray-400 rounded-full animate-pulse`}></div>
                        <div className={`w-2 h-2 bg-gray-400 rounded-full animate-pulse`} style={{animationDelay: '0.2s'}}></div>
                        <div className={`w-2 h-2 bg-gray-400 rounded-full animate-pulse`} style={{animationDelay: '0.4s'}}></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <span className={`text-xs ${theme.textSubtle} px-2 font-normal ml-11`}>
                      Typing...
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Scroll Buttons - Inside Chat Interface */}
            {messages.length > 0 && showScrollButtons && (
              <div className="fixed right-6 bottom-24 flex flex-col gap-2 z-40">
                <button
                  onClick={scrollToTop}
                  className={`p-3 rounded-full ${theme.surfaceElevated} ${theme.border} border shadow-lg hover:scale-110 transition-all opacity-90 hover:opacity-100`}
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  onClick={scrollToBottom}
                  className={`p-3 rounded-full ${theme.surfaceElevated} ${theme.border} border shadow-lg hover:scale-110 transition-all opacity-90 hover:opacity-100`}
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Input - Only show during conversation */}
        {messages.length > 0 && (
          <div className={`${theme.surfaceElevated} border ${theme.border} rounded-2xl p-4 sticky bottom-4 shadow-sm`}>
            <div className="flex items-center space-x-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Message Alex..."
                className={`flex-1 bg-transparent outline-none ${theme.text} placeholder-gray-400 font-normal py-1`}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className={`p-3 rounded-full ${theme.accent} ${theme.accentHover} disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;