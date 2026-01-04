const GIST_ID = 'f6989518c73826ade6734c63c367af4c';
const TELEFE_URL = 'https://mitelefe.com/vivo';

async function updateVitile() {
    try {
        const response = await fetch(TELEFE_URL);
        const html = await response.text();
        const tokenMatch = html.match(/data-player-token-value="([^"]+)"/);
        
        if (!tokenMatch) throw new Error("Token no encontrado");
        const newToken = tokenMatch[1];

        const contenidoFinal = `#EXTM3U url-tvg="https://impeditor.com/epg/canal.xml"

# General/Abierta
#EXTINF:-1 tvg-id="0935" tvg-name="América TV"
https://prepublish.f.qaotic.net/a07/america/index.m3u8

#EXTINF:-1 tvg-id="0919" tvg-name="Canal de la Ciudad"
https://g4.proy-hor.transport.edge-access.net/c-ciudad/index.m3u8

#EXTINF:-1 tvg-id="0916" tvg-name="El Nueve"
http://107.152.39.199:8030/hls/canal7.m3u8

#EXTINF:-1 tvg-id="0915" group-title="General/Abierta" tvg-name="El Trece"
#EXTVLCOPT:http-referrer=https://www.eltrece.tv/
https://livetrx01.vodgc.net/eltrecetv/index.m3u8

#EXTINF:-1 tvg-id="0939" tvg-name="Net TV"
https://unlimited1-us.dps.live/nettv/nettv.smil/playlist.m3u8

#EXTINF:-1 tvg-id="1909" tvg-name="Telefe" group-title="General/Abierta"
#EXTVLCOPT:http-referrer=https://mitelefe.com/
#EXTVLCOPT:http-user-agent=Mozilla/5.0
https://telefeappmitelefe1.akamaized.net/hls/live/2037985/appmitelefe/${newToken}/master.m3u8

#EXTINF:-1 tvg-id="0903" tvg-name="TV Pública"
https://g5.vxral-hor.transport.edge-access.net/tvp/index.m3u8

#EXTINF:-1 tvg-id="0640" tvg-name="Unife TV"
https://cdn.mycloudstream.io/hls/live/broadcast/playlist.m3u8
---`;

        await fetch(`https://api.github.com/gists/${GIST_ID}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `token ${process.env.VITILE_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                files: { "gistfile1.txt": { content: contenidoFinal } }
            })
        });

        console.log("¡Vitile Actualizada con éxito, Maestro!");
    } catch (error) {
        console.error("Fallo técnico:", error.message);
    }
}

updateVitile();
