#!/bin/bash
set -e
echo "${0}: running migrations."&
python src/manage.py makemigrations&
wait $!
python src/manage.py migrate --noinput&
wait $!
python src/manage.py create_admin&
wait $!
# uwsgi --http :8000 --chdir=/app/src --master --processes=5 --enable-threads --static-map /media=/var/www/media/ --module base.wsgi:application
uwsgi --ini ineoLibrary.ini
# python src/manage.py runserver 0.0.0.0:8000
wait $!