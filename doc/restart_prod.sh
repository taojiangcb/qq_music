yarn install
pm2 stop qq_music
pm2 del qq_music
pm2 start ecosystem.config.js --env production