# 📺 Telefe - Lista M3U Vitile (CABA) Argentina - Sistema de Auto-Actualización

Este repositorio contiene el motor de automatización para la **Lista M3U Vitile Argentina**, la señal más estable para más de 2 millones de usuarios.

## 🚀 ¿Cómo funciona?
El sistema utiliza **GitHub Actions** para realizar ingeniería inversa (sniffing) sobre las APIs oficiales de los canales de aire argentinos (especialmente Telefe).

* **Frecuencia:** Se ejecuta automáticamente cada 60 minutos.
* **Tecnología:** Escrito en JavaScript puro (Node.js) utilizando la API de Gists de GitHub.
* **Seguridad:** Utiliza secretos de repositorio (`VITILE_TOKEN`) para proteger el acceso al Gist oficial.

## 🛠️ Estructura del Proyecto
* `.github/workflows/main.yml`: El cronómetro que activa la actualización.
* `update_telefe.js`: El script que captura el token dinámico de Scaglione y actualiza la lista.

## 🇦🇷 Créditos
Desarrollado y mantenido por **frantdse** desde Santiago del Estero para todo el país. Se puede usar gratuitamente en cualquier Lista IPTV

"Un cerezo por estar siempre con Vitile." 🌸
