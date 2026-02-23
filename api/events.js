var SHEET_URL = 'https://script.google.com/macros/s/AKfycbz1BtiqFWnv8EgAxtKzhy8rA-gDcC4V9QZyABwTT-ifYTLxXS3dsTEGQcVqyEvNDvJ0Xg/exec';

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
