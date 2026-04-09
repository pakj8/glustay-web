import { useState, useRef, useEffect } from "react";
import { useGluChat } from "../../graphql/ai/datasource";

const QUICK_REPLIES = [
  { label: "Plan my trip 🗺️", value: "Plan my trip" },
  { label: "Hotel events today", value: "What events are happening today?" },
  { label: "WiFi password", value: "What is the WiFi password?" },
  { label: "Best local food", value: "Recommend the best local restaurants" },
  { label: "Checkout info", value: "Tell me about my checkout" },
];

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <div className="w-7 h-7 rounded-full bg-[#F5C200] flex items-center justify-center text-sm flex-shrink-0">
        ✈️
      </div>
      <div className="bg-gray-100 border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3">
        <div className="flex gap-1 items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:0ms]" />
          <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:200ms]" />
          <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:400ms]" />
        </div>
      </div>
    </div>
  );
}

function Message({ role, content, initials }) {
  return (
    <div
      className={`flex items-end gap-2 ${
        role === "user" ? "flex-row-reverse" : ""
      }`}
    >
      {role === "bot" ? (
        <div className="w-7 h-7 rounded-full bg-[#F5C200] flex items-center justify-center text-sm flex-shrink-0">
          ✈️
        </div>
      ) : (
        <div className="w-7 h-7 rounded-full bg-[#1a1a1a] flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
          {initials}
        </div>
      )}
      <div
        className={`max-w-[82%] px-3 py-2 text-sm leading-relaxed rounded-2xl font-poppins ${
          role === "bot"
            ? "bg-gray-100 border border-gray-200 text-[#1a1a1a] rounded-bl-sm"
            : "bg-[#F5C200] text-[#1a1a1a] font-medium rounded-br-sm"
        }`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}

export default function GluChat({
  guestName = "Guest",
  hotelName = "Hotel",
  reservationId = "N/A",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [history, setHistory] = useState([]);
  const [hasSentFirst, setHasSentFirst] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const { sendMessage } = useGluChat();

  const initials = guestName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const formatResponse = (text) =>
    text
      .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
      .replace(/\*(.*?)\*/g, "<i>$1</i>")
      .replace(
        /^(Day \d+[–\-]?\d*:?)\s*/gm,
        '<b class="text-[#b08800]">$1</b> '
      )
      .replace(/\n•\s/g, "<br>• ")
      .replace(/\n-\s/g, "<br>• ")
      .replace(/\n/g, "<br>");

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && !hasSentFirst) {
      setHasSentFirst(true);
      setMessages([
        {
          role: "bot",
          content: `Hey <b>${
            guestName.split(" ")[0]
          }</b>! 👋 I'm <b>Glu AI</b> — your concierge and trip planner.<br><br>I know your stay at <b>${hotelName}</b> and can help with anything. What can I help with?`,
        },
      ]);
    }
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [guestName, hasSentFirst, hotelName, isOpen]);

  const handleSendMessage = async (text) => {
    if (!text.trim() || isTyping) return;

    const userText = text.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userText }]);
    setIsTyping(true);

    const newHistory = [...history, { role: "user", content: userText }];

    try {
      const result = await sendMessage({
        messages: newHistory,
        guestName,
        hotelName,
        reservationId,
      });

      const reply = result?.data?.gluChat?.reply;

      if (!reply) throw new Error("No reply");

      const updatedHistory = [
        ...newHistory,
        { role: "assistant", content: reply },
      ];
      setHistory(updatedHistory);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: formatResponse(reply) },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: `<span class="text-red-500">Something went wrong. Please try again.</span>`,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full border-none cursor-pointer flex items-center justify-center text-xl transition-all duration-200 shadow-lg hover:scale-105 ${
          isOpen ? "bg-[#1a1a1a]" : "bg-[#F5C200]"
        }`}
      >
        <span>{isOpen ? "✕" : "✈️"}</span>
        {!isOpen && (
          <span className="absolute w-14 h-14 rounded-full bg-[#F5C200] opacity-40 animate-ping" />
        )}
      </button>

      {/* Chat Panel */}
      <div
        className={`fixed bottom-24 right-6 z-40 w-[370px] max-w-[calc(100vw-32px)] h-[580px] max-h-[calc(100vh-120px)] bg-white border border-gray-200 rounded-2xl flex flex-col overflow-hidden shadow-2xl transition-all duration-300 ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-90 translate-y-4 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-[#1a1a1a] px-4 py-3 flex items-center gap-3 rounded-t-2xl flex-shrink-0">
          <div className="w-9 h-9 rounded-full bg-[#F5C200] flex items-center justify-center text-base flex-shrink-0">
            ✈️
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-white font-poppins">
              Glu Travel AI
            </p>
            <p className="text-[10px] text-gray-400 font-poppins">
              Concierge · Trip Planner · Claude-powered
            </p>
          </div>
          <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_0_2px_rgba(74,222,128,0.25)]" />
        </div>

        {/* Quick Reply Pills */}
        {messages.length <= 1 && (
          <div className="flex gap-1 p-2 flex-wrap bg-gray-50 border-b border-gray-100 flex-shrink-0">
            {QUICK_REPLIES.map((q) => (
              <button
                key={q.value}
                onClick={() => handleSendMessage(q.value)}
                className="border border-[#F5C200] bg-[#fffbea] text-[#6b5200] rounded-full px-3 py-1 text-[11px] font-medium cursor-pointer whitespace-nowrap hover:bg-[#F5C200] hover:text-[#1a1a1a] transition-all font-poppins"
              >
                {q.label}
              </button>
            ))}
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3">
          {messages.map((msg, i) => (
            <Message
              key={i}
              role={msg.role}
              content={msg.content}
              initials={initials}
            />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 px-3 py-2.5 border-t border-gray-100 bg-white flex-shrink-0">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(input);
              }
            }}
            placeholder="Ask about your stay or plan a trip..."
            disabled={isTyping}
            className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm bg-gray-50 text-[#1a1a1a] outline-none font-poppins focus:border-[#F5C200] focus:bg-white transition-all placeholder:text-gray-400 disabled:opacity-60"
          />
          <button
            onClick={() => handleSendMessage(input)}
            disabled={isTyping || !input.trim()}
            className="w-9 h-9 rounded-full bg-[#F5C200] border-none cursor-pointer flex items-center justify-center text-sm flex-shrink-0 hover:scale-105 transition-all disabled:opacity-40 disabled:cursor-default"
          >
            ➤
          </button>
        </div>
      </div>
    </>
  );
}
