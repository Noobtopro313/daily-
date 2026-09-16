import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot, User, ArrowRight, Loader2, Minimize2 } from 'lucide-react';
import { Product } from '../types';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  currentProduct?: Product | null;
  onSelectProduct: (product: Product) => void;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  suggestedProductIds?: string[];
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  products,
  currentProduct,
  onSelectProduct,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Salam! Main aapka AI Shopping Assistant hoon ⚡ Main aapko store products, hamare WhatsApp Channel aur WhatsApp Catalog ke mutabiq best deals aur gadgets recommend kar sakta hoon. Direct WhatsApp par order bhi ho sakta hai!',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<'gemini-3.5-flash' | 'gemini-3.1-pro-preview' | 'gemini-3.1-flash-lite'>('gemini-3.5-flash');
  const [selectedRole, setSelectedRole] = useState<'shopping-guide' | 'tech-engineer' | 'deal-hunter'>('shopping-guide');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const catalogSummary = products
    .slice(0, 15)
    .map((p) => `[${p.id}] ${p.name} (${p.category}) - $${p.price}. ${p.tagline}. Key features: ${p.features.slice(0, 2).join(', ')}`)
    .join('\n');

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const historyForApi = messages.map((m) => ({
        role: m.role === 'user' ? 'user' : 'model',
        content: m.text,
      }));

      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          history: historyForApi,
          catalogSummary,
          model: selectedModel,
          role: selectedRole,
          currentProduct: currentProduct
            ? {
                name: currentProduct.name,
                category: currentProduct.category,
                price: currentProduct.price,
                specs: currentProduct.specs,
              }
            : null,
          whatsappNumber: storeSettings.whatsappNumber,
          whatsappChannelUrl: storeSettings.whatsappChannelUrl,
          whatsappCatalogUrl: storeSettings.whatsappCatalogUrl,
          customCatalogFeed: storeSettings.customCatalogFeed,
        }),
      });

      const data = await response.json();

      // Find mentioned products
      const matchedProducts = products.filter((p) =>
        data.reply?.toLowerCase().includes(p.name.toLowerCase())
      );

      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        text: data.reply || 'Here is what I found for you!',
        suggestedProductIds: matchedProducts.slice(0, 3).map((p) => p.id),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error('AI chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          role: 'assistant',
          text: 'Sorry, I had a brief network glitch. You can ask me about our ANC Earbuds, Smartwatches, or Gaming keyboards anytime!',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    'Recommend best headphones for gym',
    'Best smartwatch for heart tracking?',
    'What wireless chargers do you have?',
    'Show me gaming accessories',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full sm:max-w-lg h-[85vh] sm:h-[620px] bg-[#121519] border border-white/10 rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden text-white">
        
        {/* Header */}
        <div className="px-5 py-3 border-b border-white/10 bg-[#171B20] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#32B83F] to-[#208a2b] flex items-center justify-center shadow-lg shadow-[#32B83F]/20">
              <Sparkles className="w-4 h-4 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-white">Nexora AI Advisor</h3>
                <span className="text-[10px] bg-[#32B83F]/20 text-[#32B83F] px-1.5 py-0.5 rounded font-mono font-bold">
                  MULTI-MODEL
                </span>
              </div>
              <p className="text-[11px] text-gray-400">Multi-turn chat • WhatsApp Catalog Sync</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Model & Persona Selection Bar */}
        <div className="px-4 py-2 bg-[#14181D] border-b border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Model:</span>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value as any)}
              className="bg-[#0B0D0F] border border-white/10 rounded-md px-2 py-1 text-[11px] text-gray-200 focus:outline-none focus:border-[#32B83F] cursor-pointer"
            >
              <option value="gemini-3.5-flash">gemini-3.5-flash (General)</option>
              <option value="gemini-3.1-pro-preview">gemini-3.1-pro-preview (Complex Tasks)</option>
              <option value="gemini-3.1-flash-lite">gemini-3.1-flash-lite (Fast Tasks)</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Role:</span>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as any)}
              className="bg-[#0B0D0F] border border-white/10 rounded-md px-2 py-1 text-[11px] text-gray-200 focus:outline-none focus:border-[#32B83F] cursor-pointer"
            >
              <option value="shopping-guide">🛍️ Shopping Guide</option>
              <option value="tech-engineer">🔬 Tech Engineer</option>
              <option value="deal-hunter">🏷️ Deal Hunter</option>
            </select>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-[#32B83F]/20 border border-[#32B83F]/30 flex items-center justify-center flex-shrink-0 text-[#32B83F]">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[82%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-[#32B83F] text-white rounded-tr-none'
                    : 'bg-[#1A1F26] text-gray-200 border border-white/5 rounded-tl-none'
                }`}
              >
                <p className="whitespace-pre-wrap">{m.text}</p>

                {/* Suggested Products matching the response */}
                {m.suggestedProductIds && m.suggestedProductIds.length > 0 && (
                  <div className="mt-3 pt-2 border-t border-white/10 space-y-1.5">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      Recommended Products:
                    </p>
                    {m.suggestedProductIds.map((pId) => {
                      const prod = products.find((p) => p.id === pId);
                      if (!prod) return null;
                      return (
                        <button
                          key={pId}
                          onClick={() => {
                            onSelectProduct(prod);
                            onClose();
                          }}
                          className="w-full flex items-center justify-between p-2 rounded-lg bg-[#121519] hover:bg-[#20252C] border border-white/10 text-left transition-colors group"
                        >
                          <div className="flex items-center gap-2">
                            <img
                              src={prod.image}
                              alt={prod.name}
                              className="w-7 h-7 rounded object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <div>
                              <p className="text-xs font-semibold text-white group-hover:text-[#32B83F] transition-colors line-clamp-1">
                                {prod.name}
                              </p>
                              <p className="text-[10px] text-[#32B83F] font-bold font-mono">
                                ${prod.price}
                              </p>
                            </div>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {m.role === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 text-white">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start items-center text-xs text-gray-400">
              <div className="w-7 h-7 rounded-lg bg-[#32B83F]/20 border border-[#32B83F]/30 flex items-center justify-center text-[#32B83F]">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-[#1A1F26] px-4 py-2.5 rounded-2xl rounded-tl-none border border-white/5 flex items-center gap-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#32B83F]" />
                <span>Thinking with Gemini AI...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick prompt chips */}
        <div className="px-4 py-2 bg-[#171B20]/60 border-t border-white/5 flex gap-2 overflow-x-auto no-scrollbar">
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSendMessage(prompt)}
              className="flex-shrink-0 text-[11px] px-3 py-1 rounded-full bg-white/5 hover:bg-[#32B83F]/20 hover:text-[#32B83F] border border-white/10 text-gray-300 transition-colors whitespace-nowrap"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Footer */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 bg-[#171B20] border-t border-white/10 flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Ask about specs, battery life, sound quality..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl bg-[#0B0D0F] border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#32B83F] transition-colors"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="px-4 py-2.5 rounded-xl bg-[#32B83F] hover:bg-[#289934] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-[#32B83F]/20"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
