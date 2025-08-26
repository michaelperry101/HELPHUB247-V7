'use client';
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Sidebar(){
  const [open, setOpen] = useState(false);
  const [chats, setChats] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(()=>{
    const load = () => {
      const list = JSON.parse(localStorage.getItem("hh_chats")||"[]");
      setChats(list);
      setActive(localStorage.getItem("hh_activeChat"));
    };
    load();
    const onToggle = () => setOpen(o=>!o);
    document.addEventListener('hh:toggleSidebar', onToggle);
    return ()=> document.removeEventListener('hh:toggleSidebar', onToggle);
  },[]);

  const newChat = () => {
    const id = String(Date.now());
    const item = { id, title: "New Chat", createdAt: new Date().toISOString() };
    const list = [item, ...chats];
    setChats(list);
    localStorage.setItem("hh_chats", JSON.stringify(list));
    localStorage.setItem("chat:"+id, JSON.stringify([]));
    localStorage.setItem("hh_activeChat", id);
    if (navigator.vibrate && localStorage.getItem("hh_haptics") !== "false") navigator.vibrate(10);
    window.location.href="/chat";
  };

  const selectChat = (id) => {
    localStorage.setItem("hh_activeChat", id);
    setActive(id);
    window.location.href="/chat";
  };

  const delChat = (id) => {
    if (!confirm("Delete this chat?")) return;
    const list = chats.filter(c=>c.id!==id);
    setChats(list);
    localStorage.setItem("hh_chats", JSON.stringify(list));
    localStorage.removeItem("chat:"+id);
    if (id===active) localStorage.removeItem("hh_activeChat");
  };

  return (
    <aside className={`fixed md:static z-40 inset-y-14 left-0 w-72 bg-zinc-50 dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 transform ${open?'translate-x-0':'-translate-x-full'} md:translate-x-0 transition-transform`}>
      <div className="h-full flex flex-col">
        <div className="p-3 border-b border-zinc-200 dark:border-zinc-800 flex gap-2">
          <button onClick={newChat} className="flex-1 py-2 rounded bg-blue-600 text-white">New chat</button>
          <Link href="/settings" className="px-3 py-2 rounded border">Settings</Link>
        </div>
        <div className="flex-1 overflow-y-auto">
          {chats.length===0 ? (
            <div className="p-4 text-sm text-zinc-500">No chats yet.</div>
          ) : (
            <ul className="p-2">
              {chats.map(c=>(
                <li key={c.id} className={`group flex items-center justify-between px-3 py-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-900 ${active===c.id?'bg-zinc-100 dark:bg-zinc-900':''}`}>
                  <button className="text-left flex-1 truncate" onClick={()=>selectChat(c.id)}>{c.title}</button>
                  <button className="opacity-0 group-hover:opacity-100 text-rose-600 ml-2" onClick={()=>delChat(c.id)}>✕</button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="p-3 text-xs text-zinc-500 border-t border-zinc-200 dark:border-zinc-800">
          © {new Date().getFullYear()} Helphub247
        </div>
      </div>
    </aside>
  );
}
