import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      <section className="py-16 lg:py-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight">
            Meet <span className="text-blue-600">Carys</span>, your 24/7 AI helpline.
          </h1>
          <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-300">
            Chat in real-time, speak and listen with a British accent, upload files & images, and pick up conversations where you left off.
            Simple £9.99/month subscription. Built for UK users with GDPR-first privacy.
          </p>
          <div className="mt-8 flex gap-3">
            <Link href="/chat" className="px-5 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700">
              Start chatting
            </Link>
            <Link href="/subscribe" className="px-5 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 font-medium">
              Try the demo
            </Link>
          </div>
        </div>
      </section>

      <section className="py-10 grid md:grid-cols-3 gap-6">
        {[
          {title: "Multiple chats", desc: "Keep separate threads for different topics—just like ChatGPT."},
          {title: "Voice in British accent", desc: "Carys speaks clearly using UK English. Toggle voice in Settings."},
          {title: "Files & images", desc: "Upload images or files, ask questions, and get contextual answers."},
          {title: "Private by default", desc: "Data controls you can switch off. Export or delete anytime."},
          {title: "Mobile-first UI", desc: "Clean, fast and accessible interface with light/dark mode."},
          {title: "£9.99/month", desc: "Simple price. Cancel any time. Stripe checkout (demo)."},
        ].map((f,i)=>(
          <div key={i} className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <h3 className="font-semibold">{f.title}</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">{f.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
