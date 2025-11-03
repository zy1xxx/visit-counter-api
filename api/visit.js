import fs from 'fs';

const countFile = '/tmp/visit_count.txt';

// 你的网站域名（⚠️改成自己的）
const allowedOrigin = 'https://zy1xxx.github.io';

export default async function handler(req, res) {
  const origin = req.headers.origin || '';

  // 检查来源是否匹配
  if (origin === allowedOrigin) {
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  } else {
    // 不允许跨域
    return res.status(403).json({ error: 'Forbidden: invalid origin' });
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 处理浏览器的预检请求
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  let count = 0;
  if (fs.existsSync(countFile)) {
    count = parseInt(fs.readFileSync(countFile, 'utf-8')) || 0;
  }

  if (req.method === 'POST') {
    count++;
    fs.writeFileSync(countFile, String(count));
  }

  res.status(200).json({ total: count });
}