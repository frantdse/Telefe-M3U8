const fs = require('fs');

const LAMBDA_URL = "https://57j4mtvcjjf7siqnnvkixb5d3i0uvjei.lambda-url.us-east-1.on.aws/";
const STREAM_ID = "6a024684fd4ca6a938f3a118";

async function actualizarM3U8() {
  try {
    // 1. Obtener access_token desde AWS Lambda
    const lambdaRes = await fetch(`${LAMBDA_URL}?stream_id=${STREAM_ID}`);
    const lambdaData = await lambdaRes.json();

    if (!lambdaData.access_token) {
      throw new Error("No se obtuvo access_token");
    }

    // 2. Obtener la URL .m3u8 real desde la API de Mediastream
    const playerApiUrl = `https://platform.mdstrm.com/api/player/live-stream/${STREAM_ID}?access_token=${lambdaData.access_token}`;
    const streamRes = await fetch(playerApiUrl);
    const streamData = await streamRes.json();

    // Extraer enlace manifest
    const m3u8Url = streamData.src?.hls || 
                    streamData.src?.dvr || 
                    streamData.manifest?.hls ||
                    (streamData.assets && streamData.assets.find(a => a.type === 'hls')?.url);

    if (!m3u8Url) {
      throw new Error("No se encontró el enlace HLS en la respuesta de Mediastream");
    }

    // 3. Armar el contenido de la lista M3U
    const m3uContent = `#EXTM3U
#EXTINF:-1 tvg-id="Telefe.ar" tvg-name="Telefe HD" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/8/82/Telefe_2018.png" group-title="Argentina", Telefe HD
${m3u8Url}
`;

    // 4. Guardar archivo telefe.m3u8 (o el nombre que use tu Action)
    fs.writeFileSync('telefe.m3u8', m3uContent);
    console.log('✅ Lista telefe.m3u8 actualizada con éxito.');

  } catch (error) {
    console.error('❌ Error al actualizar la lista:', error.message);
    process.exit(1);
  }
}

actualizarM3U8();
