var SHEET_URL = 'https://script.google.com/macros/s/AKfycbzU55lDOtJPHqKYR2DX2531Cb2SRgbjOiFU4rvA-qdnyaqp1zR93grN7jIE-j6SIv5FpQ/exec';

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store');

  try {
    var response = await fetch(SHEET_URL + '?action=read', { redirect: 'follow' });
    var text = await response.text();
    var data = JSON.parse(text);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(200).json([]);
  }
};
