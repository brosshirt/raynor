# chmod +x this file

docker-compose -f /home/ubuntu/raynor/docker-compose.yml run --rm certbot certonly --webroot -w /var/www/certbot -d commsbot.com