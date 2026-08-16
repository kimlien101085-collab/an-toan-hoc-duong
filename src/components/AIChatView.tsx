import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import {
  Bot,
  Send,
  Sparkles,
  Volume2,
  VolumeX,
  Trash2,
  Copy,
  Check,
  User,
  ShieldCheck,
  Info,
} from 'lucide-react';

interface AIChatViewProps {
  onShowToast: (msg: string) => void;
}

export const AIChatView: React.FC<AIChatViewProps> = ({ onShowToast }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init_1',
      role: 'ai',
      text: 'Xin chào em! Tớ là **Trợ Lý AI An Toàn Học Đường** (được hỗ trợ bởi mô hình trí tuệ nhân tạo Gemini).\n\nTớ ở đây để lắng nghe, đồng hành và hỗ trợ em giải quyết các vấn đề liên quan đến tình bạn, phòng chống bạo lực, bắt nạt trên mạng và kỹ năng kiểm soát cảm xúc. Hãy chia sẻ bất cứ điều gì đang làm em bận lòng nhé! ❤️',
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Clean up speech when unmounting
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputPrompt).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      role: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          history: messages.map((m) => ({ role: m.role, text: m.text })),
        }),
      });

      const data = await res.json();
      const reply = data.reply || 'Tớ đã ghi nhận chia sẻ của em. Em hãy luôn giữ bình tĩnh và tìm kiếm sự giúp đỡ từ Thầy Cô nhé!';

      const aiMsg: ChatMessage = {
        id: `ai_${Date.now()}`,
        role: 'ai',
        text: reply,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        source: data.source,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      const fallbackAiMsg: ChatMessage = {
        id: `ai_${Date.now()}`,
        role: 'ai',
        text: 'Em hãy hít thở thật sâu và giữ bình tĩnh. Nếu đang trong tình huống nguy hiểm hoặc bị đe dọa, hãy bấm nút SOS hoặc đến ngay phòng Thầy Cô để được bảo vệ kịp thời nhé!',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackAiMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeechSynthesis = (msgId: string, text: string) => {
    if (!('speechSynthesis' in window)) {
      onShowToast('Trình duyệt của bạn không hỗ trợ đọc giọng nói.');
      return;
    }

    if (speakingMsgId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingMsgId(null);
      return;
    }

    window.speechSynthesis.cancel();
    // Clean markdown characters for smoother voice
    const cleanText = text.replace(/[*_#`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'vi-VN';
    utterance.rate = 0.95;

    utterance.onend = () => {
      setSpeakingMsgId(null);
    };

    utterance.onerror = () => {
      setSpeakingMsgId(null);
    };

    setSpeakingMsgId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopyText = (msgId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMsgId(msgId);
    onShowToast('Đã sao chép nội dung tư vấn!');
    setTimeout(() => {
      setCopiedMsgId(null);
    }, 2000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `init_${Date.now()}`,
        role: 'ai',
        text: 'Cuộc trò chuyện đã được làm mới. Em có câu hỏi hoặc tâm sự nào muốn chia sẻ cùng Trợ lý AI không?',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setSpeakingMsgId(null);
    onShowToast('Đã làm mới cuộc hội thoại.');
  };

  const presetPrompts = [
    { label: '💬 Bị bạn bè trêu chọc', prompt: 'Tôi bị bạn bè trong lớp trêu chọc và chế giễu ngoại hình thì nên làm gì để tự bảo vệ?' },
    { label: '🧘 Kiềm chế cơn giận (4-7-8)', prompt: 'Hướng dẫn tôi chi tiết cách kiềm chế cảm xúc khi tức giận theo quy tắc 4-7-8.' },
    { label: '🛡️ Đe dọa trên mạng xã hội', prompt: 'Bị bạn cùng trường lập nhóm nhắn tin đe dọa, xúc phạm trên Facebook thì phải xử lý thế nào?' },
    { label: '🤝 Làm hòa mâu thuẫn', prompt: 'Làm thế nào để nói lời xin lỗi và làm hòa với bạn cùng bàn một cách chân thành nhất?' },
  ];

  return (
    <div id="view-ai" className="max-w-4xl mx-auto space-y-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[650px]">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-800 text-white flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-xl shadow-xs">
              🤖
            </div>
            <div>
              <h3 className="font-black text-sm flex items-center gap-1.5">
                Trợ Lý AI An Toàn Học Đường (Gemini 3.7 Flash)
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              </h3>
              <p className="text-[11px] text-indigo-100 font-medium">
                Tư vấn tâm lý, kiềm chế cảm xúc, phòng chống bạo lực học đường 24/7
              </p>
            </div>
          </div>

          <button
            id="btn-clear-chat"
            onClick={handleClearChat}
            title="Làm mới cuộc trò chuyện"
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition flex items-center gap-1 text-xs font-bold"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Làm mới</span>
          </button>
        </div>

        {/* AI Messages Container */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/60 custom-scrollbar">
          {messages.map((msg) => {
            const isAI = msg.role === 'ai';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isAI ? 'justify-start max-w-[90%]' : 'justify-end max-w-[85%] ml-auto'}`}
              >
                {isAI && (
                  <div className="w-8 h-8 rounded-xl bg-purple-700 text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-xs mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`p-4 rounded-2xl text-xs leading-relaxed transition shadow-2xs space-y-2 ${
                    isAI
                      ? 'bg-white border border-slate-200/80 text-slate-800'
                      : 'bg-purple-700 text-white font-medium shadow-purple-600/10'
                  }`}
                >
                  <div className="whitespace-pre-line font-normal">
                    {msg.text}
                  </div>

                  <div
                    className={`flex items-center justify-between gap-2 pt-1 border-t text-[10px] ${
                      isAI ? 'border-slate-100 text-slate-400' : 'border-white/20 text-purple-200'
                    }`}
                  >
                    <span>{msg.timestamp}</span>

                    {isAI && (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleSpeechSynthesis(msg.id, msg.text)}
                          title={speakingMsgId === msg.id ? 'Dừng đọc' : 'Đọc câu trả lời'}
                          className={`p-1 rounded-md transition ${
                            speakingMsgId === msg.id
                              ? 'bg-purple-100 text-purple-700 animate-pulse'
                              : 'hover:bg-slate-100 text-slate-500'
                          }`}
                        >
                          {speakingMsgId === msg.id ? (
                            <VolumeX className="w-3.5 h-3.5" />
                          ) : (
                            <Volume2 className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <button
                          onClick={() => handleCopyText(msg.id, msg.text)}
                          title="Sao chép"
                          className="p-1 rounded-md hover:bg-slate-100 text-slate-500 transition"
                        >
                          {copiedMsgId === msg.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {!isAI && (
                  <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-xs mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex gap-3 max-w-[85%]">
              <div className="w-8 h-8 rounded-xl bg-purple-700 text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-xs">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-500 font-medium leading-relaxed shadow-2xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-600 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-purple-600 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-purple-600 animate-bounce [animation-delay:0.4s]"></span>
                <span>Trợ lý AI đang suy nghĩ và xây dựng lời tư vấn...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Preset Suggestion Pills */}
        <div className="px-4 py-2 bg-white border-t border-slate-100 flex items-center gap-2 overflow-x-auto custom-scrollbar shrink-0">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-purple-600" /> Gợi ý:
          </span>
          {presetPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(p.prompt)}
              className="px-3 py-1 rounded-full bg-slate-100 hover:bg-purple-50 hover:text-purple-700 text-slate-700 text-[11px] font-semibold transition shrink-0 border border-slate-200/60"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Chat Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 bg-white border-t border-slate-200 flex gap-2 shrink-0"
        >
          <input
            id="ai-input"
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="Nhập câu hỏi hoặc tâm sự của em tại đây (ví dụ: bị bạn chọc, tức giận...)"
            disabled={isLoading}
            className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-white font-medium transition"
          />
          <button
            id="btn-send-ai"
            type="submit"
            disabled={isLoading || !inputPrompt.trim()}
            className="px-5 py-2.5 bg-purple-700 hover:bg-purple-800 disabled:opacity-50 text-white font-bold text-xs rounded-2xl transition shadow-md shadow-purple-600/20 shrink-0 flex items-center gap-1.5"
          >
            <Send className="w-4 h-4" />
            <span>Gửi</span>
          </button>
        </form>
      </div>

      {/* Safety Notice Note */}
      <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100 flex items-start gap-2.5 text-xs text-purple-900">
        <Info className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Lưu ý bảo vệ:</strong> Cuộc trò chuyện với AI chỉ mang tính định hướng, tư vấn và hỗ trợ cảm xúc. Trong trường hợp nguy hiểm khẩn cấp hoặc bạo lực nghiêm trọng, em hãy bấm ngay nút <strong>SOS Khẩn Cấp</strong> hoặc báo cáo trực tiếp với Thầy Cô, Ban Giám Hiệu để được can thiệp ngay!
        </p>
      </div>
    </div>
  );
};
