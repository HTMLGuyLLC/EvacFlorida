# Installation
1. Install Docker for Windows/Mac https://www.docker.com/products/docker-desktop
2. Install docker-sync https://docker-sync.readthedocs.io/en/latest/getting-started/installation.html
3. Open an instance of terminal or cmd prompt and navigate to this folder (EvacFlorida/docker)
4. Run `docker-sync-stack start`
5. Leave this running every time you work on the project.
6. Open another terminal or cmd prompt and connect to the PHP container `docker exec -it evacfl-php bash`
7. Create var dir `mkdir /var/www/var`
8. Open perms on cache and database (don't do this in prod) `chmod 0777 /var/www/var`
9. Run migrations `php bin/console doctrine:migrations:migrate`
10. Make sure the database is writable `chmod 0777 /var/www/var/data.db`
11. Visit `http://evac.localhost` in your browser

# Connect to the PHP container:
```
docker exec -it evacfl-php bash
```

# To clear all:
```
#remove the containers
docker rm -f evacfl-php evacfl-nginx evacfl-var-www
#remove the volume
docker volume rm evacfl-var-www
#remove the network
docker network rm docker_evacfl-network
```

# Commands and documentation:
https://docker-sync.readthedocs.io/en/latest/getting-started/commands.html