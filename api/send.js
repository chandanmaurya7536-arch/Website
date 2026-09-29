export const config = {
  api: { bodyParser: false }
};

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const body = Buffer.concat(chunks);

  const boundary = req.headers["content-type"].split("boundary=")[1];
  const parts = body.toString("latin1").split("--" + boundary);

  const getField = (name) => {
    const part = parts.find(p => p.includes(`name="${name}"`));
    return part ? part.split("\r\n\r\n")[1].split("\r\n")[0] : "";
  };

  const photoPart = parts.find(p => p.includes('name="photo"'));
  const start = photoPart.indexOf("\r\n\r\n") + 4;
  const end = photoPart.lastIndexOf("\r\n");
  const photoBuffer = Buffer.from(photoPart.slice(start, end), "latin1");

  const form = new FormData();
  form.append("chat_id", process.env.CHAT_ID);
  form.append("caption",
`🔥 New Recharge

📱 ${getField("number")}
📶 ${getField("operator")}
💰 ₹${getField("plan")}
🧾 UTR: ${getField("utr")}`);

  form.append("photo", new Blob([photoBuffer]), "payment.jpg");

  await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendPhoto`, {
    method: "POST",
    body: form
  });

  res.status(200).json({ success: true });
}