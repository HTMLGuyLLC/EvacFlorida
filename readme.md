# EvacFlorida.com
Hurricane evacuation planning service.

> Built for Palm Beach Tech's 2019 Hackathon

My first ReactJS project, and some logic is missing or incomplete due to this being built within 24 hours for a contest. 
More information about what should be improved/changed can be found in docs/ImproveForProduction.md

# To setup locally:
1. Clone this repository
2. Follow the instructions in `docker/readme.me`
3. install composer, run `composer install`
4. install node/npm/yarn, run `yarn install`
5. Start the webpack file watcher, run `yarn encore dev --watch`
6. Connect to the PHP container, run `php bin/console doctrine:migrations:migrate`
7. Start coding!

# To deploy:
1. Pull the latest from Github
2. Clear Symfony cache, run `php bin/console cache:clear --env=prod`
3. Run migrations `php bin/console doctrine:migrations:migrate`
4. Update CSS/JS files, run `yarn encore production`
5. Update PHP packages, run `composer install`

# Known issues:
1. Logout doesn't redirect correctly
2. evac.localhost is hardcoded in several places
3. Saving profile details doesn't work
4. The homepage chart and stats do not pull from the departures table
5. The alerts you enable in your profile are not setup
6. Page titles/meta/canonical not handled for React pagination
7. @babel/plugin-proposal-class-properties can be removed from webpack.config.js and using yarn remove
8. No unit tests

# Known inconsistencies:
1. Use of SASS instead of makeStyles for a couple minor things
2. Use of Fragment wrapper in some places, and div or span in others
3. Using aria attributes
4. Data validation is spotty
5. Code comments are spotty