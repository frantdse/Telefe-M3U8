const fs = require('fs');

const LAMBDA_URL = "https://57j4mtvcjjf7siqnnvkixb5d3i0uvjei.lambda-url.us-east-1.on.aws/";
const STREAM_ID = "6a024684fd4ca6a938f3a118";

async function actualizarM3U8() {
  try {
    // 1. Obtener token dinámico
    const res = await fetch(`${LAMBDA_URL}?stream_id=${STREAM_ID}`);
    const data = await res.json();

    if (!data.access_token) {
      throw new Error("No se obtuvo access_token");
    }

    // 2. Construir la URL con el token
    const m3u8Url = `https://mdstrm.com/live-stream-playlist/${STREAM_ID}.m3u8?access_token=${data.access_token}`;

    // 3. Guardar URL limpia en telefe.m3u8
    fs.writeFileSync('telefe.m3u8', m3u8Url);

    // 4. Crear redirección automática instantánea en index.html
    const redirectHtml = `<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="refresh" content="0; url=${m3u8Url}" />
  <script>window.location.href = "${m3u8Url}";</script>
</head>
<body></body>
</html>`;

    fs.writeFileSync('index.html', redirectHtml);
    console.log('✅ Redirección actualizada con éxito hacia:', m3u8Url);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

actualizarM3U8();
