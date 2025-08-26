'use client';
import { useEffect, useState } from "react";

export default function Settings() {
  const [theme, setTheme] = useState("light");
  const [textSize, setTextSize] = useState("base");
  const [haptics, setHaptics] = useState(true);
  const [voice, setVoice] = useState(true);
  const [personalisation, setPersonalisation] = useState(true);
  const [dataCollection, setDataCollection] = useState(false);

  useEffect(()=>{
    const savedTheme = localStorage.getItem("hh_theme") || "light";
    const savedText = localStorage.getItem("hh_text") || "base";
    setTheme(savedTheme);
    setTextSize(savedText);
    setHaptics(localStorage.getItem("hh_haptics") !== "false");
    setVoice(localStorage.getItem("hh_voice") !== "false");
    setPersonalisation(localStorage.getItem("hh_personalisation") !== "false");
    setDataCollection(localStorage.getItem("hh_data") === "true");

    document.documentElement.classList.toggle("dark", savedTheme === "dark");
    document.documentElement.style.fontSize = savedText === "lg" ? "18px" : savedText === "xl" ? "20px" : "16px";
  },[]);

  const save = () => {
    localStorage.setItem("hh_theme", theme);
    localStorage.setItem("hh_text", textSize);
    localStorage.setItem("hh_haptics", String(haptics));
    localStorage.setItem("hh_voice", String(voice));
    localStorage.setItem("hh_personalisation", String(personalisation));
    localStorage.setItem("hh_data", String(dataCollection));
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.fontSize = textSize === "lg" ? "18px" : textSize === "xl" ? "20px" : "16px";
    if (haptics && navigator.vibrate) navigator.vibrate(10);
    alert("Settings saved");
  };

  const clearLocal = () => {
    if (confirm("Delete all local chats and settings?")) {
      Object.keys(localStorage).forEach(k=>{ if (k.startsWith("hh_") || k.startsWith("chat:")) localStorage.removeItem(k); });
      alert("Local data cleared.");
    }
  };

  const exportData = () => {
    const data = {};
    for (const k of Object.keys(localStorage)) data[k] = localStorage.getItem(k);
    const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'helphub247-export.json'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container py-10 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="grid gap-6">
        <section className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800">
          <h2 className="font-semibold mb-3">Appearance</h2>
          <div className="flex items-center gap-4">
            <label>Theme</label>
            <select value={theme} onChange={e=>setTheme(e.target.value)} className="border rounded p-2">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
            <label className="ml-6">Text size</label>
            <select value={textSize} onChange={e=>setTextSize(e.target.value)} className="border rounded p-2">
              <option value="base">Base</option>
              <option value="lg">Large</option>
              <option value="xl">Extra Large</option>
            </select>
          </div>
        </section>

        <section className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800">
          <h2 className="font-semibold mb-3">Voice & Haptics</h2>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={voice} onChange={e=>setVoice(e.target.checked)} />
              Speak Carys responses (British Voice)
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={haptics} onChange={e=>setHaptics(e.target.checked)} />
              Haptic feedback
            </label>
          </div>
        </section>

        <section className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800">
          <h2 className="font-semibold mb-3">Privacy & Personalisation</h2>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={personalisation} onChange={e=>setPersonalisation(e.target.checked)} />
              Personalise Carys with your preferences
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={dataCollection} onChange={e=>setDataCollection(e.target.checked)} />
              Allow minimal usage analytics
            </label>
          </div>
        </section>

        <section className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800">
          <h2 className="font-semibold mb-3">Data controls</h2>
          <div className="flex gap-3">
            <button onClick={exportData} className="px-4 py-2 rounded bg-zinc-200 dark:bg-zinc-700">Export data</button>
            <button onClick={clearLocal} className="px-4 py-2 rounded bg-rose-600 text-white">Delete all</button>
            <button onClick={save} className="ml-auto px-4 py-2 rounded bg-blue-600 text-white">Save settings</button>
          </div>
        </section>
      </div>
    </div>
  );
}
