import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Plus, MessageSquare, Mic, Send, Menu } from 'lucide-react';

// --- 1. SETUP: API KEY & GEMINI MODEL ---
// Make sure to create a .env file in your project's root
// and add your API key like this: VITE_GEMINI_API_KEY="YOUR_API_KEY"
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });


// --- 2. SIDEBAR COMPONENT ---
// This component renders the left navigation and chat history.

const Sidebar = () => {
  // Placeholder data for chat history, to be replaced with backend data later.
  const chatHistory = [
    "Importance of computers in biol...",
    "Insert data into tree",
    "Co-pilot system for controllers",
    "Gandhi's views on suicide",
    "Java concepts overview",
    "Blockchain for ID security",
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-gray-900 text-gray-300 p-2">
      {/* New Chat Button */}
      <div className="flex-shrink-0">
        <button className="flex items-center justify-between w-full p-2 rounded-md hover:bg-gray-700 transition-colors">
          <div className="flex items-center space-x-2">
            <MessageSquare size={20} />
            <span className="text-sm font-medium">New Chat</span>
          </div>
          <Plus size={16} />
        </button>
      </div>

      {/* Chat History Section */}
      <div className="flex-1 overflow-y-auto mt-4 space-y-2">
        <p className="text-xs font-semibold text-gray-500 px-2">Chats</p>
        <nav className="flex flex-col space-y-1">
          {chatHistory.map((chat, index) => (
            <a key={index} href="#" className="text-sm px-2 py-1.5 rounded-md hover:bg-gray-800 truncate">
              {chat}
            </a>
          ))}
        </nav>
      </div>

      {/* User Profile Section */}
      <div className="flex-shrink-0 border-t border-gray-700/80 pt-2 mt-2">
        <div className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-800 cursor-pointer">
          <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center font-bold text-white">S</div>
          <span className="text-sm font-medium">Sayan Ankur</span>
        </div>
      </div>
    </aside>
  );
};


// --- 3. CHAT INTERFACE COMPONENT ---
// This component handles the main chat display, input, and API communication.

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm Sukoon, your mental health companion. How can I help you today?", sender: 'bot' }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const newUserMessage = { text: userInput, sender: 'user' };
    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);
    setUserInput('');

    try {
      const chat = model.startChat({ history: messages.map(msg => ({ role: msg.sender === 'user' ? 'user' : 'model', parts: [{ text: msg.text }] })).slice(0, -1) });
      const result = await chat.sendMessage(userInput);
      const botResponseText = result.response.text();
      setMessages(prev => [...prev, { text: botResponseText, sender: 'bot' }]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      setMessages(prev => [...prev, { text: "I'm having trouble connecting right now. Please try again.", sender: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  // A simple "thinking..." indicator component
  const TypingIndicator = () => (
    <div className="flex justify-start">
      <div className="bg-gray-700 rounded-2xl rounded-bl-none p-3 max-w-md lg:max-w-lg">
        <div className="flex items-center space-x-1">
          <span className="text-gray-400">Sukoon is thinking</span>
          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full w-full bg-gray-800">
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-4xl mx-auto h-full">
          {messages.length <= 1 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-800 rounded-full mb-4"></div>
              <h1 className="text-2xl font-semibold">What can I help with?</h1>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.slice(1).map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-lg p-3 rounded-2xl break-words ${msg.sender === 'user' ? 'bg-blue-600 rounded-br-none' : 'bg-gray-700 rounded-bl-none'}`}>
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </div>
              ))}
              {isLoading && <TypingIndicator />}
              <div ref={chatEndRef} />
            </div>
          )}
        </div>
      </main>

      <footer className="p-4 md:p-6 w-full max-w-4xl mx-auto">
        <form onSubmit={handleSendMessage} className="relative">
          <div className="relative flex items-center">
            <button type="button" className="absolute left-3 text-gray-400 hover:text-gray-200">
              <Plus size={20} />
            </button>
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => { if (e.key === 'Enter' && !e.shiftKey) { handleSendMessage(e); } }}
              placeholder="Ask anything..."
              rows="1"
              className="flex-1 py-3 pl-10 pr-24 w-full bg-gray-700 border border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none text-white"
              disabled={isLoading}
            />
            <div className="absolute right-3 flex items-center space-x-2">
              <button type="button" className="p-2 text-gray-400 hover:text-gray-200 rounded-full hover:bg-gray-600"><Mic size={20} /></button>
              <button type="submit" className="p-2 rounded-full text-white transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed enabled:bg-orange-600 enabled:hover:bg-orange-700" disabled={!userInput.trim() || isLoading}><Send size={20} /></button>
            </div>
          </div>
        </form>
      </footer>
    </div>
  );
};


// --- 4. MAIN PAGE LAYOUT ---
// This component assembles the Sidebar and ChatInterface into the final page.

const ChatPage = () => {
  return (
    <div className="flex h-screen w-screen font-sans bg-gray-800 text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* Mobile Header - only shows on small screens */}
        <header className="lg:hidden flex items-center justify-between p-2 bg-gray-900 border-b border-gray-700">
          <button className="p-2"><Menu size={24} /></button>
          <h1 className="text-lg font-semibold">New Chat</h1>
          <button className="p-2"><Plus size={24} /></button>
        </header>
        <ChatInterface />
      </div>
    </div>
  );
};

export default ChatPage;