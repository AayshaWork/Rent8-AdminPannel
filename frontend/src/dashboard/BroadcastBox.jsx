import { useState } from "react";

const BroadcastBox = () => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    // future me API call yahin hoga
    console.log("Broadcast:", message);

    setMessage("");
    alert("Message sent 🚀");
  };

  return (
    <div className="p-6 bg-white border shadow-sm rounded-xl">
      
      {/* Header */}
      <h2 className="mb-4 text-lg font-semibold">
        Quick Broadcast
      </h2>

      {/* Textarea */}
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type message to send to all users..."
        className="w-full p-3 text-sm border rounded-lg resize-none h-28 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {/* Button */}
      <button
        onClick={handleSend}
        className="w-full py-2 mt-4 text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700"
      >
        Send Broadcast
      </button>

    </div>
  );
};

export default BroadcastBox;