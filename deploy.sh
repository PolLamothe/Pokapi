# !/bin/sh

# Démarer les micro-services
pm2 ls
pm2 stop all
pm2 start R401-Architecture_logicielle/pokapi-data/server.js --name "pokapi-data"
pm2 start R401-Architecture_logicielle/pokapi-user/server.js --name "pokapi-user"
pm2 start R401-Architecture_logicielle/pokapi-openai/server.js --name "pokapi-openai"
pm2 start R401-Architecture_logicielle/pokapi-proxy/server.js --name "pokapi-proxy"

# Build et déployer l'application React
cd R410-Complement_web/pokapi
npm run build
sudo cp -r dist/* /var/www/html
cd ..
