cd pokapi-data
pm2 start server.js
cd ../pokapi-openai
pm2 start server.js
cd ../pokapi-proxy
pm2 start server.js
cd ../pokapi-user
pm2 start server.js