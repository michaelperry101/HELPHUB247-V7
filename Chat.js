'use client';
import { useEffect, useRef, useState } from "react";

const pickBritishVoice = () => {
  const voices = window.speechSynthesis?.getVoices?.() || [];
  return voices.find(v => v.lang === 'en-GB') || voices.find(v => v.name?.toLowerCase().includes("uk")) || voices[0];
};

export default function Chat(){
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [files, setFiles] = useState([]);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const boxRef = useRef(null);
  const [chatId, setChatId] = useState(null);

  useEffect(()=>{
    const id = localStorage.getItem("hh_activeChat") || String(Date.now());
    setChatId(id);
    if (!localStorage.getItem("hh_activeChat")) {
      localStorage.setItem("hh_activeChat", id);
      const list = JSON.parse(localStorage.getItem("hh_chats")||"[]");
      const item = { id, title: "New Chat", createdAt: new Date().toISOString() };
      localStorage.setItem("hh_chats", JSON.stringify([item, ...list]));
    }
    const saved = JSON.parse(localStorage.getItem("chat:"+id) || "[]");
    setMessages(saved);
    setVoiceEnabled(localStorage.getItem("hh_voice") !== "false");
  },[]);

  useEffect(()=>{
    boxRef.current?.scrollTo({top: 1e9, behavior: 'smooth'});
  }, [messages, busy]);

  const speak = (text) => {
    if (!voiceEnabled) return;
    const u = new SpeechSynthesisUtterance(text);
    const v = pickBritishVoice();
    if (v) u.voice = v;
    u.lang = 'en-GB';
    window.speechSynthesis.speak(u);
  };

  const handleFiles = (e) => {
    const arr = Array.from(e.target.files || []);
    setFiles(arr);
  };

  const saveMessages = (next) => {
    if (!chatId) return;
    localStorage.setItem("chat:"+chatId, JSON.stringify(next));
    // set title by first user msg
    const list = JSON.parse(localStorage.getItem("hh_chats")||"[]");
    const idx = list.findIndex(c=>c.id===chatId);
    if (idx>-1) {
      const firstUser = next.find(m=>m.role==='user');
      if (firstUser) list[idx].title = (firstUser.content || "New Chat").slice(0,40);
      localStorage.setItem("hh_chats", JSON.stringify(list));
    }
  };

  const send = async () => {
    if (!input.trim() && files.length===0) return;
    const newUser = { role: "user", content: input, files: files.map(f=>({name:f.name, type:f.type, size:f.size})) };
    const next = [...messages, newUser];
    setMessages(next);
    saveMessages(next);
    setInput("");
    setFiles([]);
    setBusy(true);

    try {
      const body = new FormData();
      body.append("messages", JSON.stringify(next));
      files.forEach(f=> body.append("files", f));
      const res = await fetch("/api/chat", { method: "POST", body });
      const data = await res.json();
      const reply = data.reply || "Carys is thinking…";
      const next2 = [...next, { role: "assistant", content: reply }];
      setMessages(next2);
      saveMessages(next2);
      speak(reply);
      if (navigator.vibrate && localStorage.getItem("hh_haptics") !== "false") navigator.vibrate(8);
    } catch(e) {
      const next2 = [...next, { role: "assistant", content: "Sorry—my connection hiccuped. Try again." }];
      setMessages(next2);
      saveMessages(next2);
    } finally {
      setBusy(false);
    }
  };

  const onKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const startSTT = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { alert("Speech recognition not supported on this device."); return; }
    const rec = new SR();
    rec.lang = "en-GB";
    rec.interimResults = false;
    rec.onresult = (e)=> setInput(prev => (prev? prev+" " : "") + e.results[0][0].transcript);
    rec.start();
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div ref={boxRef} className="flex-1 overflow-y-auto p-4 sm:p-6">
        {messages.length===0 && (
          <div className="max-w-2xl mx-auto text-center text-zinc-500">
            <p>Start a conversation with Carys. Ask anything.</p>
          </div>
        )}
        <div className="max-w-2xl mx-auto space-y-4">
          {messages.map((m, i)=>(
            <div key={i} className={`p-3 rounded-xl border ${m.role==='user'?'border-blue-200 bg-blue-50 dark:bg-zinc-800/40 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100':'border-zinc-200 bg-white dark:bg-zinc-900 dark:border-zinc-800'}`}>
              <div className="text-xs mb-1 opacity-60">{m.role==='user'?'You':'Carys'}</div>
              <div className="whitespace-pre-wrap">{m.content}</div>
              {m.files && m.files.length>0 && (
                <div className="mt-2 text-xs opacity-70">{m.files.length} attachment(s)</div>
              )}
            </div>
          ))}
          {busy && <div className="text-sm text-zinc-500">Carys is thinking…</div>}
        </div>
      </div>
      <div className="border-t border-zinc-200 dark:border-zinc-800 p-3">
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-2">
            <input type="file" multiple onChange={handleFiles} className="hidden" id="fileU"/>
            <label htmlFor="fileU" className="px-3 py-2 rounded border cursor-pointer">Upload</label>
            <button onClick={startSTT} className="px-3 py-2 rounded border">🎙️</button>
            <textarea
              value={input}
              onChange={e=>setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder="Message Carys…"
              className="flex-1 border rounded p-2 min-h-[46px] max-h-40"
            />
            <button onClick={send} className="px-4 rounded bg-blue-600 text-white">Send</button>
          </div>
          {files.length>0 && <div className="text-xs mt-2 opacity-70">{files.length} file(s) ready</div>}
        </div>
      </div>
    </div>
  );
}
