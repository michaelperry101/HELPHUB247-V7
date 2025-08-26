export default async function handler(req, res){
  if (req.method !== "POST") return res.status(405).end();
  const { prompt } = req.body || {};
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    // Placeholder 1x1 PNG
    const png = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=";
    return res.status(200).json({ imageBase64: png });
  }
  try {
    const r = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${key}` },
      body: JSON.stringify({ prompt, size: "1024x1024" })
    });
    const data = await r.json();
    const b64 = data?.data?.[0]?.b64_json;
    return res.status(200).json({ imageBase64: b64 });
  } catch (e) {
    return res.status(200).json({ error: "Image generation failed" });
  }
}
