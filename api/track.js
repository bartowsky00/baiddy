const SHEET_URL = 'https://script.google.com/macros/s/AKfycbwpTRjvVzZBwI4pdKEmPy9oji9xgDU62UOKX0j9TyAK-ZfZy6iH9GDFHQMd-Lr8Imb1fA/exec';

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  try {
    var data;
    if (req.method === 'POST') {
      data = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    } else {
      data = req.query.data || '{}';
    }

    // Forward to Google Apps Script via GET (reliable, follows redirects)
    var url = SHEET_URL + '?data=' + encodeURIComponent(data);
    await fetch(url, { redirect: 'follow' });

    // GET requests (image pixel) → return 1x1 transparent GIF
    if (req.method === 'GET') {
      var gif = Buffer.from('R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==', 'base64');
      res.setHeader('Content-Type', 'image/gif');
      return res.send(gif);
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(200).json({ ok: false });
  }
};
