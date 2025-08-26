export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  // Parse FormData
  try {
    const buffers = [];
    for await (const chunk of req) buffers.push(chunk);
    const raw = Buffer.concat(buffers);
    const contentType = req.headers["content-type"] || "";
    if (!contentType.includes("multipart/form-data")) {
      return res.status(400).json({ error: "Expected multipart/form-data" });
    }
    // Very light parser: rely on client to send messages JSON first; for demo, we ignore files
  } catch {}

  let messages = [];
  try {
    // Fallback: allow JSON
    if (req.headers["content-type"]?.includes("application/json")) {
      const body = JSON.parse(Buffer.from(await streamToBuffer(req)).toString());
      messages = body.messages || [];
    }
  } catch {}

  // Try to read messages from query as well (safety)
  if (!messages.length && req.query.messages) {
    try { messages = JSON.parse(req.query.messages); } catch {}
  }

  // If no API key, return demo content
  const key = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  if (!key) {
    const last = messages[messages.length-1];
    const prompt = last?.content || "Hello";
    return res.status(200).json({ reply: `Demo reply from Carys to: "${prompt}"` });
  }

  // Real call (stream disabled for simplicity)
  try {
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${key}`
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: "You are Carys, a friendly UK-based assistant with a British tone. Be concise, helpful and warm." },
          ...(messages || []).map(m=>({role:m.role, content: m.content}))
        ]
      })
    });
    const data = await r.json();
    const reply = data?.choices?.[0]?.message?.content || "Sorry—I couldn't think of anything to say.";
    return res.status(200).json({ reply });
  } catch (e) {
    return res.status(200).json({ reply: "Temporary issue reaching the AI. Please try again." });
  }
}

async function streamToBuffer(stream){
  const chunks=[];
  for await (const chunk of stream){ chunks.push(chunk); }
  return Buffer.concat(chunks);
}
