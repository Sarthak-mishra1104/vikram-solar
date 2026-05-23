export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { messages } = req.body

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: `You are a friendly and expert solar energy advisor for SolarSync India. You help Indian homeowners make smart solar decisions.

Answer in the same language as the question:
- If Hindi or Hinglish → reply in Hinglish
- If English → reply in English

Always give DETAILED answers with specific numbers. Never give one-line answers. Use bullet points. Include ₹ amounts and percentages.

Key facts:
- PM Surya Ghar subsidy: 1kW=₹30K, 2kW=₹60K, 3kW=₹78K, 4-10kW=₹94.5K
- Cost: ₹60,000-70,000 per kW installed
- 1kW generates 100-130 units/month
- Payback: 4-6 years after subsidy
- ROI: 15-25% annually
- Panels last 25+ years`,
        messages,
      }),
    })

    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}