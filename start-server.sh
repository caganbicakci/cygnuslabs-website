#!/bin/bash

# CygnusLabs Website - Local Development Server
# Bu script yerel bir web sunucusu başlatır

PORT=3000

echo "🚀 CygnusLabs Website sunucusu başlatılıyor..."
echo "📡 Port: $PORT"
echo "🌐 Tarayıcınızda şu adresi açın: http://localhost:$PORT"
echo ""
echo "Durdurmak için Ctrl+C tuşlarına basın"
echo ""

# Python 3 kontrolü
if command -v python3 &> /dev/null; then
    python3 -m http.server $PORT
# Python 2 kontrolü
elif command -v python &> /dev/null; then
    python -m SimpleHTTPServer $PORT
# Node.js serve kontrolü
elif command -v npx &> /dev/null; then
    npx serve -p $PORT
else
    echo "❌ Hata: Python veya Node.js bulunamadı!"
    echo "Lütfen Python 3 veya Node.js yükleyin."
    exit 1
fi
