export default async function handler(req, res) {
  const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;

  const limit = req.query.limit || 50;
  const offset = req.query.offset || 0;

  try {
    const response = await fetch(`https://api.clerk.com/v1/organizations?limit=${limit}&offset=${offset}`, {
      headers: {
        Authorization: `Bearer ${CLERK_SECRET_KEY}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong", details: error.message });
  }
}
