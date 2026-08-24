const fs = require('fs');

const LAMBDA_URL = "https://57j4mtvcjjf7siqnnvkixb5d3i0uvjei.lambda-url.us-east-1.on.aws/";
const STREAM_ID = "6a024684fd4ca6a938f3a118";

// Encabezados para simular un navegador real
const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'application/json, text/plain, */*',
  'Origin': 'https://telefe.com',
  'Referer': 'https://telefe.com/'
};

async function actualizarM3U8() {
  try {
    // 1. Obtener access_token desde AWS Lambda
    const lambdaRes = await fetch(`${LAMBDA_URL}?stream_id=${STREAM_ID}`, { headers });
    const lambdaData = await lambdaRes.json();

    if (!lambdaData.access_token) {
      throw new Error("No se obtuvo access_token de AWS Lambda: " + JSON.stringify(lambdaData));
    }

    // 2. Obtener la URL .m3u8 real desde la API de Mediastream
    const playerApiUrl = `https://platform.mdstrm.com/api/player/live-stream/${STREAM_ID}?access_token=${lambdaData.access_token}`;
    const streamRes = await fetch(playerApiUrl, { headers });
    const streamData = await streamRes.json();

    // Extraer enlace manifest
    const m3u8Url = streamData.src?.hls || 
                    streamData.src?.dvr || 
                    streamData.manifest?.hls ||
                    (streamData.assets && streamData.assets.find(a => a.type === 'hls')?.url);

    if (!m3u8Url) {
      throw new Error("No se encontró enlace HLS en Mediastream: " + JSON.stringify(streamData));
    }

  
// 3. Guardar directamente la URL .m3u8 pura
    fs.writeFileSync('telefe.m3u8', m3u8Url);
    console.log('✅ Enlace m3u8 guardado con éxito.');
actualizarM3U8();
