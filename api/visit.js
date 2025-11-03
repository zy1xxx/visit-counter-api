import fs from 'fs';

const countFile = '/tmp/visit_count.txt'; // Vercel 的临时存储目录

export default async function handler(req, res) {
  let count = 0;
  if (fs.existsSync(countFile)) {
    count = parseInt(fs.readFileSync(countFile, 'utf-8')) || 0;
  }

  // POST 请求时 +1
  if (req.method === 'POST') {
    count++;
    fs.writeFileSync(countFile, String(count));
  }

  res.status(200).json({ total: count });
}
