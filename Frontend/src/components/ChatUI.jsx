import { useState } from "react";
import { motion } from "framer-motion";
import { askAI } from "../api/aiApi";
import ErrorMessage from "./ErrorMessage";

function ChatUI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setError(null);
    setLoading(true);

    setMessages((prev) => [...prev, { type: "user", text: input }]);
    setInput("");

    try {
      const answer = await askAI(input);

      if (!answer) {
        throw new Error("NO_CONTEXT");
      }

      setMessages((prev) => [...prev, { type: "ai", text: answer }]);
    } catch (err) {
      setError(err.message);
      setMessages((prev) => [
        ...prev,
        { type: "ai", text: "Unable to answer this question." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-box">
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            className={`chat-message ${msg.type}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {msg.text}
          </motion.div>
        ))}
      </div>

      <ErrorMessage message={error} />

      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI..."
          disabled={loading}
        />
        <button onClick={sendMessage} disabled={loading}>
          {loading ? "Thinking..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default ChatUI;
