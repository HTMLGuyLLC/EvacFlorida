#Installation
1. Install Docker for Windows/Mac
2. Run `docker-sync-stack start`<br>
!Don't run compose-up!
3. Connect to the PHP container `docker exec -it evacfl-php bash`
4. Run `mkdir /var/www/var && chmod 0777 /var/www/var -R`
5. Visit `http://evac.localhost` in your browser

#Connect to the PHP container:
```
docker exec -it evacfl-php bash
```

#To clear all:
```
#stop everything
docker stop $(docker ps -aq)
#remove the containers
docker rm -f evacfl-php evacfl-nginx
#remove the volume
docker volume rm evacfl-var-www
#remove the network
docker network rm docker_evacfl-network
```