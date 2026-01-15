FROM node:20-alpine

# Munkakönyvtár beállítása a konténeren belül
WORKDIR /app

# Függőségek másolása és telepítése
# A package-lock.json-t is másoljuk, ha létezik (ezért a csillag)
COPY package*.json ./
RUN npm install

# A forráskód másolása
COPY . .

# Létrehozzuk a data mappát, hogy biztosan létezzen
RUN mkdir -p data

# A 3000-es portot használjuk
EXPOSE 3000

# Indítás
CMD ["node", "server.js"]