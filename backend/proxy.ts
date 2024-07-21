import express from 'express';
import request from 'request';
import cors from 'cors';

const app = express();
app.use(cors());

app.use('/proxy', (req, res) => {
  const url = req.query.url as string;
  if (!url) {
    return res.status(400).send('URL is required');
  }

  request({ url }).pipe(res);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
