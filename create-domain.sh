#!/bin/bash
set -f        # disable globbing
IFS=$'\n'     # set field separator to NL (only)
schoolKey=$(mysql -u root db -se "SELECT school_key FROM schools WHERE is_generated_domain = 0 limit 1;")
#educarestudy.in
php artisan domain:add "$schoolKey.educare-inertia.test"
php artisan cache:clear

php artisan env:set APP_URL "https://$schoolKey.educare-inertia.test" .env.$schoolKey.educare-inertia.test
php artisan env:set ASSET_URL "https://$schoolKey.educare-inertia.test" .env.$schoolKey.educare-inertia.test