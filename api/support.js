export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { mobile, operator, plan, issue } = req.body;

  const text = `📩 Recharge Hub Support

📱 Mobile: ${mobile}
📶 Operator: ${operator}
💰 Plan: ₹${plan}
📝 Issue: ${issue}`;

  const tg = await fetch(
    `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: process.env.CHAT_ID,
        text
      })
    }
  );

  res.status(tg.ok ? 200 : 500).json({ success: tg.ok });
}