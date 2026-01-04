const GIST_ID = 'f6989518c73826ade6734c63c367af4c';
const TELEFE_URL = 'https://mitelefe.com/vivo';

async function updateVitile() {
    try {
        const response = await fetch(TELEFE_URL);
        const html = await response.text();
        const tokenMatch = html.match(/data-player-token-value="([^"]+)"/);
        
        if (!tokenMatch) throw new Error("Token no encontrado");
        const newToken = tokenMatch[1];

        const contenidoFinal = `#EXTM3U url-tvg="https://impeditor.com/epg/capanueve/capanueve"

# General/Abierta
#EXTINF:-1 tvg-id="0935" tvg-name="América TV" group-title="General/Abierta" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Logotipo_de_America_TV.svg/1933px-Logotipo_de_America_TV.svg.png",América TV
https://prepublish.f.qaotic.net/a07/americahls-100056/playlist_720p.m3u8

#EXTINF:-1 tvg-id="0919" tvg-name="Canal de la Ciudad" group-title="General/Abierta" tvg-logo="https://files.catbox.moe/ql9rbg.png",Canal de la Ciudad
https://g4.proy-hor.transport.edge-access.net/a06/ngrp:gcba_video4-100042_all/Playlist.m3u8?sense=true

#EXTINF:-1 tvg-id="0916" tvg-name="El Nueve" group-title="General/Abierta" tvg-logo="https://files.catbox.moe/k3fp5s.png",El Nueve
http://107.152.39.199:8030/hls/canal7.m3u8

#EXTINF:-1 tvg-id="0915" group-title="General/Abierta" tvg-name="El Trece" tvg-logo="https://files.catbox.moe/finwuj.png",El Trece
#EXTVLCOPT:http-referrer=https://www.m3u8player.online/
https://livetrx01.vodgc.net/eltrecetv/index.m3u8

#EXTINF:-1 tvg-id="0939" tvg-name="Net TV" group-title="General/Abierta" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/a/a5/Net_TV_logo.png" ,Net TV
https://unlimited1-us.dps.live/nettv/nettv.smil/nettv/livestream1/playlist.m3u8

#EXTINF:-1 tvg-id="1909" tvg-name="Telefe" group-title="General/Abierta" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/c/cc/Telefe_%28nuevo_logo%29.png",Telefe
#EXTVLCOPT:http-referrer=https://mitelefe.com/
#EXTVLCOPT:http-user-agent=Mozilla/5.0
https://telefeappmitelefe1.akamaized.net/hls/live/2037985/appmitelefe/${newToken}/master.m3u8

#EXTINF:-1 tvg-id="0903" tvg-name="TV Pública" group-title="General/Abierta" tvg-logo="https://files.catbox.moe/3yz8zs.png",TV Publica
https://g5.vxral-hor.transport.edge-access.net/b16/ngrp:c7_vivo01_dai_source-20001_all/playlist.m3u8

#EXTINF:-1 tvg-id="0640" tvg-name="Unife TV" group-title="General/Abierta" tvg-logo="https://files.catbox.moe/gb2iih.png",Unife TV
https://cdn.mycloudstream.io/hls/live/broadcast/pgv5kerk/index.m3u8

---
# Noticias
#EXTINF:-1 tvg-id="0222" tvg-name="A24" group-title="Noticias" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/A24_%282025%29.svg/2560px-A24_%282025%29.svg.png",A24
https://g5.vxral-slo.transport.edge-access.net/a12/ngrp:a24-100056_all/playlist.m3u8?sense=true

#EXTINF:-1 tvg-id="0917" tvg-name="Canal 26" group-title="Noticias" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Canal_26_logo_%282022%29.svg/2048px-Canal_26_logo_%282022%29.svg.png",Canal 26
https://stream-gtlc.telecentro.net.ar/hls/canal26hls/main.m3u8

#EXTINF:-1 tvg-id="0905" tvg-name="TN" group-title="Noticias" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/TN_todo_noticias_logo.svg/2560px-TN_todo_noticias_logo.svg.png", TN
#EXTVLCOPT:http-referrer=https://tn.com.ar/envivo/24hs
#EXTVLCOPT:http-user-agent=Mozilla/5.0
https://live-01-01-tn.vodgc.net/TN24/index_TN24_1080.m3u8`;

        await fetch(`https://api.github.com/gists/${GIST_ID}`, {
            method: 'PATCH',
            headers: {
                'Authorization': \`token \${process.env.VITILE_TOKEN}\`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                files: { "gistfile1.txt": { content: contenidoFinal } }
            })
        });
        console.log("¡Vitile Actualizada con éxito!");
    } catch (error) {
        console.error("Fallo técnico:", error.message);
    }
}
updateVitile();
