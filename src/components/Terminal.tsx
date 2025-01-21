import React, { useState, useRef, useEffect } from "react";
import { Send, Key } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface Message {
  type: "user" | "assistant";
  content: string;
}

export const Terminal = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "assistant",
      content: "Hello! I'm your loan assistant. Please provide your OpenAI API key to continue.",
    },
  ]);
  const [input, setInput] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [showApiInput, setShowApiInput] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      setShowApiInput(false);
      setMessages((prev) => [...prev, {
        type: "assistant",
        content: "API key set! How can I help you with your loan today?",
      }]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = { type: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      // Add loading message
      setMessages((prev) => [
        ...prev,
        { type: "assistant", content: "Thinking..." },
      ]);

      // Make API call to OpenAI
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful loan assistant. You help users understand loan terms, eligibility, and application processes. Keep responses concise and focused on lending.',
            },
            {
              role: 'user',
              content: input,
            },
          ],
          temperature: 0.7,
          max_tokens: 150,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from OpenAI');
      }

      const data = await response.json();
      const assistantResponse = data.choices[0]?.message?.content || "I couldn't process that request.";

      // Replace loading message with response
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          type: "assistant",
          content: assistantResponse,
        },
      ]);
    } catch (error) {
      console.error('OpenAI API Error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get a response. Please check your API key and try again.",
      });
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          type: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    }
  };

  if (showApiInput) {
    return (
      <div className="glass-card flex flex-col h-[400px] p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-sm text-gray-500">API Key Setup</span>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <form onSubmit={handleApiKeySubmit} className="w-full max-w-md space-y-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="apiKey" className="text-sm font-medium text-gray-700">
                Enter your OpenAI API key
              </label>
              <div className="relative">
                <input
                  id="apiKey"
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-..."
                  className="w-full p-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Key className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>
            <button
              type="submit"
              className="w-full p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            >
              Set API Key
            </button>
          </form>
        </div>
      </div>
    );
  }

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