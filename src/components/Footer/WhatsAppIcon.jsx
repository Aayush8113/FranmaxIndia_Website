// import React from "react";
// import "../design/WhatsAppIcon.css";
// import { FaWhatsapp } from "react-icons/fa";

// const WhatsAppIcon = () => {
//   return (
//     <a
//       href="https://wa.me/918140038080"
//       className="whatsapp-icon"
//       target="_blank"
//       rel="noopener noreferrer"
//       aria-label="Chat on WhatsApp"
//       role="button"
//       title="Chat on WhatsApp"
//     >
//       <FaWhatsapp className="whatsapp-icon-svg" />
//     </a>
//   );
// };

// export default WhatsAppIcon;








import React, { useState, useEffect, useRef } from "react";
import { FaWhatsapp } from "react-icons/fa";
import "../design/WhatsAppIcon.css";
import logo from "../../assets/logo/Franmaxindia logo@4x.png";

const WhatsAppChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [conversationMemory, setConversationMemory] = useState([]);
  const [visibleSuggestions, setVisibleSuggestions] = useState([]);
  const chatBodyRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);
  const startChat = () => window.open("https://wa.me/918140038080", "_blank");

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, typing, visibleSuggestions]);

  useEffect(() => {
    if (!isOpen || messages.length > 0) return;
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages([
        {
          id: Date.now(),
          type: "incoming",
          text: "👋 Hi! Welcome to Franmax India. How can we assist you today?",
          time: new Date(),
        },
      ]);
      showSuggestions();
    }, 1200);
  }, [isOpen]);

  const suggestedReplies = [
    "Franchise options",
    "Investment details",
    "Available sectors",
    "Contact manager",
    "Company details",
  ];

  const showSuggestions = () => {
    setVisibleSuggestions([]);
    suggestedReplies.forEach((reply, index) => {
      setTimeout(() => {
        setVisibleSuggestions((prev) => [...prev, reply]);
      }, index * 300);
    });
  };

  const getBotResponse = (userText) => {
    const text = userText.toLowerCase();
    let reply = "";

    if (conversationMemory.length >= 3) {
      reply = "For detailed guidance, please chat with us directly.";
    } else if (text.includes("franchise")) {
      reply =
        "Franmax India offers top franchise opportunities across India, with complete support including training, operations, and marketing.";
    } else if (text.includes("sector") || text.includes("industry")) {
      reply =
        "We have franchises in food, retail, and service sectors, carefully selected for growth potential.";
    } else if (text.includes("investment") || text.includes("cost") || text.includes("capital")) {
      reply =
        "Investment ranges vary depending on the franchise type. We provide guidance to choose the best option within your budget.";
    } else if (text.includes("contact") || text.includes("manager") || text.includes("reach")) {
      reply =
        "You can contact our franchise manager directly for detailed guidance. Would you like me to share the contact details?";
    } else if (text.includes("company") || text.includes("details") || text.includes("brief") || text.includes("about")) {
      reply =
        "Franmax India is a leading franchise consultancy helping entrepreneurs grow businesses nationwide. We provide guidance, market analysis, and end-to-end franchise solutions.";
    } else {
      reply =
        "Thanks for your message! Could you please clarify so I can assist you better?";
    }

    setConversationMemory((prev) => [...prev, { userText, reply }]);
    return reply;
  };

  const handleUserReply = (text) => {
    const userMsg = { id: Date.now(), type: "outgoing", text, time: new Date() };
    setMessages((prev) => [...prev, userMsg]);

    setTyping(true);
    const delay = 1200 + Math.random() * 2000;

    setTimeout(() => {
      setTyping(false);
      const botMsg = {
        id: Date.now() + 1,
        type: "incoming",
        text: getBotResponse(text),
        time: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      showSuggestions();
    }, delay);
  };

  const getTimeString = (date) => {
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = date.getHours() >= 12 ? "PM" : "AM";
    return `${hours}:${minutes} ${ampm}`;
  };

  return (
    <div className="chat-btn">
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-avatar">
              <img src={logo} alt="Franmax India" />
            </div>
            <div className="chat-info">
              <div className="chat-name">Franmax India</div>
              <div className="chat-status">
                <span className="online-dot"></span> online
              </div>
            </div>
            <div onClick={toggleChat} className="chat-close-btn">✕</div>
          </div>

          <div className="chat-body" ref={chatBodyRef}>
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-message ${msg.type}`}>
                <div className={`chat-bubble ${msg.type === "incoming" ? "incoming-bubble" : "outgoing-bubble"}`}>
                  {msg.text}
                </div>
                <div className="chat-time">{getTimeString(msg.time)}</div>
              </div>
            ))}

            {typing && (
              <div className="chat-message incoming">
                <div className="chat-bubble incoming-bubble typing-indicator">
                  <span></span><span></span><span></span>
                </div>
                <div className="chat-time">{getTimeString(new Date())}</div>
              </div>
            )}
          </div>

          <div className="chat-footer">
            <div className="chat-input-container">
              <input
                type="text"
                placeholder="Type your message..."
                className="chat-input"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.target.value.trim() !== "") {
                    handleUserReply(e.target.value);
                    e.target.value = "";
                  }
                }}
              />
              <button className="chat-btn-start" onClick={startChat}>
                <FaWhatsapp style={{ marginRight: "6px" }} /> WhatsApp
              </button>
            </div>

            <div className="suggestions-container">
              {visibleSuggestions.map((reply, i) => (
                <div key={i} className="suggestion-bubble" onClick={() => handleUserReply(reply)}>
                  {reply}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {!isOpen && (
        <div className="chat-btn-icon" onClick={toggleChat}>
          <FaWhatsapp className="chat-icon" />
        </div>
      )}
    </div>
  );
};

export default WhatsAppChat;
