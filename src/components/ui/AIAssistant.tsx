import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, User, ChevronDown } from "lucide-react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

type Message = { role: "user" | "ai"; content: string; id: string };

const SUGGESTIONS = [
  "Who is Sayantan?",
  "What are his skills?",
  "Show me his projects",
  "How can I contact him?"
];

const KNOWLEDGE = [
  { keywords: ["who", "sayantan", "about", "bio"], response: "I'm Sayantan Roy, a CSE (AI) student and software developer. I build modern, intelligent digital experiences that solve real-world problems. My focus is on Artificial Intelligence and software engineering." },
  { keywords: ["skill", "tech", "stack", "language", "framework"], response: "Sayantan specializes in Programming & Web (Python, C++, Java, JS/TS, React, Node.js), AI & Machine Learning, and UI/UX Design." },
  { keywords: ["project", "build", "portfolio", "work"], response: "He has built several projects including a Real-Time Voice Translation app, a Face Recognition Attendance System, a Modern Portfolio, an E-commerce Platform, and a Smart Weather App. You can view them in the Projects section!" },
  { keywords: ["contact", "email", "hire", "reach"], response: "You can reach Sayantan via email at godsayantanroy2005@gmail.com, or through his GitHub and LinkedIn profiles linked in the navigation menu." },
  { keywords: ["education", "study", "degree", "university", "school", "college"], response: "Sayantan is currently pursuing a Bachelor of Technology in Computer Science and Engineering with a specialization in Artificial Intelligence at UEM Kolkata (2023-2027), maintaining a 9.24 CGPA." },
  { keywords: ["game", "play", "hobby"], response: "Outside of coding, Sayantan is a passionate gamer. He enjoys games like Genshin Impact, Hogwarts Legacy, God of War, and Sparking Zero!" }
];

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "ai", content: "Hi! I'm Sayantan's personal AI assistant. What would you like to know about him?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text: string = input) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const lower = text.toLowerCase();
      let bestMatch = KNOWLEDGE.find(k => k.keywords.some(word => lower.includes(word)));
      
      const responseContent = bestMatch 
        ? bestMatch.response 
        : "I don't have that exact information in Sayantan's portfolio yet. Feel free to contact him directly at godsayantanroy2005@gmail.com!";
      
      const aiMsg: Message = { id: (Date.now() + 1).toString(), role: "ai", content: responseContent };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800 + Math.random() * 600);
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0 }}
        animate={{ scale: isOpen ? 0 : 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 md:px-5 md:py-4 rounded-full shadow-[0_0_30px_rgba(56,189,248,0.3)] border border-sky-400/20 text-white font-medium"
        style={{ 
          background: "linear-gradient(135deg, rgba(15,23,42,0.98), rgba(56,189,248,0.2))",
          // Removed backdrop-filter to drastically improve performance
        }}
      >
        <Bot size={20} className="text-sky-400" />
        <span className="hidden md:inline text-sm">ASK SAYANTAN AI</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95, pointerEvents: "none" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] md:w-[400px] h-[550px] max-h-[80vh] flex flex-col rounded-2xl overflow-hidden shadow-[0_10px_50px_rgba(0,0,0,0.8)] border border-sky-400/20 bg-[#0a0a0f]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-sky-400/10 bg-[#0f172a]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-sky-400/20 flex items-center justify-center border border-sky-400/30">
                  <Bot size={16} className="text-sky-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white leading-tight">Sayantan AI</h3>
                  <span className="text-[10px] text-emerald-400 font-mono tracking-widest uppercase flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Online
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              >
                <ChevronDown size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 scrollbar-thin scrollbar-thumb-sky-400/20 scrollbar-track-transparent bg-[#0a0a0f]">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-end gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-indigo-500/20 text-indigo-300' : 'bg-sky-500/20 text-sky-300'}`}>
                      {msg.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                    </div>
                    <div 
                      className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'user' 
                          ? 'bg-[#1e1b4b] border border-indigo-500/30 text-indigo-100 rounded-br-sm' 
                          : 'bg-[#1e293b] border border-white/10 text-gray-200 rounded-bl-sm'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-end gap-2 max-w-[85%]">
                    <div className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-300 flex items-center justify-center shrink-0">
                      <Bot size={12} />
                    </div>
                    <div className="px-4 py-3 rounded-2xl bg-[#1e293b] border border-white/10 rounded-bl-sm flex gap-1">
                      <motion.div animate={{ y: reduced ? 0 : [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 rounded-full bg-sky-400/50" />
                      <motion.div animate={{ y: reduced ? 0 : [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-sky-400/50" />
                      <motion.div animate={{ y: reduced ? 0 : [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-sky-400/50" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {messages.length === 1 && (
              <div className="px-5 pb-3 flex flex-wrap gap-2 bg-[#0a0a0f]">
                {SUGGESTIONS.map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(suggestion)}
                    className="text-[11px] px-3 py-1.5 rounded-full bg-[#0c4a6e] border border-sky-400/20 text-sky-300 hover:bg-sky-400/20 transition-colors text-left"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t border-white/10 bg-[#0f172a]">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="relative flex items-center"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="w-full bg-[#1e293b] border border-white/10 rounded-full pl-4 pr-12 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-sky-400/50 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 p-1.5 text-sky-400 hover:bg-sky-400/20 rounded-full transition-colors disabled:opacity-50 disabled:hover:bg-transparent"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
