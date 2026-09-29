export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { number, operator, plan, utr } = req.body;

  await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: process.env.CHAT_ID,
      text: `🔥 New Recharge

📱 ${number}
📶 ${operator}
💰 ₹${plan}
🧾 UTR: ${utr || "N/A"}`
    })
  });

  res.status(200).json({ success: true });
}