import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

interface Message {
  type: "user" | "assistant";
  content: string;
}

export const Terminal = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "assistant",
      content: "Hello! I'm your loan assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = { type: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate API response
    try {
      // Add loading message
      setMessages((prev) => [
        ...prev,
        { type: "assistant", content: "Thinking..." },
      ]);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Replace loading message with response
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          type: "assistant",
          content: `I understand you're asking about "${input}". Let me help you with that...`,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          type: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    }
  };

  return (
    <div className="glass-card flex flex-col h-[400px] p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-sm text-gray-500">Loan Assistant</span>
      </div>

      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.type === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              <p className="text-sm">{message.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};