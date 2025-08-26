export default async function handler(req, res){
  if (req.method !== "POST") return res.status(405).end();
  const { text } = req.body || {};
  const key = process.env.OPENAI_API_KEY;
  if (!key) return res.status(501).json({ error: "TTS not configured. Use browser voice in Settings." });
  try {
    // Placeholder: doing client-side speechSynthesis; if you swap to OpenAI TTS, call the appropriate endpoint here.
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(200).json({ error: "Audio failed" });
  }
}
