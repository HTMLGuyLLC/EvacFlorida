# EvacFlorida.com
Hurricane evacuation planning service.

> Built for Palm Beach Tech's 2019 Hackathon

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
3. Run migrations `php bin/console doctrine:migrations:migrate`
4. Update CSS/JS files, run `yarn encore production`
5. Update PHP packages, run `composer install`