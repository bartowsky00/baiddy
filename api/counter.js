var SHEET_URL = 'https://script.google.com/macros/s/AKfycbzU55lDOtJPHqKYR2DX2531Cb2SRgbjOiFU4rvA-qdnyaqp1zR93grN7jIE-j6SIv5FpQ/exec';
var BASE_COUNT = 50;

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=60');

  try {
    var response = await fetch(SHEET_URL + '?action=read', { redirect: 'follow' });
    var text = await response.text();
    var events = JSON.parse(text);
    var leadCount = 0;
    for (var i = 0; i < events.length; i++) {
      if (events[i].event === 'lead_submitted') leadCount++;
    }
    return res.status(200).json({ count: BASE_COUNT + leadCount });
  } catch (err) {
    return res.status(200).json({ count: BASE_COUNT });
  }
};
