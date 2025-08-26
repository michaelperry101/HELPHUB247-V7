export default function Subscribe() {
  return (
    <div className="container py-10">
      <div className="max-w-xl mx-auto border rounded-xl p-6 border-zinc-200 dark:border-zinc-800">
        <h1 className="text-2xl font-bold">Subscribe</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">Helphub247 — £9.99/month, cancel anytime.</p>
        <ul className="list-disc ml-6 mt-4 text-sm">
          <li>Unlimited chats with Carys</li>
          <li>Voice (British accent), file & image support</li>
          <li>Priority support</li>
        </ul>
        <button
          onClick={()=>alert("Demo only. Connect Stripe to go live.")}
          className="mt-6 w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700">
          Subscribe (Demo)
        </button>
        <p className="mt-3 text-xs text-zinc-500">When you're ready, replace this button with Stripe Checkout.</p>
      </div>
    </div>
  );
}