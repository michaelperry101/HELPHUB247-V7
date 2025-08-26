// app/subscribe/page.js
"use client";
import { useState } from "react";

export default function SubscribePage() {
  const [status, setStatus] = useState(null);

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6">
      <h1 className="text-3xl font-bold mb-4">Subscribe to HelpHub247</h1>
      <p className="mb-6 text-gray-500 text-center max-w-lg">
        Unlock premium AI assistance with Carys — unlimited chats, image & file uploads, and more.
      </p>
      <button
        onClick={() => setStatus("Demo only: Replace with live Stripe/PayPal")}
        className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        Subscribe Now
      </button>
      {status && <p className="mt-4 text-sm text-gray-400">{status}</p>}
    </div>
  );
      }
