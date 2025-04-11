import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const port = process.env.PROXY_PORT || 3001;

app.use(
  cors({
    origin: '*'
  })
);
app.use(express.json());

app.post('/github/access_token', async (req, res) => {
  try {
    const { code } = req.body;
    const response = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.VITE_GITHUB_CLIENT_ID,
        client_secret: process.env.VITE_GITHUB_CLIENT_SECRET,
        code
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error in proxy:', error);
    res.status(500).json({ error: JSON.stringify(error) });
  }
});

app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});
