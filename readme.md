# EvacFlorida.com
Hurricane evacuation planning software.

# To setup locally:
1. Clone this repository
2. Run composer install
3. Follow the instructions in `docker/readme.me`
4. install composer, run `composer install`
5. install node/npm/yarn, run `yarn install`
6. Start the webpack file watcher, run `yarn encore dev --watch`
7. Start coding!

# To deploy:
1. Pull the latest from Github
2. Clear Symfony cache, run `php bin/console cache:clear --env=prod`
3. Update CSS/JS files, run `yarn encore production`
4. Update PHP packages, run `composer install`