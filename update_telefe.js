const fs = require('fs');

const LAMBDA_URL = "https://57j4mtvcjjf7siqnnvkixb5d3i0uvjei.lambda-url.us-east-1.on.aws/";
const STREAM_ID = "6a024684fd4ca6a938f3a118";

const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  'Accept': '*/*',
  'Origin': 'https://telefe.com',
  'Referer': 'https://telefe.com/'
};

async function actualizarM3U8() {
  try {
    // 1. Obtener access_token
    const lambdaRes = await fetch(`${LAMBDA_URL}?stream_id=${STREAM_ID}`, { headers });
    const lambdaData = await lambdaRes.json();
    console.log("Respuesta Lambda:", lambdaData);

    if (!lambdaData.access_token) {
      throw new Error("No se obtuvo access_token");
    }

    // 2. Consultar API de Mediastream
    const playerApiUrl = `https://platform.mdstrm.com/api/player/live-stream/${STREAM_ID}?access_token=${lambdaData.access_token}`;
    const streamRes = await fetch(playerApiUrl, { headers });
    const streamData = await streamRes.json();
    console.log("Respuesta Mediastream:", JSON.stringify(streamData));

    // 3. Buscar enlace HLS
    const m3u8Url = streamData.src?.hls || 
                    streamData.src?.dvr || 
                    streamData.manifest?.hls ||
                    (streamData.assets && streamData.assets.find(a => a.type === 'hls')?.url);

    if (!m3u8Url) {
      throw new Error("No se encontró URL HLS en la respuesta.");
    }

    // 4. Guardar archivo
    fs.writeFileSync('telefe.m3u8', m3u8Url);
    console.log('✅ Éxito! Guardado:', m3u8Url);

  } catch (error) {
    console.error('❌ Detalle del error:', error.message);
    process.exit(1);
  }
}

actualizarM3U8();
