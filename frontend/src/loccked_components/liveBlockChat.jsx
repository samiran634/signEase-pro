import React from "react";
import { useMutation, useStorage, useSelf, useOthers } from "@liveblocks/react";

export default function LiveDiscussionPanel({ contractId, pdfUrl }) {
  const messages = useStorage((root) => {
    const list = root.contractDiscussions?.get(contractId);
    return Array.isArray(list) ? list : [];
  });

  const others = useOthers();
  const self = useSelf();

  const addMessage = useMutation(
    ({ storage }, message) => {
      let discussions = storage.get("contractDiscussions");
      if (!discussions) {
        discussions = new Map();
        storage.set("contractDiscussions", discussions);
      }
      const existing = discussions.get(contractId);
      if (!existing) {
        discussions.set(contractId, []);
      }
      discussions.get(contractId).push({
        id: Date.now(),
        user: self?.info?.name || "Unknown",
        message,
        timestamp: new Date().toISOString(),
      });
    },
    [contractId]
  );

  const [input, setInput] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  const shareLink = `${window.location.origin}/read?url=${encodeURIComponent(pdfUrl)}&roomId=contract-${contractId}&shear=${true}`;

  const handleSend = () => {
    if (input.trim() !== "") {
      addMessage(input.trim());
      setInput("");
    }
  };

  const copyToClipboard = () => {
    try {
      navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Clipboard copy failed:", err);
      alert("Failed to copy the link.");
    }
  };

  if (!Array.isArray(messages)) {
    return <div className="text-center text-sm text-gray-400">Loading discussion...</div>;
  }

  return (
    <div className="flex flex-col h-full">
      {/* Share link box */}
      <div className="mb-2 flex items-center justify-between bg-blue-50 border border-blue-200 px-4 py-2 rounded text-sm">
        <span className="truncate text-blue-800 font-medium">{shareLink}</span>
        <button
          onClick={copyToClipboard}
          className="ml-4 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {copied ? "Copied!" : "Copy Link"}
        </button>
      </div>

      {/* Connected users */}
      <div className="text-xs text-green-700 mb-2">
        {others.length > 0
          ? `${others.length} other participant${others.length > 1 ? "s" : ""} online`
          : "You are the only one here right now"}
      </div>

      {/* Message list */}
      <div className="flex-1 overflow-y-auto space-y-2 p-2 bg-white border rounded shadow-inner">
        {messages.map((msg) => (
          <div key={msg.id} className="bg-amber-100 p-2 rounded">
            <div className="text-xs text-gray-500">{msg.user} — {new Date(msg.timestamp).toLocaleTimeString()}</div>
            <div className="text-sm text-gray-800">{msg.message}</div>
          </div>
        ))}
      </div>

      {/* Input box */}
      <div className="mt-2 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write a message..."
          className="flex-1 border rounded px-3 py-2 text-sm"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
