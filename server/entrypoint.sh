#!/bin/bash
set -e

echo "${0}: running migrations."&
python src/manage.py makemigrations&
wait $!

python src/manage.py migrate --noinput&
wait $!

python src/manage.py create_admin&
wait $!

# python src/manage.py collectstatic --noinput&
wait $!

gunicorn -c src/base/gunicorn.config.py src.base.wsgi
# python src/manage.py runserver 0.0.0.0:8000