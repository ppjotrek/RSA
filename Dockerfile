# Użyj obrazu Node.js jako podstawy
FROM node:latest

# Utwórz katalog roboczy w kontenerze
WORKDIR /app

# Skopiuj pliki HTML do katalogu roboczego w kontenerze
COPY index.html /app
COPY decode.html /app
COPY encode-styles.css /app
COPY krypto-style.css /app
COPY script.js /app

# Wyeksponuj port 80 w kontenerze
EXPOSE 80

# Uruchom prosty serwer HTTP przy użyciu narzędzia http-server
RUN npm install -g http-server

# Uruchom serwer HTTP przy starcie kontenera
CMD ["http-server", "-p", "80"]